
class Scheme {

	/*	Given a string representing a rhyme scheme, 
		construct an object to generate a poem for that scheme */
	constructor(_schemeStr) {
		// store scheme string in Scheme object
		this.schemeStr = _schemeStr;

		// store array of tokens
		this.tokens = this.schemeStr.split(' ');

		// String -> Int (mapping of token to frequency)
		this.tokenFrequency = this.parseTokenFreq();

		// String --> sentence[] (mapping of token to sentence array)
		this.tokenToSentence = {};
	}

	/*	void -> [String -> Integer]
		Get the frequency of each token in the scheme string */
	parseTokenFreq() {
		var map = {};	// mapping of token to frequency

		for (var i = 0; i < this.tokens.length; i++) {
			// omit slashes as they are special characters
			if (this.tokens[i] != '/') {
				// increment count of this rhyme token
				if (!map[this.tokens[i]]) {
					map[this.tokens[i]] = 1;
				} else {
					map[this.tokens[i]]++;
				}
			}
		}

		return map;
	}

	/*	String[][] -> Boolean
		Populates the tokenToSentence mapping with a subset of the given rhyming 
		dictionary that is sufficient to generate a new poem with this scheme.
		Modifies this.tokenToSentence and returns true if successful, false otherwise */
	reduceRhymingDict(rhymingDict) {
		// sort rhyming dictionary by size of rhyme groups, biggest first
		rhymingDict.sort(function(a, b) {
			return b.length - a.length;
		});

		// get rhyme tokens and sort them by their frequency, highest first
		var tokens = Object.keys(this.tokenFrequency);
		var self = this;
		tokens.sort(function(a, b) {
			return self.tokenFrequency[b] - self.tokenFrequency[a];
		});

		// if not enough entries in rhyming dict to generate mapping with tokens, return failure
		if (rhymingDict.length < tokens.length) {
			return false;
		}

		// for each token we need rhymes for
		for (var i = 0; i < tokens.length; i++) {
			var maxIdx;

			// for each entry in rhyming dictionary
			for (var j = 0; j < rhymingDict.length; j++) {
				// if entry is insufficient for this token
				if (rhymingDict[j].length < this.tokenFrequency[tokens[i]]) {
					// indices are exclusive so this works
					maxIdx = j;
					break;
				}
			}

			// if valid index
			if (maxIdx > 0) {
				// generate random index in range (0, maxIdx)
				var idx = Math.floor(Math.random() * maxIdx);

				// map this token to this set of rhymes
				this.tokenToSentence[tokens[i]] = rhymingDict[idx];

				// remove this entry as a possibility in rhyming dictionary
				rhymingDict.splice(idx, 1);
			} else {
				// unable to find a set of rhymes for this token, failure
				return false;
			}
		}

		// success
		return true;
	}

	/*	void -> String
		Generate a full poem based on this scheme */
	getPoem() {
		var poem = "";
		var tokenToSentenceCopy = JSON.parse(JSON.stringify(this.tokenToSentence));

		// for each token
		for (var i = 0; i < this.tokens.length; i++) {
			// if special linebreak character, add linebreak
			if (this.tokens[i] == '/') {
				poem += '\n';
			} else {
				// get all possible rhyming sentences for this rhyme token
				var possible = tokenToSentenceCopy[this.tokens[i]]

				// generate random index of sentence in this rhyme group
				var idx = Math.floor(Math.random() * possible.length);

				// add sentence content to poem
				poem += possible[idx] + '\n';

				// remove sentence from possibilities
				possible.splice(idx, 1);
			}
		}

		return poem;
	}
}

module.exports = Scheme;