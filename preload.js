// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


const ygo = require('./js/ygoprodeck-api-connector');
const { createServer } = require('./server/gameServer');

// ygo.getCardInfo().then((info) => console.log(info));
// ygo.getCardImage('46986414').then((img) => console.log(img));

// ygo.getCardSetsInfo().then((sets) => console.log(sets));
// ygo.getCardSetCodes().then((sets) => console.log(sets));
// ygo.openPack("LOB").then((sets) => console.log(sets));

let cards = [22900598, 1371589]
ygo.getCards(cards).then((cards) => console.log(cards))


window.getTenCards = async () => ygo.getCardInfo().then((response) => response.data.slice(0, 10));
window.getCardImage = async(id) => ygo.getCardImage(id);
window.openPack = async (setCode) => ygo.openPack(setCode);
window.getCardImage = async(id) => ygo.getCardImage(id);
window.getCardSetCodes = async() => ygo.getCardSetCodes();

window.ipcRenderer = require('electron').ipcRenderer;

