/*
	markov.js: Markov chain bits
*/

module.exports = {

	/*	String -> String
		Preprocess a corpus (string) to get it ready to be markov'd */
	preprocessCorpus: function(corpus) {

	},

	/*	void -> Chain
		Train a markov chain on the indicated corpi in settings.js */
	establishMarkovChain: function() {

	}

	/*	Chain Int -> String[]
		Generate n random sentences from a given markov chain */
	getMarkovSentences: function(chain, n) {

	},

	/*	String[] -> String[][]
		Given a list of sentences, group them together by last word rhyme.
		Remove sentences with redundancy in end word */
	constructRhymingDict: function(sentences) {

	},







}