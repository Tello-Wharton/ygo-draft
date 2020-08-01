const fs = require('./filesystem-api');

const cardInfo = fs.getCardInfo()
const cardSetsInfo = fs.getCardSets()

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

  return cardImages;
});

const cardSets = cardInfo.then((response) => {

  const cardSets = {};

  response.data.forEach((card) => {
    
    const id = `${card.id}`;

    if (card.card_sets) {

      card.card_sets.forEach((cardset) => {

        const setcode = cardset.set_code.split("-")[0]

        if (!cardSets[setcode]) {
          cardSets[setcode] = []
        }

        cardSets[setcode].push({"id" : id}) 

      })
    }

  });

  console.log(cardSets)

  return cardSets

});


const getCardInfo = async () => await cardInfo
const getCardSetsInfo = async () => await cardSetsInfo
const getCardSetCodes = async () => await cardSets.then(a => Object.keys(a))

const getCardImage = async (id) => {
  id = String(id);
  const image_url = await cardImages.then((images) => images[id].image_url);
  return await fs.getCardImage({id, image_url});
}

const openPack = async (setCode) => {
  
  const cards = await cardSets.then(sets => sets[setCode])

  return Array(9).fill()
    .map(n => Math.random() * cards.length)
    .map(i => parseInt(i))
    .map(i => cards[i])
}

module.exports = {
  getCardInfo,
  getCardSetsInfo,
  getCardSetCodes,
  getCardImage,
  openPack,
};
