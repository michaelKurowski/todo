const mongoose = require('mongoose')
const Users = require('../models/userModel.js')
const express = require('express')
const router = express.Router()
const throwErrorLog = require('../utilsFunctions').throwErrorLog
router.post('/', (req, res) => {
	const todo = req.body
	Users.create(todo, (err, results) => {
		if (err) {
			throwErrorLog(req.originalUrl, err)
			throw err
		} else {
			res.send(results)
		}
	})
})

router.get('/:id', (req, res) => {
	Users.find(
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

router.delete('/:id', (req, res) => {
	const id = req.params.id
	Users.findByIdAndRemove(id, (err, results) => {
		if (err) {
			throwErrorLog(req.originalUrl, err)
			throw err
		} else {
			res.send(results)
		}
	})
})
module.exports = router
