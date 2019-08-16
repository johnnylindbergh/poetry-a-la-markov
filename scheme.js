
class Scheme {

	/*	Given a string representing a rhyme scheme, 
		construct an object to generate a poem for that scheme */
	constructor(_schemeStr) {
		// store scheme string in Scheme object
		this.schemeStr = _schemeStr;

		// String -> Int (mapping of token to frequency)
		this.tokenFrequency = this.parseTokenFreq();

		// String --> sentence[] (mapping of token to sentence array)
		this.tokenToSentence = {};
	}

	/*	void -> [String -> Integer]
		Get the frequency of each token in the scheme string */
	parseTokenFreq() {
		var tokens = this.schemeStr.split(' ');		// split by spaces
		var map = {};	// mapping of token to frequency

		for (var i = 0; i < tokens.length; i++) {
			// omit slashes as they are special characters
			if (tokens[i] != '/') {
				// increment count of this rhyme token
				if (!map[tokens[i]]) {
					map[tokens[i]] = 1;
				} else {
					map[tokens[i]]++;
				}
			}
		}

		return map;
	}

	/*	String[][] -> void
		Populates the tokenToSentence mapping with a subset of the given rhyming 
		dictionary that is sufficient to generate a new poem with this scheme.
		Modifies this.tokenToSentence */
	reduceRhymingDict(rhymingDict) {

	}

	/*	void -> String
		Generate a full poem based on this scheme */
	getPoem() {

	}
}





var s = new Scheme('1 12 / 12 3 4 / 1 3');