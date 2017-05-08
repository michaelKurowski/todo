const mongoose = require('mongoose')
const Users = require('../models/userModel.js')
const express = require('express')
const router = express.Router()
const throwErrorLog = require('../utilsFunctions').throwErrorLog
router.post('/', (req, res) => {
	const user = req.body
	Users.create(
		user,
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

router.get('/:username', (req, res) => {
	const username = req.params.username
	Users.findOne(
		{username},
		(err, results) => {
			if (err) {
				throwErrorLog(req.originalUrl, err)
				res.send('An error occured. Check server logs for details.')
				throw err
			} else {
				console.log(results)
				if (results === null) return results
				res.send(results._id)
			}
		}
	)
})

router.delete('/:id', (req, res) => {
	const id = req.params.id

	Users.findByIdAndRemove(id, (err, results) => {
		if (err) {
			throwErrorLog(req.originalUrl, err)
			res.send('An error occured. Check server logs for details.')
			throw err
		} else {
			res.send(results)
		}
	})
})
module.exports = router
