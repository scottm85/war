import React from "react";

class PlayField extends React.Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        return (
            <div className='play-field'>
                <div className='player-one'>
                    <div>Player: {this.props.players[0].name}</div>
                    <div>
                        {this.props.players[0].hand.map((card, key) => <div className='card' data-val={card.value} data-suit={card.suit.name} style={{color: card.suit.color}} key={key} dangerouslySetInnerHTML={{ __html: card.unicode}} />)}
                    </div>
                </div>
                <div className='field'>
                    <div/>
                </div>
                <div className='player-two'>
                    <div>Player: {this.props.players[1].name}</div>
                    <div>
                        {this.props.players[1].hand.map((card, key) => <div className='card' data-val={card.value} data-suit={card.suit.name} style={{color: card.suit.color}} key={key} dangerouslySetInnerHTML={{ __html: card.unicode}} />)}
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayField;