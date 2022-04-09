const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



reader.question("What would you like to calculate?", function(input){
	tokens = input.split(' ');
	
	//empty array (or "list") for numbers, operations, and results
	let numbers = [];
	let operations = [];
	let results = [];

	for(let i = 0; i < tokens.length; ++i) {
		//temp is an array of NaNs and numbers from original tokens array. Both arrays are the same length
		//ex: tokens = "1", "4", "+", "3", "4", "-"
		//    temp   = 1, 4, NaN, 3, 4, NaN
		temp[i] = Number(tokens[i]);
	}

	for(let i = 0; i < tokens.length; ++i) {
		if(!isNaN(temp[j])) {
			tokens[j] = temp[j]; //after the for loop completes, all numbers in tokens array will be of number type and all operations will be of string type
		}
	}

	//put the value and index from tokens into either operations or numbers array
	//example:
	// tokens = ["+", 3, 4, "-", 2]
	// numbers = [3, 1, 4, 2, 2, 4]
	// operations = ["+", 0, "-", 3]
	for(let i = 0; i < tokens.length; ++i) {
		if(isNaN(tokens[i])) {
			operations.push(tokens[i]);
			operations.push(i);
		} else {
			numbers.push(tokens[i]);
			numbers.push(tokens[i]);
		}
	}

	


	// This line closes the connection to the command line interface.
	reader.close()

});
