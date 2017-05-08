const Todos = require('../models/todoModel')
const randomNumber = require('random-number')
const fs = require('fs')

module.exports = (req, res) => {
	const amount = req.body.amount
	//seed db
	const verbs = [
		'buy',
		'bring',
		'order',
		'take',
		'keeping calm and thinking about',
		'write poem about'
	]

	const nouns = [
		'milk',
		'ham',
		'bread',
		'monkey',
		'cake',
		'tickets',
	]

	const usernames = [
		'Mikey',
		'Jordan',
		'Marcin',
		'Matt',
		'Sonia',
		'Simon',
		'Natasha',
		'Sasha',
		'Jedi0092',
		'Zolty'
	]
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
		starterTodos.push({
			username: randomUsername,
			todo: `${randomVerb} ${randomNoun}`,
			isDone: Math.random() > 0.5,
			hasAttachment: Math.random() > 0.5
		})
	}
	Todos.create(starterTodos, (err, results) => {
		if (err) {
			res.send('An error occured during initializing seed db. Check server logs for details.')
			fs.writeFile('logs.txt', `[${new Date()}] /api/setupTodos - ${err}`, err => {
				console.log(`[${new Date()}] /api/setupTodos - ${err}`)
			})
		} else {
			res.send('Done')
		}
	})
}
