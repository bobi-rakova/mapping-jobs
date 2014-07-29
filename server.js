var express = require('express');
var logfmt = require("logfmt");
var app = express();
var redis = require('redis')

if (process.env.REDISTOGO_URL) {
	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
} else {
	var client = redis.createClient()
}

client.on('error', function(error){
	console.log('redis error ' + error)
})

client.on('ready', function(){
	console.log('Connected to redis')
})

client.on('end', function(){
	console.log('End-ing redis')
})

var bodyParser = require('body-parser')
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded())
app.use(express.static(__dirname + '/public'));
// For debugging:
// app.use(logfmt.requestLogger()); 

app.get('/hello', function(req, res) {
  res.send('<h1>Hello World!</h1>');
});

app.post('/add-new', function(req, res){
	var data = JSON.stringify(req.body);
	client.rpush('jobs-list', data)
	res.send(data);
});

app.get('/get-all', function(req, res){
	var data = client.lrange('jobs-list', 0, 100, function(err, data) {
  		res.send(data);
	})
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});