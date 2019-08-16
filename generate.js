/*
	generate.js: Highest-level of abstraction for generating poetry
*/

const markov = require('./markov.js');
const Scheme = require('./scheme.js');
const sys = require('./settings.js');

module.exports = {

	/*	Generate a string poem, given a trained markov chain object, and a
		string representing the desired rhyme scheme */
	generatePoemFromScheme: function(schemeStr, cb) {

		/*
			use getMarkovSentences to generate many markov sentences

			use constructRhymingDict to construct the rhyming dictionary for these sentences

			create new Scheme object with schemeStr

			use Scheme.reduceRhymingDict to match entries in the rhyming dictionary to tokens in the scheme

			Finally, use Scheme.getPoem to get an actual poem string using the constructed scheme

		*/

		// generate many markov sentences to choose from to construct a rhyming poem
		var sentences = markov.getMarkovSentences(sys.SENTENCE_POOL_SIZE);

		// group sentences off by rhyme
		markov.constructRhymingDict(sentences, function(err, rhymeDic) {
			if (!err) {
				// construct new scheme
				var s = new Scheme(schemeStr);

				// attempt to map groups in rhyming dict onto tokens in rhyme scheme
				if (s.reduceRhymingDict(rhymeDic)) {
					cb(null, s.getPoem());
				} else {
					cb("Rhyming dictionary was insufficient to satisfy poem scheme.");
				}
			} else {
				cb(err);
			}
		});
	}

}

markov.establishMarkovChain(function(err) {
	if (err) throw err;
	module.exports.generatePoemFromScheme('A B / A B / C C / A C', function(err, poem) {
		if (err) throw err;
		console.log(poem);
	});
});





