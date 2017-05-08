const fs = require('fs')
module.exports = {
	throwErrorLog(endpoint, err) {
		res.send('An error occured. Check server logs for details.')
		fs.writeFile('logs.txt', `[${new Date()}] /${endpoint} - ${err}`, err => {
			console.log(`[${new Date()}] /${endpoint} - ${err}`)
		})
	}
}
