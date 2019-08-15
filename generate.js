/*
	generate.js: Highest-level of abstraction for generating poetry
*/

module.exports = {

	/*	Generate a string poem, given a trained markov chain object, and a
		string representing the desired rhyme scheme */
	generatePoemFromScheme: function(chain, schemeStr) {

		/*
			use getMarkovSentences to generate many markov sentences

			use constructRhymingDict to construct the rhyming dictionary for these sentences

			create new Scheme object with schemeStr

			use Scheme.reduceRhymingDict to match entries in the rhyming dictionary to tokens in the scheme

			Finally, use Scheme.getPoem to get an actual poem string using the constructed scheme

		*/

	}

}