var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded())

app.use(express.static(__dirname + '/public'));

app.post('/add-new', function(req, res){
	var data = req.body;
	console.log('POST request received: ' + JSON.stringify(data));
	res.send(200);
});

app.listen(3000);