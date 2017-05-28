const mongoose = require('mongoose')
//const Tokens = require('../models/userModel.js')
const Tokens = require('../models/tokenModel.js')
const express = require('express')
const router = express.Router()
const throwErrorLog = require('../utilsFunctions').throwErrorLog


router.post('/', (req, res) => {
	const token = req.body
	Tokens.create(
		token,
		(err, results) => {
			if (err) {
				throwErrorLog(req.originalUrl, err)
				res.send('An error occured. Check server logs for details.')
			} else {
				res.send(results)
			}
		}
	)
})

router.get('/:token', (req, res) => {
	const value = req.body.value
	Tokens.findOne(
		{value},
		(err, results) => {
			if (err) {
				throwErrorLog(req.originalUrl, err)
				res.send('An error occured. Check server logs for details.')
				throw err
			} else {
				res.send(results._id)
			}
		}
	)
})

router.delete('/:value', (req, res) => {
	const value = req.params.value

	Tokens.findAndRemove({
		value
	},
	(err, results) => {
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
