import React from "react";

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

    render()
    {
        return (
            <div className='col play-field'>
                <div className='container'>
                    <div className='row'>
                        <div className='col player-one'>
                            <div>Player: {this.props.players[0].name}</div>
                            <div>Score: {this.props.players[0].score}</div>
                            <div>
                                <div className='play-card' style={{color: this.cardBack.color}} dangerouslySetInnerHTML={{ __html: this.cardBack.unicode}} />
                                {/*{this.props.players[0].hand.map((card, key) => <div className='card' style={{color: card.suit.color}} key={key} dangerouslySetInnerHTML={{ __html: card.unicode}} />)}*/}
                            </div>
                        </div>
                        <div className='col field'>
                            <div/>
                        </div>
                        <div className='col player-two text-right'>
                            <div>Player: {this.props.players[1].name}</div>
                            <div>Score: {this.props.players[1].score}</div>
                            <div>
                                <div className='play-card' style={{color: this.cardBack.color}} dangerouslySetInnerHTML={{ __html: this.cardBack.unicode}} />
                                {/*{this.props.players[1].hand.map((card, key) => <div className='card' style={{color: card.suit.color}} key={key} dangerouslySetInnerHTML={{ __html: card.unicode}} />)}*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayField;