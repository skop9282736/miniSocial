const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const routes = require('./routes/api/index')

const app = express()

// db Conf
const db = require('./config/keys').mongoURI
// connect to db
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('mongo db connected'))
    .catch((e) => console.log(e))

app.get('/', (req, res) => res.send('home page'));
app.use('/api', routes)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`app running on http://localhost:${port}`))