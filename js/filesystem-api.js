
const fs = require('fs');
const util = require('util');

const fsAccess = util.promisify(fs.access)
const fsWriteFile = util.promisify(fs.writeFile)


const fetch = require('node-fetch');


const pathChar = '\\';

const root = `${process.env.APPDATA + pathChar}ygo-draft${pathChar}`;
const cache = `${root + pathChar}cache${pathChar}`;
const cardImages = `${cache + pathChar}card-images${pathChar}`;
const cardInfo = `${cache + pathChar}cardinfo.json`;

const mkdirIfNotExistsSync = (path) => {
  if (!fs.existsSync(path)) {
    	fs.mkdirSync(path);
  }
};

mkdirIfNotExistsSync(root);
mkdirIfNotExistsSync(cache);
mkdirIfNotExistsSync(cardImages);

const doesFileExist = async ({ path }) => {
  // If file can be accessed it is deemed to exit

  try {
    await fsAccess(path)
  } catch {
    return false
  }

  return true

};

const getCardFilePath = ({ cardId }) => {
  // console.log(`getCardFilePath called with ${cardId}`);
  const fileName = `${cardId}.jpg`;
  return cardImages + pathChar + fileName;
};


const addImageToLocalCache = async ({ imageUrl, path }) => {
  // console.log(`addImageToLocalCache called with imageUrl:${imageUrl} and path:${path}`);

  await fetch(imageUrl).then(res => new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(path);
    res.body.pipe(dest);
    dest.on('close', () => resolve());
    dest.on('error', reject);
  }));

  return { cachedImagePath : path };
};

const getCardImage = async ({ id: cardId , image_url: imageUrl }) => {
  // console.log('getCardImage called');

  const path = getCardFilePath({cardId});
  const cardImageIsInLocalCache = await doesFileExist({path});

  if (cardImageIsInLocalCache) {
    return path;
  }

  const {cachedImagePath} = await addImageToLocalCache({imageUrl, path});
  return cachedImagePath;
};


const getCardInfo = async () => {
  const path = cardInfo
  const fileExists = await doesFileExist({path})

  console.log(fileExists)

  if (fileExists) {
    console.log("using cached cardInfo")
    return await JSON.parse(fs.readFileSync(path))
  }

  console.log("fetching cardinfo")
  const json = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php').then((res) => res.json())

  await fsWriteFile(path, JSON.stringify(json));

  return json

}

module.exports = {
  getCardImage,
  getCardInfo
};
