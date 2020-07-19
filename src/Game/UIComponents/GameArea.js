import React from "react";
import openSocket from 'socket.io-client';
import PlayerList from "./PlayerList";
import PlayField from './PlayField';
import GameState from '../GameState';
import PlayerType from '../PlayerType';

class GameArea extends React.Component
{
    constructor(props)
    {
        super();
        this.state = {
            players: [],
            gameState: GameState.IDLE
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

        this.socket.on('playersUpdate', (players) => {
            this.setState({ players: players});
            console.log(this.state.players)
        });

        this.socket.on('gameState', (gameState) => {
            this.setState({ gameState: gameState });
            console.log(this.gameState);
        });
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
            <div className='container game-area'>
                <div className='row'>
                    <PlayerList
                        players={this.state.players}
                        socket={this.socket}
                    />
                    {this.state.players.length > 1 && this.state.gameState === GameState.SETUP &&
                    <PlayField
                        gameState={this.state.gameState}
                        players={this.state.players.filter((e) => { return e.type === PlayerType.PLAYER; })}
                        socket={this.socket}
                    />
                    }
                </div>
            </div>
        );
    }
}

export default GameArea;