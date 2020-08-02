

const eventBus = new Vue({
  data: {},
  created: function() {
    this.$on("from-server", (payload) => {

      const { message } = payload;
      console.log(`Vue handling broadcast-message with message:${message}`);
      // this.message = message;
      
    });
  }
});