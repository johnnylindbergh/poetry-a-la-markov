
const express 			= require('express');
const app 				= express();
const mustacheExpress 	= require('mustache-express');
const bodyParser 		= require('body-parser');
const sys 				= require('./settings.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('html', mustacheExpress());
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
	res.send("test");
});

app.get('*', (req, res) => {
	res.redirect('/');
});

// start server
const server = app.listen(sys.PORT, function() {
	console.log('Rhyming Poetry Server listening on port %d', server.address().port);
});