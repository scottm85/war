import Deck from './Deck';
import Player from './Player';
import PlayerType from "./PlayerType";

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

        this.addStaticPlayers(this.deck.split());

        console.log(this.players);
    }

    addStaticPlayers(hands)
    {
        this.players.push(new Player('A','Player 1', hands[0], PlayerType.PLAYER));
        this.players.push(new Player('B','Player 2', hands[1], PlayerType.PLAYER));
    }
}

export default GameController;