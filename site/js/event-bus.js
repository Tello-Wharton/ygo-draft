

const eventBus = new Vue({
	data: {},
    created: function() {
      this.$on("broadcast-message", (payload) => {
        const { message } = payload;
        console.log(`Vue handling broadcast-message with message:${message}`);
        // this.message = message;
    });
	}
});