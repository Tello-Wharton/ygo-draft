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
  created: function() {
  },
  methods: {
    connectToServer: async function (event) {
      event.preventDefault();
      const { connectionClientInstance } = await openServer({serverUri: this.serverUri, messageHandler: eventBus});
      // Just mount the connectionClientInstance onto teh event bus global
      eventBus.$on("to-server", (message) => connectionClientInstance.broadcastMessage({ message }))
    },
    sendBroadcastMessage: async function (event) {
      event.preventDefault();
      await broadcastMessage({message: this.message})
    }
  }
});

const openServer = async ({ serverUri, messageHandler }) => {
  if (eventBus.connectionClientInstance) {
   throw new Error('Already connected to a server')
  }
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
