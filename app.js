const express = require ('express');
const bodyparser = require('body-parser');
const mongo = require('mongodb').MongoClient;

const PORT = 3000;

let app = express();

const url = 'mongodb://localhost:27017/basket_among_us'

app.set('view engine', 'pug')
app.use(express.static('public') )
app.use( bodyparser.urlencoded( { extended: false } ) )


mongo.connect(url, (err,db)=>{
	if (err) throw err;
	console.log('connected to DB')
	
	// app.get('/', (req,res)=>{
	// const title = 'Home'
	// db.collection('basketcourts')
	// 	.find({})
	// 	.toArray()
	// 	.then( ( basketcourts)=> res.render('index', { title, basketcourts } ) )
	// 	.catch( err => console.log(err))
		
	// })

	app.get('/',(req,res)=>{
		db.collection('basketcourts')
			.find()
			.toArray()
			.then( courts => res.render("index", {title : 'Home', courts}))
	})

	app.get('/courts',(req,res)=>{
		db.collection('basketcourts')
			.find()
			.toArray()
			.then( courts => res.render('courts',{courts}))
			console.log(courts)
		
	})

	app.get('/api/courts',(req,res)=>{
		db.collection('basketcourts')
			.find()
			.toArray()
			.then( courts => res.json( courts) )
		
	})


	app.post('/addCourts',(req,res)=>{
		debugger;
		var dataPost = JSON.parse(req.body);
		console.log(dataPost);
		
		var newCourt = req.body;
		console.log(newCourt)
		db.collection('basketcourts')
			.insert(newCourt)
			.then(console.log)
			.catch( err => console.log(err))
	})

	app.get('/addCourts',(req,res)=>{

			res.render("addCourts",{title : "Add Courts"})
	})

}) 



app.listen(PORT, () => console.log(`__Listening on port ${PORT}`))
