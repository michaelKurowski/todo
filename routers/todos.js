const mongoose = require('mongoose')
const Todos = require('../models/todoModel.js')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const throwErrorLog = require('../utilsFunctions').throwErrorLog
router.post('/', (req, res) => {
	const todo = req.body
	Todos.create(todo, (err, results) => {
		if (err) {
			throwErrorLog(req.originalUrl, err)
		} else {
			res.send(results)
		}
	})
})

router.get('/:username', (req, res) => {
	console.log('/:username')
	Todos.find(
		{username: req.params.username},
		(err, results) => {
			if (err) {
				throwErrorLog(req.originalUrl, err)
			} else {
				res.send(results)
			}
		}
	)
})

router.delete('/:username', (req, res) => {

})
module.exports = router
