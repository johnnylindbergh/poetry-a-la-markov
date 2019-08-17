/*
	markov.js: Markov chain bits
*/

const sys = require('./settings.js');
const rhyme = require('./rhyme.js');
const Scheme = require('./scheme.js');
const readMult = require('read-multiple-files');
const fs = require('fs');
const markov = require('string-markov-js');

module.exports = {

	/*	Preprocess several training files and dump into specified 
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
	getMarkovSentences: function(n) {
		var s = [];

		for (var i = 0; i < n; i++) {
			s.push(module.exports.chain.sentence());
		}

		return s;
	},

	/*	String -> String
		Gets the last word of a given sentence */
	getLastWord: function(sentence){
		// split sentence into array of words
		var words = sentence.split(" ");

		// get last word, strip of any sentence-ending punctuation, normalize case
		return words[words.length - 1].replace(/[\.\?\!\"]*/g, "").toLowerCase();
	},

	/*	String[] -> String[][]
		Given a list of sentences, group them together by last word rhyme.
		Remove sentences with redundancy in end word */
	constructRhymingDict: function(sentences, cb) {
		var rhymeDic = [];
		var cache = {};
		var words = [];

		// extract last word from each sentence 
		for (var i = 0; i < sentences.length; i++) {
			var lastWord = module.exports.getLastWord(sentences[i]);
			words.push(lastWord)
		}

		results = [];

		(async () => {
			try {
				// load all rhyming dictionary API calls into cache object
				for (var w = 0; w < words.length; w++) {
					await rhyme.getRhymes(words[w], cache);
				}

				// for each sentence
				for (var i = 0; i < sentences.length; i++) {
					if (sentences[i]){
						// get last word, and all rhymes
						var lastWord = words[i];
						var rhymes = cache[lastWord];

						// start a group with this sentence
						var group = [sentences[i]];
						sentences[i] = null;

						// for the rest of the sentences
						for (var j = i + 1; j < sentences.length; j++) {
							// if not looking at same sentence, and last words rhyme
							if (j < sentences.length && sentences[j] && rhymes.indexOf(words[j]) != -1 && lastWord !== words[j]) {
								
								// add sentence j to group with sentence i
								group.push(sentences[j]);

								// remove sentence as possibility
								sentences[j] = null;
							}

						}
							
						rhymeDic.push(group);
					}	
				}

				// callback on rhyming dictionary
				cb(null, rhymeDic);
			} catch (err) {
				cb(err);
			}
		})();
	}

}