/*
	markov.js: Markov chain bits
*/

const sys = require('./settings.js');
const rhyme = require('./rhyme.js');
const fs = require('fs');
const markov = require('string-markov-js');
const readMult = require('read-multiple-files');

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
		var data = "";

		// read all markov training files
		readMult(new Set(sys.MARKOV_TRAINING_FILES)).subscribe({
		  next(result) {
		  	// add file contents to bulk data, separated by newline
		  	data += result.contents.toString() + '\n';
		  },
		  complete() {

		  	// process the data here!

		    // write processed text to corpus file
			fs.writeFile(sys.MARKOV_CORPUS, data, cb);
		  }
		});
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
		// read corpus file
		fs.readFile(sys.MARKOV_CORPUS, function(err, corpus) {
			if (!err) {
				// initialize new markov chain
				var chain = markov.newDataSet();

				// train the chain on the full corpus
				chain.trainOnString(corpus.toString(), sys.MARKOV_NGRAM, false);

				// store chain in markov.js exports
				module.exports.chain = chain;

				cb();
			} else {
				cb(err);
			}
		});
	},

	/*	Chain Int -> String[]
		Generate n random sentences from a given markov chain */
	getMarkovSentences: function(chain, n) {
		var s = [];

		for (var i = 0; i < n; i++) {
			s.push(chain.sentence());
		}

		return s;
	},

	/*	String[] -> String[][]
		Given a list of sentences, group them together by last word rhyme.
		Remove sentences with redundancy in end word */
	constructRhymingDict: function(sentences) {

		var cache = {};

		for (var i = 0; i < sentences.length; i++){

			rhyme.getRhymes("fart", cache, function(err, res){
				console.log(res);

			});


		}
	}

}



module.exports.establishMarkovChain(function(err) {
	if (err) throw err;

	console.log(module.exports.chain.sentence());


});