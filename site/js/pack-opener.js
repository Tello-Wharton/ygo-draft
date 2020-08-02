

Vue.component("pack-opener", {
  template: '#pack-opener',
  data() {
    return {
      message: "Hello",
      cards: [],
      newFront: '',
      newBack: '',
      error: false
    }
  },
  methods: {
    openPack: async function() {

      this.cards = []
      this.cards.push(null)
      this.cards.pop()

      await window.openPack("LOB").then(tenCards => this.cards = tenCards)

      this.cards.push(null)
      this.cards.pop()

      const cardIds = this.cards.map(card => card.id)

      for ( var i = 0 ; i < cardIds.length ; i++ ){
        const img = await window.getCardImage(cardIds[i])
        this.cards[i]["image"] = img
      }

      this.cards.push(null)
      this.cards.pop()

      restart()

    },
    toggleCard: function(card) {
      
      card.flipped = true;

      this.cards.push(null)
      this.cards.pop()
    },
  },
  created: function() {
    
  }

})
