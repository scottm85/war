import Card from './Card';

class Deck
{
    constructor()
    {
        this.cards = [];
    }

    create()
    {
        /* SPADES */
        this.cards.push(new Card('Ace', 'Spade', 14, 'U+1F0A1', 'black'));
        this.cards.push(new Card('2', 'Spade', 2, 'U+1F0A2', 'black'));
        this.cards.push(new Card('3', 'Spade', 3, 'U+1F0A3', 'black'));
        this.cards.push(new Card('4', 'Spade', 4, 'U+1F0A4', 'black'));
        this.cards.push(new Card('5', 'Spade', 5, 'U+1F0A5', 'black'));
        this.cards.push(new Card('6', 'Spade', 6, 'U+1F0A6', 'black'));
        this.cards.push(new Card('7', 'Spade', 7, 'U+1F0A7', 'black'));
        this.cards.push(new Card('8', 'Spade', 8, 'U+1F0A8', 'black'));
        this.cards.push(new Card('9', 'Spade', 9, 'U+1F0A9', 'black'));
        this.cards.push(new Card('10', 'Spade', 10, 'U+1F0AA', 'black'));
        this.cards.push(new Card('Jack', 'Spade', 11, 'U+1F0AB', 'black'));
        this.cards.push(new Card('Queen', 'Spade', 12, 'U+1F0AD', 'black'));
        this.cards.push(new Card('King', 'Spade', 13, 'U+1F0AE', 'black'));

        /* HEARTS */
        this.cards.push(new Card('Ace', 'Heart', 14, 'U+1F0B1', 'red'));
        this.cards.push(new Card('2', 'Heart', 2, 'U+1F0B2', 'red'));
        this.cards.push(new Card('3', 'Heart', 3, 'U+1F0B3', 'red'));
        this.cards.push(new Card('4', 'Heart', 4, 'U+1F0B4', 'red'));
        this.cards.push(new Card('5', 'Heart', 5, 'U+1F0B5', 'red'));
        this.cards.push(new Card('6', 'Heart', 6, 'U+1F0B6', 'red'));
        this.cards.push(new Card('7', 'Heart', 7, 'U+1F0B7', 'red'));
        this.cards.push(new Card('8', 'Heart', 8, 'U+1F0B8', 'red'));
        this.cards.push(new Card('9', 'Heart', 9, 'U+1F0B9', 'red'));
        this.cards.push(new Card('10', 'Heart', 10, 'U+1F0BA', 'red'));
        this.cards.push(new Card('Jack', 'Heart', 11, 'U+1F0BB', 'red'));
        this.cards.push(new Card('Queen', 'Heart', 12, 'U+1F0BD', 'red'));
        this.cards.push(new Card('King', 'Heart', 13, 'U+1F0BE', 'red'));

        /* CLUBS */
        this.cards.push(new Card('Ace', 'Club', 14, 'U+1F0D1', 'black'));
        this.cards.push(new Card('2', 'Club', 2, 'U+1F0D2', 'black'));
        this.cards.push(new Card('3', 'Club', 3, 'U+1F0D3', 'black'));
        this.cards.push(new Card('4', 'Club', 4, 'U+1F0D4', 'black'));
        this.cards.push(new Card('5', 'Club', 5, 'U+1F0D5', 'black'));
        this.cards.push(new Card('6', 'Club', 6, 'U+1F0D6', 'black'));
        this.cards.push(new Card('7', 'Club', 7, 'U+1F0D7', 'black'));
        this.cards.push(new Card('8', 'Club', 8, 'U+1F0D8', 'black'));
        this.cards.push(new Card('9', 'Club', 9, 'U+1F0D9', 'black'));
        this.cards.push(new Card('10', 'Club', 10, 'U+1F0DA', 'black'));
        this.cards.push(new Card('Jack', 'Club', 11, 'U+1F0DB', 'black'));
        this.cards.push(new Card('Queen', 'Club', 12, 'U+1F0DD', 'black'));
        this.cards.push(new Card('King', 'Club', 13, 'U+1F0DE', 'black'));

        /* DIAMONDS */
        this.cards.push(new Card('Ace', 'Diamond', 14, 'U+1F0C1', 'red'));
        this.cards.push(new Card('2', 'Diamond', 2, 'U+1F0C2', 'red'));
        this.cards.push(new Card('3', 'Diamond', 3, 'U+1F0C3', 'red'));
        this.cards.push(new Card('4', 'Diamond', 4, 'U+1F0C4', 'red'));
        this.cards.push(new Card('5', 'Diamond', 5, 'U+1F0C5', 'red'));
        this.cards.push(new Card('6', 'Diamond', 6, 'U+1F0C6', 'red'));
        this.cards.push(new Card('7', 'Diamond', 7, 'U+1F0C7', 'red'));
        this.cards.push(new Card('8', 'Diamond', 8, 'U+1F0C8', 'red'));
        this.cards.push(new Card('9', 'Diamond', 9, 'U+1F0C9', 'red'));
        this.cards.push(new Card('10', 'Diamond', 10, 'U+1F0CA', 'red'));
        this.cards.push(new Card('Jack', 'Diamond', 11, 'U+1F0CB', 'red'));
        this.cards.push(new Card('Queen', 'Diamond', 12, 'U+1F0CD', 'red'));
        this.cards.push(new Card('King', 'Diamond', 13, 'U+1F0CE', 'red'));
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

    }
}

export default Deck;
