const mongoose = require('mongoose')
const Tokens = require('../models/tokenModel.js')
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
	Tokens.findOne(
		{username},
		(err, results) => {
			if (err) {
				throwErrorLog(req.originalUrl, err)
				res.send('An error occured. Check server logs for details.')
				throw err
			} else {
				if (results === null) return results
				res.send(results._id)
			}
		}
	)
})

router.delete('/:id', (req, res) => {
	const id = req.params.id

	Tokens.findByIdAndRemove(id, (err, results) => {
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
