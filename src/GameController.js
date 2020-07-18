import Deck from './Deck';

class GameController
{
    constructor()
    {
        this.deck = new Deck();
    }

    init()
    {
        this.deck.create();
        this.deck.shuffle();
        console.log(this.deck);
    }
}

export default GameController;