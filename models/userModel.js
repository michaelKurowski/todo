const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
	username: String,
	password: String
})

const Users = mongoose.model('Users', todoSchema)

module.exports = Users
