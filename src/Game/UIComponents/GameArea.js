import React from "react";
import openSocket from 'socket.io-client';
import PlayerList from "./PlayerList";
import PlayField from './PlayField';
import GameState from '../GameState';
import PlayerType from '../PlayerType';
import MessageLog from './MessageLog';

class GameArea extends React.Component
{
    constructor(props)
    {
        super();
        this.state = {
            players: [],
            gameState: GameState.IDLE,
            messages: []
        };
    }

    componentDidMount()
    {
        this.socket = openSocket(':8000');
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
        });

        this.socket.on('gameState', (gameState) => {
            this.setState({ gameState: gameState });
        });

        this.socket.on('winner', (playerName) => {
            alert(playerName + ' won the game!');
        });

        this.socket.on('message', (message) => {
            this.updateMessageLog(message);
        });
    }

    updateMessageLog(message)
    {
        let messages = this.state.messages;
        messages.unshift(message);
        this.setState({ messages: messages });
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
            <div className='container game-area mt-lg-3'>
                <div className='row'>
                    <PlayerList
                        players={this.state.players}
                        gameState={this.state.gameState}
                        socket={this.socket}
                    />
                    {this.state.players.length > 1 && this.state.gameState === GameState.ACTIVE &&
                    <PlayField
                        gameState={this.state.gameState}
                        turnState={this.state.turnState}
                        players={this.state.players.filter((e) => { return e.type === PlayerType.PLAYER; })}
                        socket={this.socket}
                    />
                    }
                    <MessageLog
                        messages={this.state.messages}
                    />
                </div>
            </div>
        );
    }
}

export default GameArea;