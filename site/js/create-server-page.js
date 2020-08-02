import { startServer, getConnectedClients } from '../js/networking/networking-client.js';


Vue.component("create-server", {
  template: '#create-server',
  data() {
    return {
        message: "Hello",
        serverPort: '56351',
        serverName: 'TestServer🍰',
        connectedClients: [],
        cards: [],
        images: []
      }
  },
  created: () => {
    const init = async () => {

    };
    init();
  },
  methods: {
    createServer: function (event) {
      event.preventDefault();
      requestNewServer({serverPort: this.serverPort, serverName: this.serverName })
    },
    getCurrentlyConnectedClients: async function (event) {
      event.preventDefault();
      this.connectedClients = await requestCurrentlyConnectedClients();
    }
  }
})

const requestNewServer = async ({ serverName, serverPort }) => {
  try {
    const { serverDetails } = await startServer({ serverName, serverPort })
    // TODO: display response to user in ui
    console.log(serverDetails);
  } catch (error) {
    console.error('Caught error in create-server page');
    alert(error.message);
  }
};

const requestCurrentlyConnectedClients = async () => {
  const { clients } = await getConnectedClients();
  console.log('GOT CLIENTS');
  console.log(clients);
  return clients;
};
