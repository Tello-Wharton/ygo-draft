

Vue.component("pack-opener", {
  template: '#pack-opener',
  data() {
    return {
      message: "Hello",
      cardSets: [],
      cardSetCode: "",
      cards: [],
    }
  },
  methods: {
    openPack: async function() {

      this.cards = []
      this.cards.push(null)
      this.cards.pop()

      animationSetCode = this.cardSetCode

      await window.openPack(this.cardSetCode).then(cards => this.cards = cards)

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
    window.getCardSetsInfo().then(cardSets => this.cardSets = cardSets).then(() => console.log(this.cardSets))
  }

})
