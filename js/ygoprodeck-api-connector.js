
const fs = require("./filesystem-api")


const cardInfo = fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php").then(response => response.json())
const cardImages = cardInfo.then(response => {
	const cardImages = {}

	response.data.forEach((card) => {
		
		const id = "" + card.id
		const image_urls = {}

		for (var i = 0; i < card.card_images.length; i++) {
			const image = card.card_images[i]

			if (image.id == id ) {

				image_urls["image_url"] = image["image_url"]
				image_urls["image_url_small"] = image["image_url_small"]
				break;

			}
		}

		delete card.card_images
		
		cardImages[id] = image_urls

	})

	console.log(cardImages)

	return cardImages
})


module.exports = {
	getCardInfo: async () => await cardInfo
}