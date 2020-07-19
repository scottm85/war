import React from "react";
import PlayerType from "../PlayerType";
import Button from 'react-bootstrap/Button';

class PlayerList extends React.Component
{
    constructor(props)
    {
        super();
    }

    updatePlayerStatus()
    {
        this.props.socket.emit('playerStatusUpdate', true);
    }

    render()
    {
        return (
            <div className='col-12 col-lg-2 player-list'>
                <div>
                    <h3>Players</h3>
                    <ul>
                        {
                            this.props.players.map((player, key) => player.type === PlayerType.PLAYER &&
                                <li className='py-2' key={key}>
                                    {player.name}
                                    {!player.ready && player.id === this.props.socket.id
                                        ? <Button className='btn-sm float-right' onClick={() => {this.updatePlayerStatus()}}>Ready</Button>
                                        : !player.ready && player.id !== this.props.socket.id ? <span className='float-right'>Not Ready</span>
                                        : <span className='float-right'>Ready!</span>}
                                </li>
                            )
                        }
                    </ul>
                </div>
                {this.props.players.length > 2 &&
                    <div>
                        <h3>Spectators</h3>
                        <ul>
                        { this.props.players.map((player, key) => player.type === PlayerType.SPECTATOR && <li key={key}>{player.name}</li>)  }
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

export default PlayerList;