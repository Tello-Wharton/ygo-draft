

window.addEventListener('DOMContentLoaded', () => {

	const vuePageMain = new Vue({
		el: "#ygo-draft",
		data: {
			page: "home"
		},
		methods: {
			goToCreateServer: function() {
				this.page = "create-server"
			},
			goToJoinServer: function() {
				this.page = "join-server"
			},
			goToHome: function() {
				this.page = "home"
			},
			goToPackOpener: function() {
				this.page = "pack-opener"
			},
		}
	})

})

