const express = require ('express');
const bodyparser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const PORT = 3000;

let app = express();

mongoose.connect("mongodb://localhost/myBasketApp")

app.use(express.static('public') )
app.use( bodyparser.urlencoded( { extended: false } ) )
app.use(bodyparser.json())



require('./public/js/routes.js')(app);


app.listen(PORT, () => console.log(`__Listening on port ${PORT}`))
