/*
	rhyme.js: Interacts with Datamuse API
*/

const request = require('request');
const sys = require('./settings.js');

module.exports = {
	/*	String [String -> String[]] -> String[]
		Get all possible rhymes with a given word using a 
		cache of rhyming API data, or actual calls if necessary */
	getRhymes: function(word, cache, cb) {
		// if rhyming API data exists in cache
		if (cache[word]) {
			// use that data
			cb(null, cache[word]);
		} else {
			// make request to rhyming API
			request(sys.RHYME_API + word, function(err, response, body) {
				if (!err) {
					// parse response into Javascript object
					var res = JSON.parse(body);

					// extract string word
					for (var i = 0; i < res.length; i++) {
						res[i] = res[i].word;
					}

					// cache this data for future use
					cache[word] = res;

					cb(err, res);
				} else {
					cb(err);
				}
			});
		}
	},

	/*	String String -> Boolean
		Determines whether two words rhyme */
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