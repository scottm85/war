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

        this.initSocket();
    }

    initSocket()
    {
        this.socket.on('connection', (socket) => {
            console.log('User connected!');
            socket.on('newPlayer', (name) => this.newPlayer(socket.id, name));

            socket.on('disconnect', (user) => {
                console.log('User disconnected!');

                let playerIndex = this.players.map((e) => { return e.id; }).indexOf(socket.id);
                if (this.players[playerIndex].type === PlayerType.PLAYER)
                {
                    this.resetGame();
                }
                this.removePlayer(playerIndex);
            });
        });
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

        this.socket.emit('playersUpdate', this.players);
        this.socket.emit('gameState', this.gameState);
    }
    resetGame()
    {
        for (let i in this.players)
        {
            this.players[i].hand = [];
        }
        this.deck = new Deck();
        this.gameState = GameState.IDLE;
    }

    newPlayer(socketId, name)
    {
        this.players.push(new Player(socketId, name, this.getPlayerType(), []));
        this.socket.emit('playersUpdate', this.players);

        if (this.players.length > 1 && this.gameState === GameState.IDLE)
        {
            this.initGame();
        }
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