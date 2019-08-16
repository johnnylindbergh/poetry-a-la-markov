/*
	markov.js: Markov chain bits
*/

const sys = require('./settings.js');
const rhyme = require('./rhyme.js');

var testSentences = 
[
	"The man jumped over the log.",
	"The spore producing organ in fungus is called the sporange.",
	"I like turtles.",
	"It's hard to see in this fog.",
	"This is an orange.",
];


module.exports = {

	/*	String -> String
		Preprocess several training files and dump into specified 
		corpus file to get it ready to be markov'd */
	compileCorpus: function(cb) {

	},

	/*	Compile corpus as needed and run trainMarkovChain */
	establishMarkovChain: function(cb) {
		// if corpus needs to be recompiled
		if (sys.COMPILE_CORPUS) {
			// compile corpus file using training files specified in settings
			module.exports.compileCorpus(function(err) {
				if (!err) {
					module.exports.trainMarkovChain(cb);
				} else {
					cb(err);
				}
			});
		} else {
			module.exports.trainMarkovChain(cb);
		}
	},

	/*	Read and train on corpus file. Stores markov object in module.exports as 'chain' */
	trainMarkovChain: function(cb) {

	},

	/*	Chain Int -> String[]
		Generate n random sentences from a given markov chain */
	getMarkovSentences: function(chain, n) {

	},

	/*	gets the last word of a given sentence */
	getLastWord: function(sentence){

		var words = sentence.split(" ");

		return words[words.length-1].split('.')[0]

	},

	/*	String[] -> String[][]
		Given a list of sentences, group them together by last word rhyme.
		Remove sentences with redundancy in end word */
	constructRhymingDict: function(sentences, cb) {
		var rhymeDic = [];
		var cache = {};
		var words = [];

		for (var i = 0; i < sentences.length; i++){
			var lastWord = module.exports.getLastWord(sentences[i]);
			words.push(lastWord)
		}

		results = [];

		(async () => {

			for (var w = 0; w < words.length; w++){
				var rhymes = await rhyme.getRhymes(words[w], cache);
				results.push(rhymes);			
			}
			//console.log(results);

			// do the construnction of the rhyme 
		})();

	}

}

module.exports.constructRhymingDict(testSentences);
