
class Scheme {

	/*	Given a string representing a rhyme scheme, 
		construct an object to generate a poem for that scheme */
	constructor(_schemeStr) {
		this.schemeStr = _schemeStr;

		// String -> Int (mapping of token to frequency)
		this.tokenFrequency = this.parseTokenFreq();

		// String --> sentence[] (mapping of token to sentence array)
		this.tokenToSentence = {};
	}

	/*	void -> [String -> Integer]
		Get the frequency of each token in the scheme string */
	parseTokenFreq() {

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





var s = new Scheme('A B / A B');
console.log(s.schemeStr);