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
	"a b a b",
	"a b a b b c b c",
	"a b c b c d e b e d"
	"A B A B / C D D C"
]

var dataset = markov.newDataSet();

var line_length = 10;

var filename = 'bee_movie_script.txt';
var ngram = 3;
var preserveLineBreaks = true;

dataset.trainOnFile(filename, ngram, preserveLineBreaks, function() {
    console.log("Training complete.");


    var text = dataset.generate(75, true);
    console.log(text);
});



module.exports = {

	markov_single:function(){

	}
}