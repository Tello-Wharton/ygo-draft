const Server = require('socket.io');

class InvalidOperationError extends Error {}

let serverRunning = false;
let currentServer;

const startServer = async ({ serverPort, serverName }) => {
  try {
    console.log(`Call received to startServer with serverPort:${serverPort} and serverName:${serverName}`);

    if (serverRunning) {
      throw new InvalidOperationError('Cannot start server, existing server running');
    }

    const io = new Server(serverPort);
    serverRunning = true;
    currentServer = io;

    console.log(`Created server`);

    io.on('connection', (socket) => {
      console.log('a user connected');

      socket.emit('serverDetails', {serverName, serverUri });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });


  } catch (error) {
    if (error instanceof InvalidOperationError) {
      throw error;
    }
    console.error('Caught error when attempting to startServer in gameServer.js in the node process');
    console.error(error.message);
    console.error(error.stack);
  }

  const serverUri = `YOUR_PUBLIC_IP:${serverPort}`;
  console.log('Returning new details');

  return { serverDetails: {serverName, serverUri }};
};

const broadcast = () => {

};

const getConnectedClients = async () => {
  return new Promise((resolve, reject) => {
    console.log('gameServer Getting connectedClients');
    currentServer.clients((error, clients) => {
      if (error) throw error;
      if (clients.length > 0) {
        console.log('Returning a list of connected clients');
        return resolve({ 'clients': clients })
      }
      console.log('There are no clients connected to the server');
      return resolve({'clients': []});
    });
  })
};

  // getConnectedClients,
module.exports = {
  startServer,
  broadcast,
  getConnectedClients,
};
