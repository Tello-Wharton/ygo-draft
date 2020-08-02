

const games = {}


const error = (err) => {
	return {
		responseType: "error",
		errorMessage: err
	}
}

const response = (actionCompleted, actionNext, message) => {
	return {
		responseType: "message",
		actionCompleted: actionCompleted,
		actionNext: actionNext,
		message: message
	}
}

const newGame = (message) => {

	if (!games[id]) {
		return error("No id was defined")
	}

	const id = String(message.game_id)

	games[id] = {}

	return response("new-game", null, "A game has been created")
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