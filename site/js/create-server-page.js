import { startServer, getConnectedClients } from '../js/networking/server-service.js';
import { connectToServer } from '../js/connect-to-server-page.js';


Vue.component("create-server", {
  template: '#create-server',
  data() {
    return {
        message: "Hello",
        serverPort: '56351',
        serverName: 'TestServer🍰',
        serverCreated: false,
        gameId: null,
        url: null,
        connectedClients: [],
        cards: [],
        images: []
      }
  },
  methods: {
    requestNewServer: async function({ serverName, serverPort }) {
    try {
      const { serverDetails } = await startServer({ serverName, serverPort });
      // TODO: display response to user in ui
      this.url = serverDetails.serverUri


      connectToServer().then(() => this.createGame())
      
      this.serverCreated = true

      console.log(serverDetails);
    } catch (error) {
      console.error('Caught error in create-server page');
      alert(error.message);
    }
  },
  createGame: function() {
    
    let d = new Date();
    let t = d.getTime();

    const message = {
      command : "new-game",
      game_id: t
    }

    eventBus.$emit("to-server", message )

  },
  createServer: function (event) {
      event.preventDefault();
      this.requestNewServer({serverPort: this.serverPort, serverName: this.serverName })
    },
    getCurrentlyConnectedClients: async function (event) {
      event.preventDefault();
      this.connectedClients = await requestCurrentlyConnectedClients();
    }
  },
  created: function() {
    eventBus.$on("from-server", (payload) => {
      const { message } = payload;

      if (message.actionCompleted === "new-game") {
        this.gameId = message.data.gameId
      }

    })
  }
})

const requestCurrentlyConnectedClients = async () => {
  const { clients } = await getConnectedClients();
  console.log('GOT CLIENTS');
  console.log(clients);
  return clients;
};
