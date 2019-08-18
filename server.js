
const express 			= require('express');
const app 				= express();
const mustacheExpress 	= require('mustache-express');
const bodyParser 		= require('body-parser');
const sys 				= require('./settings.js');
const gen				= require('./generate.js');
const markov			= require('./markov.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('html', mustacheExpress());
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// random schemes to choose from on /
var commonSchemes = [
	'A A / B B / C C',
	'A B / A B / C D / C D',
	'A A A'
];

// display random poem on home page
app.get('/', (req, res) => {
	var sch = commonSchemes[Math.floor(Math.random() * commonSchemes.length)];

	console.log("Choosing scheme " + sch);

	// generate poem
	gen.generatePoemFromScheme(sch, function(err, poem) {
		if (!err) {
			res.render('home.html', { poem: poem });
		} else {
			res.render('error.html', { message: err });
		}
	});
});

app.get('*', (req, res) => {
	res.redirect('/');
});

process.stdout.write('Establishing markov chain... ');
markov.establishMarkovChain(function(err) {
	if (err) throw err;
	console.log('Done.');

	// start server
	const server = app.listen(sys.PORT, function() {
		console.log('Rhyming Poetry Server listening on port %d', server.address().port);
	});
});