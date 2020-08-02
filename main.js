// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { startServer, broadcast, getConnectedClients } = require('./server/gameServer');


// Global, because I'm tired.
let mainWindowGlobal;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile('./site/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Update the mainWindow global
  mainWindowGlobal = mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


// TODO: Extract the(se) event handlers into their own file
const SERVER_CONFIGURATION_MESSAGE_CHANNEL = 'serverConfigurationMessage';

ipcMain.on(SERVER_CONFIGURATION_MESSAGE_CHANNEL, async (event, messages) => {
  console.log('Handling serverConfigurationMessages');

  messages.forEach( async ({ type, payload }) => {
    console.log(`handling message type:${type}`);
    console.log(`with payload:${JSON.stringify(payload)}`);
    try {
      const responsePayload = await serverConfigurationMessageHandlers[type](payload);
      mainWindowGlobal.webContents.send(SERVER_CONFIGURATION_MESSAGE_CHANNEL,{ type, 'payload': responsePayload});

    } catch (error) {
      console.error(`Caught error from invoke of ${type} handler in serverConfigurationMessage`);
      const niceError = { message: error.message, stack: error.stack };
      mainWindowGlobal.webContents.send(SERVER_CONFIGURATION_MESSAGE_CHANNEL,{ error: niceError });
    }
  })
});

const serverConfigurationMessageHandlers = {
  startServer,
  broadcast,
  getConnectedClients,
};
