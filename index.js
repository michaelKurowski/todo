const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cfg = require('./config')
const port = cfg.getWebServerPort()

const todosRouter = require('./routers/todos.js')
const usersRouter = require('./routers/users.js')
const tokensRouter = require('./routers/tokens.js')
const seedDbRouter = require('./routers/seedDb.js')

const adminKey = 

app.use('/assets', express.static(`${__dirname}/public`))
app.use(bodyParser.json())
app.set('view-engine', 'ejs')

app.use('/api/setupTodos', seedDbRouter)
app.use('/api/todos', todosRouter)
//app.use('/api/users', usersRouter)
app.use('/api/tokens', tokensRouter)
mongoose.connect(cfg.getDbConnectionString()).catch(err => {throw err})
app.listen(port, () => console.log('App is running'))
