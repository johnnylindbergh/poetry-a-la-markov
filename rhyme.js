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
	}
}


module.exports.getRhymes('casserole', function(err, rhymes) {
	console.log(err);
	console.log(rhymes);
});