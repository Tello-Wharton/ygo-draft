const fs = require('./filesystem-api');

const cardInfo = fs.getCardInfo()
const cardSets = fs.getCardSets()

const cardImages = cardInfo.then((response) => {
  const cardImages = {};

  response.data.forEach((card) => {
    const id = `${card.id}`;
    const image_urls = {};

    for (let i = 0; i < card.card_images.length; i++) {
      const image = card.card_images[i];

      if (image.id == id) {
        image_urls.image_url = image.image_url;
        image_urls.image_url_small = image.image_url_small;
        break;
      }
    }

    delete card.card_images;

    cardImages[id] = image_urls;
  });

  console.log(cardImages);

  return cardImages;
});

module.exports = {
  getCardInfo: async () => await cardInfo,
  getCardSets: async () => await cardSets,
  getCardImage: async (id) => {
    id = String(id);
    const image_url = await cardImages.then((images) => images[id].image_url);
    return await fs.getCardImage({id, image_url});
  },
};
