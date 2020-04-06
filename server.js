const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => res.send('home page'));

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`app running on http://localhost:${port}`))