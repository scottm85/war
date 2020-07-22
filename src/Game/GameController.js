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

    /*
        TODO:
        Put in spectator placing in matches
        Add card labels to log
    */

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
                this.calculateScore();
            });

        });
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
        this.socket.emit('message', 'A game has started between ' + this.players[0].name + ' and ' + this.players[1].name + '!');
    }

    resetGame()
    {
        //  reset all players
        for (let i in this.players)
        {
            let player = this.players[i];
            player.hand = [];
            player.cardsInPlay = [];
            player.ready = false;
            player.score = 0;
            player.discard = [];
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

    getPlayerIndex(socketId)
    {
        return this.players.map((e) => { return e.id; }).indexOf(socketId);
    }

    calculateScore()
    {
        let p1Cards = this.players[0].cardsInPlay,
            p2Cards = this.players[1].cardsInPlay;

        if (p1Cards.length > 0 && p2Cards.length > 0)
        {
            switch(true)
            {
                // both players cards matched, deal 3 more and try to score them again
                case p1Cards[p1Cards.length - 1].value === p2Cards[p2Cards.length - 1].value:
                    setTimeout(() => {
                        for (let i = 0; i < 2; i++)
                        {
                            for (let k = 0; k < 3; k++)
                            {
                                this.players[i].getNextCard();
                            }
                        }
                        this.socket.emit('playersUpdate', this.players);
                        this.calculateScore();
                    }, this.turnDelay);
                    break;

                // player one scored
                case p1Cards[p1Cards.length - 1].value > p2Cards[p2Cards.length - 1].value:
                    this.updatePlayerScore(this.players[0], p1Cards.length + p2Cards.length);
                    break;

                // player 2 scored
                case p1Cards[p1Cards.length - 1].value < p2Cards[p2Cards.length - 1].value:
                    this.updatePlayerScore(this.players[1], p1Cards.length + p2Cards.length);
                    break;

                default:
                    break;
            }

            // win condition
            if (this.players[0].hand.length === 0 && this.players[1].hand.length === 0)
            {
                if (this.isTie())
                {
                    this.socket.emit('message', this.players[0].name + ' and ' + this.players[1].name + ' tied!');
                }
                else
                {
                    let winner = this.getWinner();
                    this.socket.emit('winner', winner.name);
                    this.socket.emit('message', winner.name + ' won the game with a score of ' + this.getWinner().score + '!');
                }
                setTimeout(() => {
                    this.resetGame();
                }, this.turnDelay);
            }
        }
    }

    updatePlayerScore(player, points)
    {
        player.increaseScore(points);
        this.socket.emit('message', player.name + ' scored ' + points + ' points.');
        this.socket.emit('playersUpdate', this.players);
        this.clearField();
    }

    isTie()
    {
        return this.players[0].score === this.players[1].score;
    }

    getWinner()
    {
        // return te player with the highest score
        return this.players.reduce((highScore, player) => highScore.score > player.score ? highScore : player);
    }

    clearField()
    {
        // give enough delay for the players to see the cards, ten clear the play field
        setTimeout(() => {
            for(let i in this.players)
            {
                this.players[i].discardCardsInPlay();
            }
            this.socket.emit('playersUpdate', this.players);
        }, this.turnDelay);
    }

}

module.exports = GameController;