const mongoose = require('mongoose')
const Todos = require('../models/todoModel.js')
const express = require('express')
const router = express.Router()
const fs = require('fs')
router.post('/', (req, res) => {

})

router.get('/:username', (req, res) => {
	console.log('/:username')
	Todos.find({
			username: req.params.username
		},
		(err, results) => {
			if (err) {
				res.send('An error occured. Check server logs for details.')
				fs.writeFile('logs.txt', `[${new Date()}] /${req.body.username} - ${err}`, err => {
					console.log(`[${new Date()}] /${req.body.username} - ${err}`)
				})
			} else {
				res.send(results)
			}
		}
	)
})

router.delete('/:username', (req, res) => {

})
module.exports = router
