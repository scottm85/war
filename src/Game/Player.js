class Player
{
    constructor(socketId, name, type, hand)
    {
        this.id = socketId;
        this.name = name || 'Guest';
        this.hand = hand;
        this.discard = [];
        this.score = 0;
        this.type = type;
        this.ready = false;
        this.cardsInPlay = [];
    }

    discardCardsInPlay()
    {
        for(let i in this.cardsInPlay)
        {
            this.discard.push(this.cardsInPlay[i]);
        }
        this.cardsInPlay = [];
    }

    getNextCard()
    {
        let card = this.hand[0];
        this.hand.splice(0, 1);
        return this.cardsInPlay.push(card);
    }

    increaseScore(cardsInPlay)
    {
        this.score += cardsInPlay;
    }
}

module.exports = Player;