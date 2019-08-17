
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
		'training/bee_movie_script.txt',
		// 'training/a_midsummer_nights_dream.txt'
	],

	// filename of large corpus file to dump all preprocessed training files into
	MARKOV_CORPUS: 'corpus.txt', 

	// ngram number for all markov training
	MARKOV_NGRAM: 1,

	// whether or not to recompile the corpus
	COMPILE_CORPUS: false,

	// how long each line of the poem should be;
	LINE_LENGTH: 10,

	// to produce poems with lines of varying length to create the posible line length of (LINE_LENGTH ± LINE_LENGTH_VARIANCE )
	LINE_LENGTH_VARIANCE: 5,

	// how many sentences are generated to piece together a poem from
	SENTENCE_POOL_SIZE: 300

}