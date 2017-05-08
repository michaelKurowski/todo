const cfg = require('./config.json')
module.exports = {
	getDbConnectionString() {
		return `mongodb://${cfg.dbUser}:${cfg.dbPassword}@${cfg.dbAddress}`
	},
	getWebServerPort() {
		if (cfg.webServerPort !== '') return parseInt(cfg.webServerPort)
		return process.env.PORT || 8000
	}
}
