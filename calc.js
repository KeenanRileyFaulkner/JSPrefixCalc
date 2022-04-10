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
	let temp = [];

	for(let i = 0; i < tokens.length; ++i) {
		//temp is an array of NaNs and numbers from original tokens array. Both arrays are the same length
		//ex: tokens = "1", "4", "+", "3", "4", "-"
		//    temp   = 1, 4, NaN, 3, 4, NaN
		temp[i] = Number(tokens[i]);
	}

	for(let i = 0; i < tokens.length; ++i) {
		if(!isNaN(temp[i])) {
			tokens[i] = temp[i]; //after the for loop completes, all numbers in tokens array will be of number type and all operations will be of string type
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

	let completedAllOps = true;

	for(let i = operations.length - 2; i >= 0; i-=2) { //start at the last operation in the operations array and go back through each one. For each operation:
		let j = i + 1; //create a variable to track the location of the current math symbol in tokens array
		let itr = 1; //and an iterator to move through tokens

		if(operations[i] === "+") {
			let sum = 0; // create a temporary sum of 0
			while((operations[j] + itr < tokens.length) && !isNaN(tokens[operations[j] + itr])) {
				sum += tokens[operations[j] + itr]; // add all the numbers to the right of the + operator to the sum
				itr ++;
			}
			tokens[operations[j]] = sum; // set the tokens array at the operator position equal to the sum
			tokens.length = operations[j] + 1; // make the sum the last thing in the tokens array (everything to the right of it gets deleted)
			itr = 1; // reset itr to handle the next operation
		} else if (operations[i] === "-") {
			if ((!isNaN(tokens[operations[j] + 1])) && (!isNaN(tokens[operations[j] + 2]))) { // if there are two numbers after the - operator
				let difference = tokens[operations[j] + 1] - tokens[operations[j] + 2]; // find the difference between them and put it in the list (get rid of the - sign and the two numbers)
				tokens.splice(operations[j], 3, difference);
				// console.log(i - 1, tokens[i - 1]);
			} else {
				throw "Cannot subtract type of NaN!"; // otherwise, throw an error and set completed all Ops to false. Exit the for loop.
				completedAllOps = false;
				break;
			}
		} else if (operations[i] === "*") {
			let product = 1;
			while((operations[j] + itr < tokens.length) && !isNaN(tokens[operations[j] + itr])) {
				product *= tokens[operations[j] + itr]; // multiply all the numbers to the right of the * operator together
				itr++;
			}
			tokens[operations[j]] = product; // set the tokens array at the operator position equal to the product
			tokens.length = operations[j] + 1; // make the product the last thing in the tokens array (everything to the right of it gets deleted)
			itr = 1; //reset itr for the next operation
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
