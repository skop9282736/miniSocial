const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const routes = require('./routes/api/index')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

 // body parser
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())

// db Conf
const db = require('./config/keys').mongoURI
// connect to db
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('mongo db connected'))
    .catch((e) => console.log(e))

// routes
app.use('/api', routes)

//passport config
app.use(passport.initialize())
require('./config/passport')(passport)


const port = process.env.PORT || 3000

app.listen(port, () => console.log(`app running on http://localhost:${port}`))