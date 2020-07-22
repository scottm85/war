This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## War the card game build on NodeJS, React, and Socket.IO

**To Run**

Clone and install dependencies: `npm install`.<br/>
Start the socket server: `node ./src/socket.js`<br>
Start the React UI: `npm start`

**To Play**

React should automatically launch a tab to localhost in your default browser.<br/>
If not, visit [http://localhost:3000](http://localhost:3000) (unless you specified a diffferent port  during startup)

You will be prompted to enter a player name upon opening the page. If you're playing by yourself open a second tab and enter a name for that player as well.<br />
Once the game has two players, they will both need to click ready to start the game. Each player will have a "Flip" button they will need to click each turn.

**More Info**

The react components are state based and only update when the server sends updates via the websocket. The "ready" and "flip" buttons are the only<br/>
client side event triggers. Most of the game logic is located in [`/src/game`](https://github.com/scottm85/war/tree/master/src/Game), where [`GameController.js`](https://github.com/scottm85/war/blob/master/src/Game/GameController.jshttps://github.com/scottm85/war/blob/master/src/Game/GameController.js) contains the controls  for the core game loop.

The other classes either act as object oriented classes([`Player.js`](https://github.com/scottm85/war/blob/master/src/Game/Player.js), [`Deck.js`](https://github.com/scottm85/war/blob/master/src/Game/Deck.js), [`Card.js`](https://github.com/scottm85/war/blob/master/src/Game/Card.js)), or similar to an enum to reduce repetitive string comparisons([`Suit.js`](https://github.com/scottm85/war/blob/master/src/Game/Suit.js), [`PlayerType.js`](https://github.com/scottm85/war/blob/master/src/Game/PlayerType.js), [`GameState.js`](https://github.com/scottm85/war/blob/master/src/Game/GameState.js)).

I wanted to do a bit more with the spectators. Potentially having the next spectator in line replace the loser as the next player, but unfortunately I was running short on time.