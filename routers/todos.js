const mongoose = require('mongoose')
const Todos = require('../models/todoModel.js')
const express = require('express')
const router = express.Router()
const throwErrorLog = require('../utilsFunctions').throwErrorLog
router.post('/', (req, res) => {
	const todo = req.body
	Todos.create(todo, (err, results) => {
		if (err) {
			throwErrorLog(req.originalUrl, err)
			throw err
		} else {
			res.send(results)
		}
	})
})

router.get('/:username', (req, res) => {
	Todos.find(
		{username: req.params.username},
		(err, results) => {
			if (err) {
				throwErrorLog(req.originalUrl, err)
				throw err
			} else {
				res.send(results)
			}
		}
	)
})

router.delete('/:username', (req, res) => {
	const id = req.body.id
	Todos.findByIdAndRemove(id, (err, results) => {
		if (err) {
			throwErrorLog(req.originalUrl, err)
			throw err
		} else {
			res.send(results)
		}
	})
})
module.exports = router
