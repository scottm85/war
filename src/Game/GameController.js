let Deck  = require('./Deck'),
    Player = require('./Player'),
    PlayerType = require("./PlayerType");

class GameController
{
    constructor(io)
    {
        this.deck = new Deck();
        this.players = [];
        this.socket = io;

        this.initSocket();
    }

    initSocket()
    {
        this.socket.on('connection', (socket) => {
            console.log('User connected!');
            socket.on('newPlayer', (name) => this.newPlayer(socket.id, name));

            socket.on('disconnect', (socket) => {
                console.log('User disconnected!');
                this.removePlayer(socket.id);
            });
        });
    }

    initGame()
    {
        this.deck.create();
        this.deck.shuffle();
    }

    newPlayer(socketId, name)
    {
        this.players.push(new Player(socketId, name, this.getPlayerType(), []));
        this.socket.emit('playersUpdate', this.players);
    }

    removePlayer(socketId)
    {
        let playerIndex = this.players.map((e) => { return e.id; }).indexOf(socketId);
        this.players.splice(playerIndex, 1);
        this.socket.emit('playersUpdate', this.players);
    }

    getPlayerType()
    {
        return this.players.length < 2 ? PlayerType.PLAYER : PlayerType.SPECTATOR;
    }

}

module.exports = GameController;