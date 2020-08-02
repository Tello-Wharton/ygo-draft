import { createConnectionClientInstance } from '../js/networking/networking-client.js';


var gameId

const joinGame = (gameid, username) => {

  gameId = gameid

  const message = {
    command : "join-game",
    game_id: gameId,
    username: username
  }

  eventBus.$emit("to-server", message)
}


Vue.component("join-server", {
  template: '#join-server',
  data() {
    return {
        serverUri: 'http://localhost:56351',
        game: null,
        gameId: "",
        username: "",
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

      this.connectedToServer = await connectToServer(this.serverUri)
      joinGame(this.gameId, this.username)


    },
    sendBroadcastMessage: async function (event) {
      event.preventDefault();
      await broadcastMessage({message: this.message})
    }
  },
  created: function() {

    eventBus.$on("from-server", (payload) => {
      const { message } = payload;

      if (message.actionCompleted === "get-game" || message.actionCompleted === "join-game") {
        this.game = message.data
      }

    })

    if (connectionCI) {
      this.connectedToServer = true

      const message = {
        command : "get-game",
        game_id: gameId
      }

      eventBus.$emit("to-server", message)

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

export { connectToServer, joinGame }