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
        // move cards in play to discard, and clear cards in play
        this.discard.concat(this.cardsInPlay);
        this.cardsInPlay = [];
    }

    getNextCard()
    {
        // remove the next card from this player's hand, and place it into play
        let card = this.hand[0];
        if (card)
        {
            this.hand.splice(0, 1);
            this.cardsInPlay.push(card);
        }
    }

    increaseScore(cardsInPlay)
    {
        this.score += cardsInPlay;
    }
}

module.exports = Player;