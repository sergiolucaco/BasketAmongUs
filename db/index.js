const mongoose = require('mongoose')

const urlDB = process.env.URL_DB
mongoose.connect(urlDB)

const db = mongoose.connection;
db.on('error', () => console.log('connection error:') );
db.once('open', () => console.log("We're connected") );



module.exports = mongoose;