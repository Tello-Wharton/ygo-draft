import { createConnectionClientInstance } from '../js/networking/networking-client.js';
// import * as rxjs from 'rxjs';

// Global, cause its late
let connectionClientInstance;
let globalServerDetails;

window.addEventListener('DOMContentLoaded', async () => {
  const app = new Vue(
      {
        el: '#app',
        data:
            {
              serverUri: 'http://localhost:56351',
              connectedToServer: false,
              serverName: '',
              message: 'robertSaysJHi',
              broadcastMessageHandler: async function (payload) {
                console.log('called into broadcastMessageHandler Test');
                const { message } = payload;
                // this will be undefined as this is not "legal" vue?
                this.message = message;
              }
            },
        created: () => {
          const init = async () => {

          };
          init();
        },
        methods: {
          connectToServer: async function (event) {
            event.preventDefault();
            await openServer({serverUri: this.serverUri, messageHandler: this.broadcastMessageHandler})
          },
          sendBroadcastMessage: async function (event) {
            event.preventDefault();
            await broadcastMessage({message: this.message})
          }
        }
      })
});

const openServer = async ({ serverUri, messageHandler }) => {
  if (connectionClientInstance) {
   throw new Error('Already connected to a server')
  }
  connectionClientInstance = await createConnectionClientInstance({ serverUri, messageHandler });
};

const broadcastMessage = async ({ message }) => {
  try {
    console.log('Requesting broadcast message transmission');
    await connectionClientInstance.broadcastMessage({ message });
  } catch (error) {
    console.error('caught error when attempting to broadcast a message');
    console.error(error.message);
    console.error(error.stack);
  }
};
