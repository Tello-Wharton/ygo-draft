const Server = require('socket.io');

const startServer = async ({ serverPort, serverName }) => {
  try {
    console.log(`Call received to startServer with serverPort:${serverPort} and serverName:${serverName}`);

    const io = new Server(serverPort);

    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  } catch (error) {
    console.error('Caught error when attempting to startServer in gameServer.js in the node process');
    console.error(error.message);
    console.error(error.stack);
  }
};


module.exports = {
  startServer,
};
