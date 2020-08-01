const fs = require('fs');

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

module.exports = {
  getCardImage: async (id, imageUrl) => {
    const fileName = `${id}.jpg`;
    const filePath = cardImages + pathChar + fileName;

    const res = await fetch(imageUrl);
    await new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(filePath);
      res.body.pipe(fileStream);
      res.body.on('error', (err) => {
        fileStream.close();
        reject(err);
      });
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    });

    return imageUrl;
  },
};
