const request = require('supertest')
const expect = require('chai').expect
const config = require('../config/config.json')

describe('[POST] /api/todos/5910f0f328b91769f4ccc93b/', () => {
	const address = `localhost:${config.webServerPort}`
	const endpoint = '/api/todos/5910f0f328b91769f4ccc93b/'

	it('should return status code 200', done => {
		request(address)
			.get(endpoint)
			.send()
			.expect(200, done)
		}
	)
	it('should have Content-Type: application/json', done => {
		request(address)
			.get(endpoint)
			.send()
			.expect('Content-Type', /application\/json/, done)
		}
	)
	it('should return an array', done => {
		request(address)
			.get(endpoint)
			.send()
			.set('Accept', 'application/json')
			.end( (err, res) => {
				expect(res.body).to.be.an('array')
				done()
			})
		}
	)
})