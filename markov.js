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
		var words = sentence.split(" ");
		return words[words.length - 1].split('.')[0]
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
				for (var w = 0; w < words.length; w++) {
					await rhyme.getRhymes(words[w], cache);
				}

				for (var i = 0; i < sentences.length; i++) {
					var lastWord = words[i];
					var rhymes = cache[lastWord];

					console.log(sentences[i]);
					console.log(rhymes);
				}


			} catch (err) {
				cb(err);
			}
		})();

	}

}

module.exports.constructRhymingDict(testSentences, function(err) {
	if (err) throw err;
});