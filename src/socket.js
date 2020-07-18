const port = 8000,
      io = require('socket.io')().listen(port);

let GameController = require('./Game/GameController'),
    gameController = new GameController(io.sockets);

console.log('Socket.IO is listening on port 8000');