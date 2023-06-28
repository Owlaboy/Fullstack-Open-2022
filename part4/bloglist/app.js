const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/blogsRouter')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('', blogsRouter)
app.use('', usersRouter)

module.exports = app