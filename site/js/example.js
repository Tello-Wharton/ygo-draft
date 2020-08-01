
window.addEventListener('DOMContentLoaded', () => {
	
	var app = new Vue(
		{
		  el: '#app',
		  data: {
		    message: "Hello",
				cards: [],
				images: []
		  },
		  methods: {
		  	openPack: async function() {

		  		await	window.openPack("LOB").then(tenCards => this.cards = tenCards)

					const cardIds = this.cards.map(card => card.id)

					this.images = []
					for ( var i = 0 ; i < cardIds.length ; i++ )
					{
						const img = await window.getCardImage(cardIds[i])
						this.images.push(img)
					}

		  	}
		  },
			created: function() {
				this.openPack()
			}
		})
})
