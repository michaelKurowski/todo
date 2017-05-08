const fs = require('fs')
module.exports = {
	throwErrorLog(endpoint, err) {
		fs.writeFile('logs.txt', `[${new Date()}] /${endpoint} - ${err}`, err => {
			console.log(`[${new Date()}] /${endpoint} - ${err}`)
		})
	}
}
