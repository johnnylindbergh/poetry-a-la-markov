/*
	rhyme.js: Interacts with Datamuse API
*/

const request = require('request');
const sys = require('./settings.js');

module.exports = {
	// word -> [rhymes]
	// Get all possible rhymes with a given word
	getRhymes: function(word, cb) {
		// make request to rhyming API
		request(sys.RHYME_API + word, function(err, response, body) {
			if (!err) {
				// parse response into Javascript object
				var res = JSON.parse(body);

				// extract string word
				for (var i = 0; i < res.length; i++) {
					res[i] = res[i].word;
				}

				cb(err, res);
			} else {
				cb(err);
			}
		});
	},

	// word, word -> boolean
	// Determines whether two words rhyme
	rhymesWith: function(w1, w2, cb) {
		// get rhymes for first word
		module.exports.getRhymes(w1, function(err, rhymes) {
			if (!err) {
				cb(err, rhymes.indexOf(w2) != -1);
			} else {
				cb(err);
			}
		});
	}
}