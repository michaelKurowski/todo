const mongoose = require('mongoose')
const Schema = mongoose.Schema


const tokenSchema = new Schema({
	value: {type: String, index: { unique: true }},
	username: String
})

const Tokens = mongoose.model('Tokens', userSchema)

module.exports = Tokens
