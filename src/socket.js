const io = require('socket.io')(),
      port = 8000;

let GameController = require('./Game/GameController'),
    gameController = new GameController();

io.listen(port);
console.log('Socket.IO is listening on port 8000');

io.sockets.on('connection', (socket) => {
    console.log('User connected!');

    socket.on('newPlayer', (name) => {
        gameController.newPlayer(socket.id, name);
        console.log(gameController.players);
    });
});