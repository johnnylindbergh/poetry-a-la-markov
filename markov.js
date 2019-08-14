/*
	markov.js: Markov chain bits 
*/

/*
	
	Ngram -> word
	Takes in an ngram array, and returns the next word to place in the phrase
	markov_single

	Ngram -> array of all possible consequent words


	A B / A A B

	1: This is the bread (A)
	2: Another line cat (B)
	3: / 
	4: This is Ted (A)
	5: Another line with Ned (A)
	6: Cat rhymes with bat (B)

	{
		"A": [all rhymes with "bread", with flags indicating 
				if they've been used in poem already]

	}

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
var preserveLineBreaks = false;
var poem = [];

dataset.trainOnFile(filename, ngram, preserveLineBreaks, function() {


   rhyming_scheme = rhyming_scheme.split(" ")
   
   for (var line = 0; line < rhyming_scheme.length; line++) {
	if (rhyming_scheme[line] == "/"){
		//text.push("\n");
	} else {
		var length_of_this_line = line_length + Math.floor((Math.random()*line_length_variance)-(line_length_variance/2))
		
		var text = [];
		var poem_text = buildLineRecusively(text, length_of_this_line, dataset, poem);
		poem = poem.concat(poem_text);
		console.log("poem_text", poem_text);
		console.log(poem)
		//console.log("new line with rhyme", rhyming_scheme[line])
	}
   }
   //console.log(text);

   //var possibilities = dataset.getPossibilities(['This','is']);

	//console.log(possibilities);
});

function buildLineRecusively(line, line_length, dataset, poem){
	//console.log("line",line);
	if (line.length < line_length){
		//end line with rhyme
	
	
	

	if (line.length == 0){
		if (poem.length == 0){
			line = line.concat(dataset.generate(ngram+1,true).split(' '));
		} else {
			var last_n_words_of_previous_line = poem.slice(Math.max(poem.length - ngram, 1))
			console.log('last_n_words_of_previous_line',last_n_words_of_previous_line)
			var possibilities = dataset.getPossibilities(last_n_words_of_previous_line);
			var choose = possibilities[Math.floor(Math.random()*possibilities.length)]
			line.push(choose);
		}
	}

	last_n_words = line.slice(Math.max(line.length - ngram, 1))
	
	//console.log("line",line);
	//console.log("last_n_words:", last_n_words);
	var possibilities = dataset.getPossibilities(last_n_words);
	//console.log("possibilities:", possibilities);
	if (possibilities){
		var choose = possibilities[Math.floor(Math.random()*possibilities.length)]
	line.push(choose);
	return buildLineRecusively(line,line_length++, dataset, poem)
	}

} else {
	return line
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