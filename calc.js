const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



reader.question("What would you like to calculate?", function(input){
	tokens = input.split(' ');
	
	//empty array (or "list") for operations, temporary list to manipulate tokens data types
	let operations = [];
	let temp = [];

	for(let i = 0; i < tokens.length; ++i) {
		//temp is an array of NaNs and numbers from original tokens array. Both arrays are the same length
		//ex: tokens = "1", "4", "+", "3", "4", "-"
		//    temp   = 1, 4, NaN, 3, 4, NaN
		if(tokens[i] === "pi" || tokens[i] === "Pi") {
			tokens[i] = Math.PI;
		} else if (tokens[i] === "e") {
			tokens[i] = Math.E;
		}
		temp[i] = Number(tokens[i]);
	}

	for(let i = 0; i < tokens.length; ++i) {
		if(!isNaN(temp[i])) {
			tokens[i] = temp[i]; //after the for loop completes, all numbers in tokens array will be of number type and all operations will be of string type
		}
	}

	//put the value and index from operations in tokens into tokens array
	//example:
	// tokens = ["+", 3, 4, "-", 2]
	// operations = ["+", 0, "-", 3] (symbol, indexOfSymbol, symbol, indexOfSymbol)
	for(let i = 0; i < tokens.length; ++i) {
		if(isNaN(tokens[i])) {
			operations.push(tokens[i]);
			operations.push(i);
		}
	}

	let completedAllOps = true; // make sure that the whole expression is evaluated (switch this value to false if code breaks while evaluating)

	for(let i = operations.length - 2; i >= 0; i-=2) { //start at the last operation in the operations array and go back through each one. For each operation:
		let j = i + 1; //create a variable to track the location of the current math symbol in tokens array
		let itr = 1; //and an iterator to move through tokens

		if(operations[i] === "+") {
			if ((!isNaN(tokens[operations[j] + 1])) && (!isNaN(tokens[operations[j] + 2]))) { // if there are two numbers after the + operator
				let sum = tokens[operations[j] + 1] + tokens[operations[j] + 2]; // find the sum between them and put it in the list (get rid of the + sign and the two numbers)
				tokens.splice(operations[j], 3, sum);
			} else {
				throw "Cannot add type of NaN!"; // otherwise, throw an error and set completed all Ops to false. Exit the for loop.
				completedAllOps = false;
				break;
			}
		} else if (operations[i] === "-") {
			if ((!isNaN(tokens[operations[j] + 1])) && (!isNaN(tokens[operations[j] + 2]))) { // if there are two numbers after the - operator
				let difference = tokens[operations[j] + 1] - tokens[operations[j] + 2]; // find the difference between them and put it in the list (get rid of the - sign and the two numbers)
				tokens.splice(operations[j], 3, difference);
			} else {
				throw "Cannot subtract type of NaN!"; // otherwise, throw an error and set completed all Ops to false. Exit the for loop.
				completedAllOps = false;
				break;
			}
		} else if (operations[i] === "*") {
			if ((!isNaN(tokens[operations[j] + 1])) && (!isNaN(tokens[operations[j] + 2]))) { // if there are two numbers after the * operator
				let product = tokens[operations[j] + 1] * tokens[operations[j] + 2]; // find the product between them and put it in the list (get rid of the * sign and the two numbers)
				tokens.splice(operations[j], 3, product);
			} else {
				throw "Cannot multiply type of NaN!"; // otherwise, throw an error and set completed all Ops to false. Exit the for loop.
				completedAllOps = false;
				break;
			}
		} else if (operations[i] === "/") {
			if ((operations[j] + 2 < tokens.length) && (!isNaN(tokens[operations[j] + 1])) && (!isNaN(tokens[operations[j] + 2]))) { // if there are two numbers after the / operator
				let quotient = tokens[operations[j] + 1] / tokens[operations[j] + 2]; // find the quotient between them and put it in the list (get rid of the / sign and the two numbers)
				tokens.splice(operations[j], 3, quotient);
			} else {
				throw "Cannot divide type of NaN!"; // otherwise, throw an error and set completed all Ops to false. Exit the for loop.
				completedAllOps = false;
				break;
			}
		} else if (operations[i] === "sqrt" || operations[i] === "Sqrt") {
			if ((operations[j] + 1 < tokens.length) && (!isNaN(tokens[operations[j] + 1]))) { // if there is one number after the sqrt operator
				let sqrt = Math.sqrt(tokens[operations[j] + 1]); // find the sqrt and put it in the list (get rid of the sqrt sign and the number)
				tokens.splice(operations[j], 2, sqrt);
			} else {
				throw "Cannot sqrt type of NaN!"; // otherwise, throw an error and set completed all Ops to false. Exit the for loop.
				completedAllOps = false;
				break;
			}
		}
	}

	if (tokens.length == 1 && completedAllOps) {
		console.log(tokens[0]); // the last thing left in the tokens array should be the result of the whole expression
	} else {
		console.log("There seems to have been an issue with your expression. Please try again.");
	}


	// This line closes the connection to the command line interface.
	reader.close()

});
