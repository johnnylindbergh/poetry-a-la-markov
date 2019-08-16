
/*
	settings.js: Important system constants
*/

module.exports = {
	// Datamuse Rhyming API
	RHYME_API: 'https://api.datamuse.com/words?rel_rhy=',

	// all files to use for markov training
	MARKOV_TRAINING_FILES: [
		// 'training/bee.txt',
		// 'training/whitman_complete_poetry.txt'
		'training/a.txt',
		'training/b.txt'
	],

	// filename of large corpus file to dump all preprocessed training files into
	MARKOV_CORPUS: 'corpus.txt', 

	// ngram number for all markov training
	MARKOV_NGRAM: 2,

	// whether or not to recompile the corpus
	COMPILE_CORPUS: true

}