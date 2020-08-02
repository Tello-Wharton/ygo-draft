const fs = require('fs');

const pathChar = '\\';


const root = process.env.APPDATA +  pathChar + "ygo-draft" + pathChar;
const cache = root + pathChar + "cache" + pathChar;
const cardImages = cache + pathChar + "card-images" + pathChar;
const cardInfo = cache + pathChar + "cardinfo.json";
const cardSets = cache + pathChar + "cardsets.json";


const mkdirIfNotExistsSync = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

mkdirIfNotExistsSync(root);
mkdirIfNotExistsSync(cache);
mkdirIfNotExistsSync(cardImages);


module.exports = {
	pathChar,
	cache,
	cardImages,
	cardInfo,
	cardSets
}