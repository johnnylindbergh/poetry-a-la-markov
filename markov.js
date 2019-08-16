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

	/*	gets the last word of a given sentence */
	getLastWord: function(sentence){

		var words = sentence.split(" ");

		return words[words.length-1].split('.')[0]

	},

	/*	String[] -> String[][]
		Given a list of sentences, group them together by last word rhyme.
		Remove sentences with redundancy in end word */
	constructRhymingDict: function(sentences) {
		var rhymeDic = [];
		var cache = {};

		for (var i = 0; i < sentences.length; i++){
			console.log(sentences[i]);
			var lastWord = module.exports.getLastWord(sentences[i]);


			rhyme.getRhymes(lastWord, cache, function(err, res){

				if (!err && res.length != 0){

					//console.log(res);


					//check the rhymeDic if there is a sentence that ends with one of the words from the res
					for (var j = 0; j < rhymeDic.length; j++){
						for (var k = 0; k < rhymeDic[j].length; k++){
							console.log(rhymeDic[j][k])
						}
					}

				} else {
					// console.log("unable to get rhyme results of " + lastWord );
					// console.log("sentences[i]: "+sentences[i]);
					// console.log(i);
					rhymeDic.push([sentences[i]]);
				}
				

			});


		}
	}

}



module.exports.establishMarkovChain(function(err) {
	if (err) throw err;

	console.log(module.exports.chain.sentence());


});