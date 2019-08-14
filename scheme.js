

class Scheme {


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

	/*	void -> String
		Generate a full poem based on this scheme */
	getPoem() {

	}
}





var s = new Scheme('A B / A B');
console.log(s.schemeStr);