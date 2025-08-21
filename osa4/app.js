const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')


const app = express()

info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    error('error connection to MongoDB:', error.message)
  })


/* app.use(express.static('dist')) */
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app