let Deck  = require('./Deck'),
    Player = require('./Player'),
    GameState = require('./GameState'),
    PlayerType = require("./PlayerType");

class GameController
{
    constructor(io)
    {
        this.deck = new Deck();
        this.players = [];
        this.socket = io;
        this.gameState = GameState.IDLE;
        this.turnDelay = 2000;

        this.initSocket();
    }

    initSocket()
    {
        this.socket.on('connection', (socket) => {

            socket.on('newPlayer', (name) => this.newPlayer(socket.id, name));

            socket.on('disconnect', () => {
                let playerIndex = this.getPlayerIndex(socket.id);
                if (this.players[playerIndex] && this.players[playerIndex].type === PlayerType.PLAYER)
                {
                    this.resetGame();
                }
                this.removePlayer(playerIndex);
            });

            socket.on('playerStatusUpdate', (status) => {
                let playerIndex = this.getPlayerIndex(socket.id);
                this.players[playerIndex].ready = status;
                this.socket.emit('playersUpdate', this.players);
                this.isGameReady();
            });

            socket.on('fetchCard', () => {
                let playerIndex = this.getPlayerIndex(socket.id);
                this.players[playerIndex].getNextCard();
                this.socket.emit('playersUpdate', this.players);
                this.isScoringReady();
            });

        });
    }

    getPlayerIndex(socketId)
    {
        return this.players.map((e) => { return e.id; }).indexOf(socketId);
    }

    isScoringReady()
    {
        let p1Cards = this.players[0].cardsInPlay,
            p2Cards = this.players[1].cardsInPlay;
        if (p1Cards.length > 0 && p2Cards.length > 0)
        {
            switch(true)
            {
                case p1Cards[p1Cards.length - 1].value === p2Cards[p2Cards.length - 1].value: // both players cards matched, fetch 3 more and score again
                    setTimeout(() => {
                        for (let i = 0; i < 2; i++)
                        {
                            for (let k = 0; k < 3; k++)
                            {
                                this.players[i].getNextCard();
                            }
                        }
                        this.socket.emit('playersUpdate', this.players);
                        this.isScoringReady();
                    }, this.turnDelay);
                    break;
                case p1Cards[p1Cards.length - 1].value > p2Cards[p2Cards.length - 1].value: // player one scored
                    this.players[0].increaseScore(p1Cards.length + p2Cards.length);
                    this.socket.emit('playersUpdate', this.players);
                    this.clearField();
                    break;
                case p1Cards[p1Cards.length - 1].value < p2Cards[p2Cards.length - 1].value: // player 2 scored
                    this.players[1].increaseScore(p1Cards.length + p2Cards.length);
                    this.socket.emit('playersUpdate', this.players);
                    this.clearField();
                    break;
                default:
                    break;
            }
            if (this.players[0].hand.length === 0 && this.players[1].hand.length === 0)
            {
                this.socket.emit('winner', this.getWinner().name);
                setTimeout(() => {
                    this.resetGame();
                }, this.turnDelay);
            }
        }
    }

    getWinner()
    {
        return this.players.reduce((highScore, player) => highScore.score > player.score ? highScore : player);
    }

    clearField()
    {
        setTimeout(() => {
            for(let i in this.players)
            {
                this.players[i].discardCardsInPlay();
            }
            this.socket.emit('playersUpdate', this.players);
        }, this.turnDelay);
    }

    isGameReady()
    {
        if (this.players.length > 1 && this.gameState === GameState.IDLE)
        {
            let playerStatus = this.players.map((e) => { return e.ready; });
            if (playerStatus[0] && playerStatus[1])
            {
                this.initGame();
            }
        }
    }

    initGame()
    {
        this.gameState = GameState.SETUP;
        console.log("----------------- Game Setup Started -----------------");
        this.deck.create();
        this.deck.shuffle();

        // Lets split the deck and give each player a hand
        let hands = this.deck.split();
        this.players[0].hand = hands[0];
        this.players[1].hand = hands[1];

        console.log("----------------- Active Game Has Started -----------------");
        this.gameState = GameState.ACTIVE;

        this.socket.emit('playersUpdate', this.players);
        this.socket.emit('gameState', this.gameState);
    }

    resetGame()
    {
        for (let i in this.players)
        {
            let player = this.players[i];
            player.hand = [];
            player.cardsInPlay = [];
            player.ready = false;
            player.score = 0;
            this.players[i] = player;
        }
        this.deck = new Deck();
        this.gameState = GameState.IDLE;

        this.socket.emit('playersUpdate', this.players);
        this.socket.emit('gameState', this.gameState);
    }

    newPlayer(socketId, name)
    {
        this.players.push(new Player(socketId, name, this.getPlayerType(), []));
        this.socket.emit('playersUpdate', this.players);
    }

    removePlayer(playerIndex)
    {
        this.players.splice(playerIndex, 1);
        this.socket.emit('playersUpdate', this.players);
    }

    getPlayerType()
    {
        return this.players.length < 2 ? PlayerType.PLAYER : PlayerType.SPECTATOR;
    }

}

module.exports = GameController;