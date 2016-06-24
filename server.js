console.log("starting server...");

const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
var db;
var db_URL = 'mongodb://emersonbnp:301091@ds023064.mlab.com:23064/videocruddb';

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

MongoClient.connect(db_URL, function (err, database) {
	db = database;
	if(err != null)
		console.log("Erro: " + err);
	app.listen(3333, function() {
		console.log('server running on port 3333')
	})
})

app.get('/', function (req, res) {
	db.collection('videos').find().toArray(function (err, result) {
	if (err) return console.log(err)
		res.render('index.ejs', {data: result})
	})
})
