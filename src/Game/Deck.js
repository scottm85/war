let Card = require('./Card'),
    Suit = require('./Suit');

class Deck
{
    constructor()
    {
        this.cards = [];
    }

    create()
    {
        /* SPADES */
        this.cards.push(new Card('Ace', Suit.SPADE, 14, 'U+1F0A1'));
        this.cards.push(new Card('2', Suit.SPADE, 2, 'U+1F0A2'));
        this.cards.push(new Card('3', Suit.SPADE, 3, 'U+1F0A3'));
        this.cards.push(new Card('4', Suit.SPADE, 4, 'U+1F0A4'));
        this.cards.push(new Card('5', Suit.SPADE, 5, 'U+1F0A5'));
        this.cards.push(new Card('6', Suit.SPADE, 6, 'U+1F0A6'));
        this.cards.push(new Card('7', Suit.SPADE, 7, 'U+1F0A7'));
        this.cards.push(new Card('8', Suit.SPADE, 8, 'U+1F0A8'));
        this.cards.push(new Card('9', Suit.SPADE, 9, 'U+1F0A9'));
        this.cards.push(new Card('10', Suit.SPADE, 10, 'U+1F0AA'));
        this.cards.push(new Card('Jack', Suit.SPADE, 11, 'U+1F0AB'));
        this.cards.push(new Card('Queen', Suit.SPADE, 12, 'U+1F0AD'));
        this.cards.push(new Card('King', Suit.SPADE, 13, 'U+1F0AE'));

        /* HEARTS */
        this.cards.push(new Card('Ace', Suit.HEART, 14, 'U+1F0B1'));
        this.cards.push(new Card('2', Suit.HEART, 2, 'U+1F0B2'));
        this.cards.push(new Card('3', Suit.HEART, 3, 'U+1F0B3'));
        this.cards.push(new Card('4', Suit.HEART, 4, 'U+1F0B4'));
        this.cards.push(new Card('5', Suit.HEART, 5, 'U+1F0B5'));
        this.cards.push(new Card('6', Suit.HEART, 6, 'U+1F0B6'));
        this.cards.push(new Card('7', Suit.HEART, 7, 'U+1F0B7'));
        this.cards.push(new Card('8', Suit.HEART, 8, 'U+1F0B8'));
        this.cards.push(new Card('9', Suit.HEART, 9, 'U+1F0B9'));
        this.cards.push(new Card('10', Suit.HEART, 10, 'U+1F0BA'));
        this.cards.push(new Card('Jack', Suit.HEART, 11, 'U+1F0BB'));
        this.cards.push(new Card('Queen', Suit.HEART, 12, 'U+1F0BD'));
        this.cards.push(new Card('King', Suit.HEART, 13, 'U+1F0BE'));

        /* CLUBS */
        this.cards.push(new Card('Ace', Suit.CLUB, 14, 'U+1F0D1'));
        this.cards.push(new Card('2', Suit.CLUB, 2, 'U+1F0D2'));
        this.cards.push(new Card('3', Suit.CLUB, 3, 'U+1F0D3'));
        this.cards.push(new Card('4', Suit.CLUB, 4, 'U+1F0D4'));
        this.cards.push(new Card('5', Suit.CLUB, 5, 'U+1F0D5'));
        this.cards.push(new Card('6', Suit.CLUB, 6, 'U+1F0D6'));
        this.cards.push(new Card('7', Suit.CLUB, 7, 'U+1F0D7'));
        this.cards.push(new Card('8', Suit.CLUB, 8, 'U+1F0D8'));
        this.cards.push(new Card('9', Suit.CLUB, 9, 'U+1F0D9'));
        this.cards.push(new Card('10', Suit.CLUB, 10, 'U+1F0DA'));
        this.cards.push(new Card('Jack', Suit.CLUB, 11, 'U+1F0DB'));
        this.cards.push(new Card('Queen', Suit.CLUB, 12, 'U+1F0DD'));
        this.cards.push(new Card('King', Suit.CLUB, 13, 'U+1F0DE'));

        /* DIAMONDS */
        this.cards.push(new Card('Ace', Suit.DIAMOND, 14, 'U+1F0C1'));
        this.cards.push(new Card('2', Suit.DIAMOND, 2, 'U+1F0C2'));
        this.cards.push(new Card('3', Suit.DIAMOND, 3, 'U+1F0C3'));
        this.cards.push(new Card('4', Suit.DIAMOND, 4, 'U+1F0C4'));
        this.cards.push(new Card('5', Suit.DIAMOND, 5, 'U+1F0C5'));
        this.cards.push(new Card('6', Suit.DIAMOND, 6, 'U+1F0C6'));
        this.cards.push(new Card('7', Suit.DIAMOND, 7, 'U+1F0C7'));
        this.cards.push(new Card('8', Suit.DIAMOND, 8, 'U+1F0C8'));
        this.cards.push(new Card('9', Suit.DIAMOND, 9, 'U+1F0C9'));
        this.cards.push(new Card('10', Suit.DIAMOND, 10, 'U+1F0CA'));
        this.cards.push(new Card('Jack', Suit.DIAMOND, 11, 'U+1F0CB'));
        this.cards.push(new Card('Queen', Suit.DIAMOND, 12, 'U+1F0CD'));
        this.cards.push(new Card('King', Suit.DIAMOND, 13, 'U+1F0CE'));
    }

    shuffle()
    {
        /* Use a Fisher-Yates shuffle...If provides a much more reliable shuffle than using variations of a sort method https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle */
        let cards = this.cards;
        for (let i = cards.length - 1; i > 0; i--)
        {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        this.cards = cards;
    }

    split()
    {
        let cards = this.cards,
            splitDeck = { 0: [], 1: [] };

        for (let i = 0; i < cards.length; i++)
        {
            splitDeck[i % 2].push(cards[i]);
        }

        return splitDeck;
    }
}

module.exports = Deck;
