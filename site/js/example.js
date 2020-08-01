
const exampleFunction = async() => {
	const tenCards = await window.getTenCards()
	console.log(tenCards)
}

// add vue code in here
window.addEventListener('DOMContentLoaded', () => {
//example Vue
	var app = new Vue({
	  el: '#app',
	  data: {
	    message: 'Hello Vue!'
	  }
	})

  exampleFunction()
})
