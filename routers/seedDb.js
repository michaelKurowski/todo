const Todos = require('../models/todoModel')
const randomNumber = require('random-number')
const cfg = require('./config.json')
const throwErrorLog = require('../utilsFunctions').throwErrorLog
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
	const amount = req.body.amount
	//seed db
	const verbs = cfg.seedGeneratorStrings.verbs
	const nouns = cfg.seedGeneratorStrings.nouns
	const usernames = cfg.seedGeneratorStrings.usernames
	let starterTodos = []
	for (let i = 0 ; i < amount ; i++) {
		const randomUsername = usernames[
			randomNumber({min: 0, max: usernames.length - 1, integer: true})
		]
		const randomNoun = nouns[
			randomNumber({min: 0, max: nouns.length - 1, integer: true})
		]
		const randomVerb = verbs[
			randomNumber({min: 0, max: verbs.length - 1, integer: true})
		]
		const seedObject = {
			username: randomUsername,
			todo: `${randomVerb} ${randomNoun}`,
			isDone: Math.random() > 0.5,
			hasAttachment: Math.random() > 0.5
		}
		starterTodos.push(seedObject)
	}
	Todos.create(starterTodos, (err, results) => {
		if (err) {
			throwErrorLog(req.originalUrl, err)
		} else {
			res.send(starterTodos)
		}
	})
})

module.exports = router
