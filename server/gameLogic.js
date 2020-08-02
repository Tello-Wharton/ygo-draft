

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

	games[id] = {
		users: []
	}

	return response("new-game", null, {gameId: id}, "A game has been created")
}

const joinGame = (message) => {

	const id = String(message.game_id)

	games[id].users.push(message.username)

	return response("join-game", null, games[id], "A user joined the game")
}

const getGame = (message) => {

	const id = String(message.game_id)

	return response("get-game", null, games[id], "Game object requested")

}


const process = (message) => {

	const command = message["command"]

	if (!command)
		return error("No command was set!", message)
	else if (command === "new-game")
		return newGame(message)
	else if (command === "join-game")
		return joinGame(message)
	else if (command === "get-game")
		return getGame(message)

	return error("No command was executed", message)
}

module.exports = {
	process
}