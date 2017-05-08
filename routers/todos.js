const mongoose = require('mongoose')
const Todos = require('../models/todoModel.js')
const Users = require('../models/userModel.js')
const express = require('express')
const router = express.Router()
const throwErrorLog = require('../utilsFunctions').throwErrorLog
router.post('/', (req, res) => {
	const todo = req.body
	Todos.create(todo, (err, results) => {
		if (err) {
			throwErrorLog(req.originalUrl, err)
			res.send('An error occured. Check server logs for details.')
			throw err
		} else {
			res.send(results)
		}
	})
})

router.get('/:id', (req, res) => {
	Todos.find(
		{userId: req.params.id},
		(err, results) => {
			if (err) {
				throwErrorLog(req.originalUrl, err)
				res.send('An error occured. Check server logs for details.')
				throw err
			} else {
				res.send(results)
			}
		}
	)
})

router.delete('/:id', (req, res) => {
	const id = req.params.id
	Todos.findByIdAndRemove(id, (err, results) => {
		if (err) {
			throwErrorLog(req.originalUrl, err)
			res.send('An error occured. Check server logs for details.')
			throw err
		} else {
			res.send(results)
		}
	})
})

router.patch('/:id', (req, res) => {
	const _id = req.params.id
	const newObj = request.body
	Model.update({_id}, newObj)
	.then(
		results => res.send(results),
		err => {
			throwErrorLog(req.originalUrl, err)
			res.send('An error occured. Check server logs for details.')
			throw err
		}
	)
})
module.exports = router
