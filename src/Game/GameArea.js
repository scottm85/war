import React from "react";
import PlayerType from './PlayerType';
import openSocket from 'socket.io-client';

class GameArea extends React.Component
{
    constructor(props)
    {
        super();
        this.socket = openSocket('http://localhost:8000');
        this.state = {
            players: []
        };

        this.initSocket();
    }

    componentDidMount()
    {
        this.setState({});
    }

    initSocket()
    {
        this.socket.on('connect', () => {
            let playerName = this.getPlayerName();
            this.socket.emit('newPlayer', playerName);
        });

        this.socket.on('playersUpdate', (players) => this.setState({'players': players}));
    }

    getPlayerName()
    {
        let name = prompt('Enter your name');
        if (name.length > 0)
        {
            return name;
        }
        this.getPlayerName();
    }

    render()
    {
        return (
            <div>
                <div>
                    <h3>Players</h3>
                    <ul>
                        { this.state.players.map((player, key) => player.type === PlayerType.PLAYER && <li>{player.name}</li>)  }
                    </ul>
                    <h3>Spectators</h3>
                    <ul>
                        { this.state.players.map((player, key) => player.type === PlayerType.SPECTATOR && <li>{player.name}</li>)  }
                    </ul>
                </div>
            </div>
        );
    }
}

export default GameArea;