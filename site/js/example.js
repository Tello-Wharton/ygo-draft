
const exampleFunction = async() => {
	const tenCards = await window.getTenCards()
	console.log(tenCards)
	return tenCards;
}


window.addEventListener('DOMContentLoaded', () => {
	var app = new Vue(
		{
		  el: '#app',
		  data:
			{
		    message: "Hello",
				cards: [],
				images: []
		  },
			created: function() {
				 // exampleFunction().then(tenCards => this.cards = tenCards)


					const init = async () => {
						await	window.getTenCards().then(tenCards => this.cards = tenCards)

						const cardIds = this.cards.map(card => card.id)

						for ( var i = 0 ; i < cardIds.length ; i++ )
						{
							const img = await window.getCardImage(cardIds[i])
							this.images.push(img)
						}

					 }

					 init();



			}


		})


})
