import { createConnectionClientInstance } from '../js/networking/networking-client.js';
// import * as rxjs from 'rxjs';

// Global, cause its late
let connectionClientInstance;

Vue.component("join-server", {
  template: '#join-server',
  data() {
    return {
        serverUri: 'http://localhost:56351',
        connectedToServer: false,
        serverName: '',
        message: 'robertSaysHi',
        broadcastMessageHandler: async function (payload) {
          console.log('called into broadcastMessageHandler Test');
          const { message } = payload;
          // this will be undefined as this is not "legal" vue?
          this.message = message;
        }
      }
  },
  created: function() {

    this.$on("broadcast-message", (payload) => {
      const { message } = payload;
      console.log(`Vue handling broadcast-message with message:${message}`);
      this.message = message;
    });
  },
  methods: {
    connectToServer: async function (event) {
      event.preventDefault();
      await openServer({serverUri: this.serverUri, messageHandler: this})
    },
    sendBroadcastMessage: async function (event) {
      event.preventDefault();
      await broadcastMessage({message: this.message})
    }
  }
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
