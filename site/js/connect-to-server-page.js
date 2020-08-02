import { createConnectionClientInstance } from '../js/networking/networking-client.js';

Vue.component("join-server", {
  template: '#join-server',
  data() {
    return {
        serverUri: 'http://localhost:56351',
        connectedToServer: false,
        serverName: '',
        message: 'robertSaysHi',
      }
  },
  methods: {
    connectToServer: async function (event) {

      if (event) {
        event.preventDefault();
      }

      this.connectedToServer = connectToServer(this.serverUri)


    },
    sendBroadcastMessage: async function (event) {
      event.preventDefault();
      await broadcastMessage({message: this.message})
    }
  }
});

var connectionCI;

const connectToServer = async function (serverUri) {

  if (connectionCI) {
    return true
  }

  const { connectionClientInstance } = await openServer({serverUri: serverUri || "http://localhost:56351", messageHandler: eventBus});
  connectionCI = connectionClientInstance

      // Just mount the connectionClientInstance onto teh event bus global
  eventBus.$on("to-server", (message) => connectionClientInstance.broadcastMessage({ message }))

  return true
}

const openServer = async ({ serverUri, messageHandler }) => {

  const connectionClientInstance = await createConnectionClientInstance({ serverUri, messageHandler });
  return { connectionClientInstance };
};

const broadcastMessage = async ({ message }) => {
  try {
    console.log('Requesting broadcast message transmission');
    await eventBus.$emit("to-server", { message });
  } catch (error) {
    console.error('caught error when attempting to broadcast a message');
    console.error(error.message);
    console.error(error.stack);
  }
};

export { connectToServer }