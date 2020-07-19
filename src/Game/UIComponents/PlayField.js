import React from "react";
import Button from 'react-bootstrap/Button';

class PlayField extends React.Component
{
    constructor(props)
    {
        super();
        this.cardBack = {
            unicode: '&#127136;',
            color: '#3434bb'
        };
    }

    fetchNextCard()
    {
        this.props.socket.emit('fetchCard');
    }

    render()
    {
        let playerOne = this.props.players[0],
            playerTwo = this.props.players[1];

        return (
            <div className='col play-field'>
                <div className='container'>
                    <div className='row'>
                        <div className='col player-one'>
                            <div>Player: {playerOne.name}</div>
                            <div>Score: {playerOne.score}</div>
                            <div>
                                <div className='play-card' style={{color: this.cardBack.color}} dangerouslySetInnerHTML={{ __html: this.cardBack.unicode}} />
                                <div>{playerOne.id === this.props.socket.id && playerOne.cardsInPlay.length === 0 && <Button className='btn-sm' onClick={() => {this.fetchNextCard()}}>Flip Card</Button>}</div>
                            </div>
                        </div>
                        <div className='col-6 field'>
                            <div className='display-flex mt-5'>
                                <div className='card-in-play w-50 d-inline-block'>
                                    {playerOne.cardsInPlay && playerOne.cardsInPlay.map((card, key) => <div className='play-card' key={key} style={{color: card.suit.color}} dangerouslySetInnerHTML={{ __html: card.unicode}} />)}
                                </div>
                                <div className='card-in-play w-50 d-inline-block text-right'>
                                    {playerTwo.cardsInPlay && playerTwo.cardsInPlay.map((card, key) => <div className='play-card' key={key} style={{color: card.suit.color}} dangerouslySetInnerHTML={{ __html: card.unicode}} />)}
                                </div>
                            </div>
                        </div>
                        <div className='col player-two text-right'>
                            <div>Player: {playerTwo.name}</div>
                            <div>Score: {playerTwo.score}</div>
                            <div>
                                <div className='play-card' style={{color: this.cardBack.color}} dangerouslySetInnerHTML={{ __html: this.cardBack.unicode}} />
                                <div>{playerTwo.id === this.props.socket.id && playerTwo.cardsInPlay.length === 0 && <Button className='btn-sm' onClick={() => {this.fetchNextCard()}}>Flip Card</Button>}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayField;