/**
 * Server Service
 *
 * runs in browser and handles the interactions with the server
 * as a host.
 *
 */

const SERVER_CONFIGURATION_MESSAGE = 'serverConfigurationMessage';

//Generic Message Handling function
const createMessageResponseHandler = function  ({ responseHandler, errorHandler }) {
  return async (event, { error , type, payload }) => {
    console.log('Called into a messageResponseHandler');
    if (error) {
      console.error('Error reported from node process');
      errorHandler(error);
    }
    await responseHandler({ type , payload })
  };
};

export const startServer = async ({ serverPort, serverName }) => {
  console.log(`Requesting start of server on serverPort:${serverPort} and serverName${serverName}`);

  const targetMessageType = 'startServer';
  window.ipcRenderer.send(SERVER_CONFIGURATION_MESSAGE, [{ type: targetMessageType, payload: { serverName, serverPort }}]);

  const { serverDetails } = await new Promise(async (resolve, reject) => {
    const returnResponse = ({ type, payload }) => {
      if (type === targetMessageType) {
        window.ipcRenderer.removeAllListeners(SERVER_CONFIGURATION_MESSAGE);
        resolve(payload);
      }
      // Else continue to wait
    };

    const errorHandler = (error) => {
      window.ipcRenderer.removeAllListeners(SERVER_CONFIGURATION_MESSAGE);
      console.error(error.message);
      console.error(error.stack);
      reject(error);
    };

    const messageResponseHandler = await createMessageResponseHandler({ responseHandler: returnResponse, errorHandler });
    window.ipcRenderer.on(SERVER_CONFIGURATION_MESSAGE, messageResponseHandler);
  });

  return {serverDetails};
};

export const getConnectedClients = async () => {
  console.log(`Requesting getConnectedClients`);

  const targetMessageType = 'getConnectedClients';
  window.ipcRenderer.send(SERVER_CONFIGURATION_MESSAGE, [{ type: targetMessageType, payload: {}}]);

  const { clients } = await new Promise(async (resolve, reject) => {
    const returnResponse = ({ type, payload }) => {
      if (type === targetMessageType) {
        window.ipcRenderer.removeAllListeners(SERVER_CONFIGURATION_MESSAGE);
        resolve(payload);
      }
      // Else continue to wait
    };

    const errorHandler = (error) => {
      window.ipcRenderer.removeAllListeners(SERVER_CONFIGURATION_MESSAGE);
      console.error(error.message);
      console.error(error.stack);
      reject(error);
    };

    const messageResponseHandler = await createMessageResponseHandler({ responseHandler: returnResponse, errorHandler });
    window.ipcRenderer.on(SERVER_CONFIGURATION_MESSAGE, messageResponseHandler);
  });

  return {clients};
};
