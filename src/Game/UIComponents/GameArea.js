import React from "react";
import openSocket from 'socket.io-client';
import PlayerList from "./PlayerList";

class GameArea extends React.Component
{
    constructor(props)
    {
        super();
        this.state = {
            players: []
        };
    }

    componentDidMount()
    {
        this.socket = openSocket('http://localhost:8000');
        this.initSocket();
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
        if (name != null && name.length > 0)
        {
            return name;
        }
        return this.getPlayerName();
    }

    render()
    {
        return (
            <div>
                <PlayerList players={this.state.players} />
            </div>
        );
    }
}

export default GameArea;