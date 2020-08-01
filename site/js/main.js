
window.addEventListener('DOMContentLoaded', () => {
	
	var app = new Vue({
		el: '#app',
		data: {
		  message: "Hello",
		  cards: [],
		newFront: '',
		newBack: '',
		error: false
		},
		methods: {
			openPack: async function() {

				await	window.openPack("LOB").then(tenCards => this.cards = tenCards)

				const cardIds = this.cards.map(card => card.id)

				for ( var i = 0 ; i < cardIds.length ; i++ )
				{
					const img = await window.getCardImage(cardIds[i])
					this.cards[i]["image"] = img
				}

				
			      this.cards.push(null)
			      this.cards.pop()

				restart()

		  },
		  toggleCard: function(card) {
		      card.flipped = !card.flipped;

		      console.log(card.flipped)

		      this.cards.push(null)
		      this.cards.pop()

		    },
		    addNew: function() {
		      if(!this.newFront || !this.newBack) {
		        this.error = true;
		      } else {
		        this.cards.push({
		          front: this.newFront,
		          back: this.newBack,
		          flipped: false
		        });
		        // set the field empty
		        this.newFront = '';
		        this.newBack = '';
		        // Make the warning go away
		        this.error= false;
		      }
		    }
		},
		created: function() {
			this.openPack()
		}
	})
})
