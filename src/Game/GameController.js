let Deck  = require('./Deck'),
    Player = require('./Player'),
    PlayerType = require("./PlayerType");

class GameController
{
    constructor()
    {
        this.deck = new Deck();
        this.players = [];
    }

    init()
    {
        this.deck.create();
        this.deck.shuffle();

        //this.addStaticPlayers(this.deck.split());

        console.log(this.players);
    }

    addStaticPlayers(hands)
    {
        this.players.push(new Player('A','Player 1', PlayerType.PLAYER, hands[0]));
        this.players.push(new Player('B','Player 2', PlayerType.PLAYER, hands[1]));
    }

    newPlayer(socketId, name)
    {
        this.players.push(new Player(socketId, name, this.getPlayerType(), []));
    }

    getPlayerType()
    {
        return this.players.length < 2 ? PlayerType.PLAYER : PlayerType.SPECTATOR;
    }

}

module.exports = GameController;