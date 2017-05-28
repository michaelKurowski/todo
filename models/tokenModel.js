const mongoose = require('mongoose')
const Schema = mongoose.Schema


const tokenSchema = new Schema({
	value: {type: String, index: { unique: true }},
	key: String
})

const Tokens = mongoose.model('Tokens', tokenSchema)

module.exports = Tokens
