
const fs = require("fs")

const pathChar = "\\"

const root = process.env.APPDATA + pathChar + "ygo-draft" + pathChar
const cache = root + pathChar + "cache" + pathChar

const mkdirIfNotExistsSync = (path) => {
	if (!fs.existsSync(path)) {
    	fs.mkdirSync(path);
	}
}

mkdirIfNotExistsSync(root)
mkdirIfNotExistsSync(cache)