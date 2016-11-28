const express = require ('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const thereIsDotEnv = fs.existsSync('.env')
if ( thereIsDotEnv ) require('dotenv').load()

mongoose.Promise = global.Promise;

const db = require('./db');

const PORT = process.env._PORT || 3000;

let app = express();


app.use(express.static('public') )

app.use( bodyparser.urlencoded( { extended: false } ) )
app.use(bodyparser.json())



require('./routes/index.js')(app);


app.listen(PORT, () => console.log(`__Listening on port ${PORT}`))
