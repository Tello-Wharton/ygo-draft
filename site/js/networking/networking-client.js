
function curry(f) { // curry(f) does the currying transform
  return (a) => (b) => f(a, b);
}

const openConnectionToServer = async ({ serverUri }) => {
  try {
    console.log(`Opening server connection to ${serverUri}`);
    const socket = io(serverUri);
    console.log('Opened the socket to server');
    return { socket }
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);
    throw new Error('Failed to open client connection to server');
  }
};

const broadcastMessage = async ( { openSocket },{ message }) => {
  return new Promise((resolve, reject) => {
    openSocket.emit('broadcast', { message }, (responsePayload) => {
      console.log('broadcast response payload:');
      console.log(JSON.stringify(responsePayload));
      resolve(responsePayload);
    });
  })
};

export const createConnectionClientInstance = async ({ serverUri, messageHandler }) => {
  const { socket }  = await openConnectionToServer({ serverUri });

  socket.on('serverDetails', (serverDetails) => {
    console.log('Handling serverDetails');
    console.log(serverDetails);
  });

  socket.on('broadcastMessage', (payload) => {
    console.log('Received broadcast message');
    console.log(`message payload:${JSON.stringify(payload)}`);
    messageHandler.$emit('from-server', payload);
  });

  return {
    'broadcastMessage': curry(broadcastMessage)({ openSocket: socket }),
  }
};
