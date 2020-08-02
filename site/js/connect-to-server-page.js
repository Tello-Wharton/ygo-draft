import { openConnectionToServer } from '../js/networking/networking-client.js';
// import * as rxjs from 'rxjs';

// Global, cause its late
let globalSocket;
let globalServerDetails;


Vue.component("join-server", {
  template: '#join-server',
  data() {
    return {
        serverUri: 'http://localhost:56351',
        connectedToServer: false,
        serverName: '',
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
      await openServer({serverURI: this.serverUri})
    }
  }
})

const openServer = async ({ serverURI }) => {
  if (globalSocket) {
   throw new Error('Already connected to a server')
  }
  const { socket } = await openConnectionToServer({ serverURI });
  globalSocket = socket;

  // Need to re-vist how this is called in and passed state
  connectionManager({ socket })

};

const connectionManager = ({ socket }) => {
  socket.on('serverDetails', (serverDetails) => {
    console.log('Handling serverDetails');
    console.log(data);
    globalServerDetails = serverDetails;
  });
};
