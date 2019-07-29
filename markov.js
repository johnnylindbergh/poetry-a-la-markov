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

const rhyming_schemes = 
[
	"a b / a b",
	"a b a b b c b c",
	"a b c b c d e b e d"
]

var rhyming_scheme = rhyming_schemes[0];
var dataset = markov.newDataSet();

var line_length = 10;

var filename = 'bee_movie_script.txt';
var ngram = 2;
var preserveLineBreaks = true;

dataset.trainOnFile(filename, ngram, preserveLineBreaks, function() {
    console.log("Training complete.");


   var text = ""
   rhyming_scheme = rhyming_scheme.split(" ")
   for (var line = 0; line < rhyming_scheme.length; line++) {
   	if (rhyming_scheme[line] == "/"){
   		console.log("new stanza");
   	} else {
   		console.log("new line with rhyme", rhyming_scheme[line])
   			}
   }

   var possibilities = dataset.getPossibilities(['This','is']);

    console.log(possibilities);
});



module.exports = {

	markov_single:function(){

	}
}