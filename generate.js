/*
	generate.js: Processing of corpus
*/

module.exports = {

	generatePoemFromScheme: function(chain, scheme) {
		/*
			Scheme: A B / A B
		*/

		/*
			used_rhyming_words = []
			tokens = {}

			For each token in scheme:
				if token not already used
					Generate line up until last word
					Get last word purely from chain, ensuring word does not rhyme with any used rhyming word in ANOTHER token

					get all rhymes with this word, and add them to tokens object:
						"<token>" --> [words that rhyme]
				else
					Generate line until last word
					Get markov possibilities for last word, get rhyme possibilities for this token (cached in tokens object)

					Generate their intersection, preserving frequency from markov possibilities
					
					If intersection non-empty:
						Choose random last word from intersection
					else
		*/


	}

}