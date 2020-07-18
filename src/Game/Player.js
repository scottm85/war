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
    }

    placeInDiscard(cards)
    {
        for(let i in cards)
        {
            this.hand.splice(this.hand.indexOf(cards[0], 1));
            cards.push(cards[i]);
        }
    }
}

module.exports = Player;