var express = require('express');
var app = express();

var redis = require('redis')
var client = redis.createClient(6379, "54.91.78.252")

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
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded())

app.use(express.static(__dirname + '/public'));

app.post('/add-new', function(req, res){
	var data = JSON.stringify(req.body);
	// console.log('POST request received: ' + data);
	client.lpush('jobs-list', data)
	res.send(200);
});

app.get('/get-all', function(req, res){
	var data = client.lrange('jobs-list', 0, 100, function(err, data) {
		// console.log("GET: " + data)
  		res.send(data);
	})
});

app.listen(3000);