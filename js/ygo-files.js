
const fs = require('fs');
const util = require('util');

const fsAccess = util.promisify(fs.access)
const fsReadFile = util.promisify(fs.readFile)
const fsWriteFile = util.promisify(fs.writeFile)


const fetch = require('node-fetch');


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
  const fileName = cardId + ".jpg";
  return cardImages + pathChar + fileName;
};


const addImageToLocalCache = async ({ imageUrl, path }) => {
  // console.log(`addImageToLocalCache called with imageUrl:${imageUrl} and path:${path}`);

  await fetch(imageUrl).then(res => new Promise((resolve, reject) => {
    
    const dest = fs.createWriteStream(path);
    res.body.pipe(dest);

    dest.on('close', () => {
      dest.end()
      resolve()
    });
    
    dest.on('error', () => {
      dest.end()
      reject()
    });

  }));
};

const getCardImage = async ({ id: cardId , image_url: imageUrl }) => {
  // console.log('getCardImage called');

  const path = getCardFilePath({cardId});
  const cardImageIsInLocalCache = await doesFileExist({path});

  if (!cardImageIsInLocalCache) {
    await addImageToLocalCache({imageUrl, path});
  }

  return path;

};


const getEndpointData = async (path, endpoint) => {

  const fileExists = await doesFileExist({path})

  if (fileExists) {
    console.log("using cached " + path)
    return await fsReadFile(path).then(json => JSON.parse(json))
  }

  console.log("fetching cardinfo from " + endpoint)
  const json = await fetch(endpoint).then((res) => res.json())

  await fsWriteFile(path, JSON.stringify(json));

  return json
}

const getCardInfo = async () => {
  return await getEndpointData(cardInfo, "https://db.ygoprodeck.com/api/v7/cardinfo.php")
}

const getCardSets = async () => {
  return await getEndpointData(cardSets, "https://db.ygoprodeck.com/api/v7/cardsets.php")
}


module.exports = {
  getCardImage,
  getCardInfo,
  getCardSets
};
