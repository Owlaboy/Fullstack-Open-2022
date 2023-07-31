const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')

mongoose.connect(config.MONGODB_URI)


app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(cors())
app.use(express.json())

app.use('', blogsRouter)
app.use('', usersRouter)
app.use('', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testingRouter')
    app.use('/api/testing', testingRouter)
  }

module.exports = app