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
        this.cards.push(new Card('Ace', Suit.SPADE, 14, '&#127137;'));
        this.cards.push(new Card('2', Suit.SPADE, 2, '&#127138;'));
        this.cards.push(new Card('3', Suit.SPADE, 3, '&#127139;'));
        this.cards.push(new Card('4', Suit.SPADE, 4, '&#127140;'));
        this.cards.push(new Card('5', Suit.SPADE, 5, '&#127141;'));
        this.cards.push(new Card('6', Suit.SPADE, 6, '&#127142;'));
        this.cards.push(new Card('7', Suit.SPADE, 7, '&#127143;'));
        this.cards.push(new Card('8', Suit.SPADE, 8, '&#127144;'));
        this.cards.push(new Card('9', Suit.SPADE, 9, '&#127145;'));
        this.cards.push(new Card('10', Suit.SPADE, 10, '&#127146;'));
        this.cards.push(new Card('Jack', Suit.SPADE, 11, '&#127146;'));
        this.cards.push(new Card('Queen', Suit.SPADE, 12, '&#127149;'));
        this.cards.push(new Card('King', Suit.SPADE, 13, '&#127150;'));

        /* HEARTS */
        this.cards.push(new Card('Ace', Suit.HEART, 14, '&#127153;'));
        this.cards.push(new Card('2', Suit.HEART, 2, '&#127154;'));
        this.cards.push(new Card('3', Suit.HEART, 3, '&#127155;'));
        this.cards.push(new Card('4', Suit.HEART, 4, '&#127156;'));
        this.cards.push(new Card('5', Suit.HEART, 5, '&#127157;'));
        this.cards.push(new Card('6', Suit.HEART, 6, '&#127158;'));
        this.cards.push(new Card('7', Suit.HEART, 7, '&#127159;'));
        this.cards.push(new Card('8', Suit.HEART, 8, '&#127160;'));
        this.cards.push(new Card('9', Suit.HEART, 9, '&#127161;'));
        this.cards.push(new Card('10', Suit.HEART, 10, '&#127162;'));
        this.cards.push(new Card('Jack', Suit.HEART, 11, '&#127163;'));
        this.cards.push(new Card('Queen', Suit.HEART, 12, '&#127165;'));
        this.cards.push(new Card('King', Suit.HEART, 13, '&#127166;'));

        /* CLUBS */
        this.cards.push(new Card('Ace', Suit.CLUB, 14, '&#127185;'));
        this.cards.push(new Card('2', Suit.CLUB, 2, '&#127186;'));
        this.cards.push(new Card('3', Suit.CLUB, 3, '&#127187;'));
        this.cards.push(new Card('4', Suit.CLUB, 4, '&#127188;'));
        this.cards.push(new Card('5', Suit.CLUB, 5, '&#127189;'));
        this.cards.push(new Card('6', Suit.CLUB, 6, '&#127190;'));
        this.cards.push(new Card('7', Suit.CLUB, 7, '&#127191;'));
        this.cards.push(new Card('8', Suit.CLUB, 8, '&#127192;'));
        this.cards.push(new Card('9', Suit.CLUB, 9, '&#127193;'));
        this.cards.push(new Card('10', Suit.CLUB, 10, '&#127194;'));
        this.cards.push(new Card('Jack', Suit.CLUB, 11, '&#127195;'));
        this.cards.push(new Card('Queen', Suit.CLUB, 12, '&#127197;'));
        this.cards.push(new Card('King', Suit.CLUB, 13, '&#127198;'));

        /* DIAMONDS */
        this.cards.push(new Card('Ace', Suit.DIAMOND, 14, '&#127169;'));
        this.cards.push(new Card('2', Suit.DIAMOND, 2, '&#127170;'));
        this.cards.push(new Card('3', Suit.DIAMOND, 3, '&#127171;'));
        this.cards.push(new Card('4', Suit.DIAMOND, 4, '&#127172;'));
        this.cards.push(new Card('5', Suit.DIAMOND, 5, '&#127173;'));
        this.cards.push(new Card('6', Suit.DIAMOND, 6, '&#127174;'));
        this.cards.push(new Card('7', Suit.DIAMOND, 7, '&#127175;'));
        this.cards.push(new Card('8', Suit.DIAMOND, 8, '&#127176;'));
        this.cards.push(new Card('9', Suit.DIAMOND, 9, '&#127177;'));
        this.cards.push(new Card('10', Suit.DIAMOND, 10, '&#127178;'));
        this.cards.push(new Card('Jack', Suit.DIAMOND, 11, '&#127179;'));
        this.cards.push(new Card('Queen', Suit.DIAMOND, 12, '&#127181;'));
        this.cards.push(new Card('King', Suit.DIAMOND, 13, '&#127182;'));

        console.log("----------------- Deck Built -----------------");
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

        console.log("----------------- Deck Shuffled -----------------");
    }

    split()
    {
        let cards = this.cards,
            splitDeck = { 0: [], 1: [] };

        for (let i = 0; i < cards.length; i++)
        {
            splitDeck[i % 2].push(cards[i]);
        }

        console.log("----------------- Deck Split -----------------");
        return splitDeck;
    }
}

module.exports = Deck;
