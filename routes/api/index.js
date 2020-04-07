const express = require('express')
const app = express()

const userRoutes = require('./users')
const profileRoutes = require('./profiles')
const postRoutes = require('./posts')

app.use('/users', userRoutes)
app.use('/profiles', profileRoutes)
app.use('/posts', postRoutes)

module.exports  = app