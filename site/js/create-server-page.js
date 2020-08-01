import { openClientConnection, startServer } from '../js/networking/networking-client.js';

window.addEventListener('DOMContentLoaded', async () => {
  const app = new Vue(
      {
        el: '#app',
        data:
            {
              message: "Hello",
              serverPort: '56351',
              serverName: 'TestServer🍰',
              cards: [],
              images: []
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
          }
        }
      })
});

const openServer = async ({ serverURI, serverPort }) => {
  await openClientConnection({ serverPort, serverURI });
};

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
