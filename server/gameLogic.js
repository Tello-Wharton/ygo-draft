

const games = {}


const error = (err, message) => {
	return {
		responseType: "error",
		errorMessage: err,
		message
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
		return error("No game ID provided!", message)
	}

	const id = String(message.game_id)

	if (games[id]) {
		return error("Game already created!", message)
	}

	games[id] = {}

	return response("new-game", null, {gameId: id}, "A game has been created")
}

const process = (message) => {

	const command = message["command"]

	if (!command)
		return error("No command was set!", message)
	else if (command === "new-game")
		return newGame(message)

	return error("No command was executed", message)
}

module.exports = {
	process
}