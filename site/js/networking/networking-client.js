
export const openClientConnection = async ({ serverURI, serverPort }) => {
  console.log(`Opening server connection to ${serverURI}:${serverPort}`);
  const socket = io(`${serverURI}:${serverPort}`);
  console.log('Finished the creation of the socket');
};

export const startServer = async ({ serverPort, serverName }) => {
  console.log(`Requesting start of server on serverPort:${serverPort} and serverName${serverName}`);

  window.ipcRenderer.send('serverConfigurationMessage', [{ type: 'startServer', payload: { serverName, serverPort }}]);
};


