const fs = require('fs');
const fetch = require('node-fetch');

const pathChar = '\\';

const root = `${process.env.APPDATA + pathChar}ygo-draft${pathChar}`;
const cache = `${root + pathChar}cache${pathChar}`;
const cardImages = `${cache + pathChar}card-images${pathChar}`;

const mkdirIfNotExistsSync = (path) => {
  if (!fs.existsSync(path)) {
    	fs.mkdirSync(path);
  }
};

mkdirIfNotExistsSync(root);
mkdirIfNotExistsSync(cache);
mkdirIfNotExistsSync(cardImages);

const doesFileExist = async () => {
  return false;
};

const getCardFilePath = ({ cardId }) => {
  console.log(`getCardFilePath called with ${cardId}`);
  const fileName = `${cardId}.jpg`;
  return cardImages + pathChar + fileName;
};


const addImageToLocalCache = async ({ imageUrl, path }) => {
  console.log(`addImageToLocalCache called with imageUrl:${imageUrl} and path:${path}`);

  await fetch(imageUrl).then(res => new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(path);
    res.body.pipe(dest);
    dest.on('close', () => resolve());
    dest.on('error', reject);
  }));

  return { cachedImagePath : path };
};

module.exports = {
  getCardImage: async ({ id: cardId , image_url: imageUrl }) => {
    console.log('getCardImage called');

    const path = getCardFilePath({ cardId });

    // Does this image exist in our cache
    const cardImageIsInLocalCache = await doesFileExist({ path });

    if (cardImageIsInLocalCache) {
      return path;
    }

    const { cachedImagePath } = await addImageToLocalCache({ imageUrl, path });

    return cachedImagePath;
  },
};
