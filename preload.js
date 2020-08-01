// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

const ygo = require('./js/ygoprodeck-api-connector');

ygo.getCardInfo().then((info) => console.log(info));
ygo.getCardImage('46986414').then((img) => console.log(img));

console.log("cake")
ygo.getCardSetsInfo().then((sets) => console.log(sets));
ygo.getCardSetCodes().then((sets) => console.log(sets));


window.getTenCards = async () => ygo.getCardInfo().then((response) => response.data.slice(0, 10));
window.getCardImage = async(id) => ygo.getCardImage(id) 