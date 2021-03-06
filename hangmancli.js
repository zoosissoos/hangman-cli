const inquirer = require('inquirer');
const words = require('./words.js');
const letters = require('./letters.js')

//sets up variables
let username = "";
let currentLetters = [];
let currentGame;

//welcome func that opens on execution of this file
function welcome(){
	username = "";
	currentLetters =[];
	currentGame = "";
	inquirer.prompt([
	{
		type: "input",
		message: "Welcome to Hangman! What is your name?",
		name: "userName"
	}
	]).then(function(answers){
		username = answers.userName;
		console.log(`Pleasure to meet you ${username}! Let's Begin.`);
		
		//sets up current word for user to guess
		currentGame = new words;
		currentGame.setupWord();
		let currentWord = currentGame.wordToGuess;

		//sets up current letters that will be truthy or falsy based on if they were guessed or not	
		for (let i=0; i<currentWord.length; i++){
			let indexLet = currentWord[i];
			let obj = new letters(indexLet);
			currentLetters.push(obj)
		}
		display();
		userGuess();
	})
};

//defines userguess function
function userGuess(){
	inquirer.prompt([
	{
		type: "input",
		message: `${username}, what letter would you like to guess?`,
		name: "askuser",
		validate: function(input){
			const regex = new RegExp("[a-zA-Z]");
			if(regex.test(input) === false){
				console.log(" Please enter a letter.");
			}else if(input.length > 1){
				console.log(" Please enter one letter at a time.");
			}else if(alreadyGuessed(input.toUpperCase())){
				console.log(" You already guessed this letter!")
			}else{
				return true;
			}
		}
	}
	]).then(function(answers){
		let guess = answers.askuser.toUpperCase();
		console.log(`You guessed: ${guess}`);
		letterTest(guess);
		display();
		if(currentGame.guessesLeft <= 0){
			gameOver("loss");
		}else if(currentGame.wordToGuess.length <= currentGame.winCounter){
			gameOver("win");
		}else{
			userGuess();
		}
	});
}

//tests to see if letter was already guessed
function alreadyGuessed(str){
	for(let k = 0; k < currentGame.alreadyGuess.length; k++){
		if(str === currentGame.alreadyGuess[k]){
			return true
		};
	};
};

//tests input
function letterTest(str){
	let findcount = 0;
	for(let j=0; j<currentLetters.length; j++){
		let test = currentLetters[j].letterVal;
		if(str === test){
			currentLetters[j].display = true;
			currentGame.alreadyGuess.push(str);
			findcount++
			currentGame.winCounter++;
			console.log(`You are correct ${username}!`);
		};
	};
	if(findcount > 0){
		return true;
	}else{
		currentGame.guessesLeft--;
		currentGame.wrongGuess.push(str);
		currentGame.alreadyGuess.push(str);
		console.log(`${username}, try again.`);
		return false;
	};
};

///displays results of users guess
function display(){
	let displayThis = [];
	for(let i=0;i<currentLetters.length; i++){
		let boolTest = currentLetters[i].display;
		if(boolTest){
			displayThis.push(" " + currentLetters[i].letterVal + " ");
		}else{
			displayThis.push(" _ ");
		}
	}
	console.log("Here is your word:" + displayThis.join(""));
	console.log("Guesses: " + currentGame.guessesLeft);
	console.log("Incorrect Letters: " + currentGame.wrongGuess.join(" , "));
	console.log("=========================================================")
}


//tells user they lost or won then asks if they want to play again
function gameOver(str){
	if(str === "loss"){
		console.log(`Oh no ${username}, you lost!`);
	}else if(str === "win"){
		console.log(`Great Job ${username}, you won!!`);
	};
	inquirer.prompt([
		{
			type:"checkbox",
			message:`${username} Would you like to play again?`,
			choices:["Yes.","No thanks."],
			name: "replay",
			validate: function(input){
				if(input.length>1){
					console.log(" Please enter one choice.");
				}else{
					return true;
				};
			}
		}
	]).then(function(answers){
		if(answers.replay[0] ==="Yes."){
			welcome();
		}else if(answers.replay[0] === "No thanks."){
			return false
		};
	});
};


///starts the game on execution of this file
welcome();