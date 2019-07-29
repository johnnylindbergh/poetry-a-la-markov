/*
	markov.js: Markov chain bits 
*/

/*
	
	Ngram -> word
	Takes in an ngram array, and returns the next word to place in the phrase
	markov_single

	Ngram -> array of all possible consequent words

*/

var markov = require('string-markov-js');

var rhyme = require('./rhyme.js')
const rhyming_schemes = 
[
	"a b / a b",
	"a b a b b c b c",
	"a b c b c d e b e d",
	"A B A B / C D D C"
]

var rhyming_dictionary = {};
var used_rhyming_words = [];

var rhyming_scheme = rhyming_schemes[0];
var dataset = markov.newDataSet();

var line_length = 10;
var line_length_variance = 3;

var filename = 'bee_movie_script.txt';
var ngram = 2;
var preserveLineBreaks = true;
var text = [];
text.push("")

dataset.trainOnFile(filename, ngram, preserveLineBreaks, function() {
	console.log("Training complete.");


   rhyming_scheme = rhyming_scheme.split(" ")
   for (var line = 0; line < rhyming_scheme.length; line++) {
	if (rhyming_scheme[line] == "/"){
		//text.push("\n");
	} else {
		var length_of_this_line = line_length + Math.floor((Math.random()*line_length_variance)-(line_length_variance/2))
		
		var text = [];
		text = buildLineRecusively(text, length_of_this_line, dataset);
		console.log(text);
		//console.log("new line with rhyme", rhyming_scheme[line])
	}
   }
   console.log(text);

   //var possibilities = dataset.getPossibilities(['This','is']);

	//console.log(possibilities);
});

function buildLineRecusively(line, line_length, dataset){
	if (line.length == line_length - 1){
		//end line with rhyme
		//break
		if (line[line.length] == "the"){
			console.log(line)
			
		}
	}

	if (line.length == 0){
		line = line.concat(dataset.generate(ngram+1,true).split(' '));
	}

	last_n_words = line.slice(Math.max(line.length - ngram, 1))
	
	//console.log("line",line);
	//console.log("last_n_words:", last_n_words);
	var possibilities = dataset.getPossibilities(last_n_words);
	//console.log("possibilities:", possibilities);
	if (possibilities){
		var choose = possibilities[Math.floor(Math.random()*possibilities.length)]
	text.push(choose);
	return buildLineRecusively(text,line_length++, dataset)
	}
	
}

//iterative 
// for (var word = 0; word < length_of_this_line; word++){
// 			//text = text + 
// 			//if (text.length < 1){
// 				if (line == 0){
// 					text = text.concat(dataset.generate(2,true));
// 				} else {
// 					var possibilities = dataset.getPossibilities(text);
// 					var choose = possibilities[Math.Floor(Math.random()*possibilities.length)]
// 					text.push(choose);
// 				}
// 				// var possibilities = dataset.getPossibilities(['This','is']);
// 				// console.log(possibilities);
// 			//}
// 		}


module.exports = {

	markov_single:function(){

	}
}