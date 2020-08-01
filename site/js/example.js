


const exampleFunction = async() => {
	const tenCards = await window.getTenCards()
	console.log(tenCards)
}


window.addEventListener('DOMContentLoaded', () => {
  exampleFunction()
})