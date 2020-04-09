const express = require('express')
const app = express()

const userRoutes = require('./users.route')
const profileRoutes = require('./profiles')
const postRoutes = require('./posts')

app.use('/users', userRoutes)
app.use('/profile', profileRoutes)
app.use('/posts', postRoutes)

module.exports  = app