

const games = {}


const error = (err) => {
	return {
		responseType: "error",
		errorMessage: err
	}
}

const response = (actionCompleted, actionNext, data, message) => {
	return {
		responseType: "message",
		actionCompleted: actionCompleted,
		actionNext: actionNext,
		data: data,
		message: message
	}
}

const newGame = (message) => {

	if (!message.game_id) {
		return error("No game ID provided!")
	}

	const id = String(message.game_id)

	if (games[id]) {
		return error("Game already created!")
	}

	games[id] = {}

	return response("new-game", null, {gameId: id}, "A game has been created")
}

const process = (message) => {

	const command = message["command"]

	if (!command)
		return error("No command was set!")
	else if (command === "new-game")
		return newGame(message)

	return error("No command was executed")
}

module.exports = {
	process
}