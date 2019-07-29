/*
	rhyme.js: Interacts with Datamuse API
*/

const request = require('request');

module.exports = {
	// word -> [rhymes]
	// Get all possible rhymes with a given word
	getRhymes: function(word) {
		request
		.get('https://api.datamuse.com/')
			.on('response', function(response) {
			console.log(response.statusCode) // 200
			console.log(response.headers['content-type']) // 'image/png'
		})
	}
}