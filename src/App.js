import React from 'react';
import './App.css';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function App()
{
    return (
        <div className="App">
            <header className="App-header">

            </header>
        </div>
    );
}

function getPlayerName()
{
    let name = prompt('Enter your name');
    if (name.length > 0)
    {
        return name;
    }
    getPlayerName();
}

socket.on('connect', () => {
    let playerName = getPlayerName();
    socket.emit('newPlayer', playerName);
});

export default App;
