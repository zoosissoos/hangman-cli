const inquirer = require('inquirer');
const words = require('./words.js');
const letters = require('./letters.js')

let username = "";
let currentLetters = [];
let currentGame;

//welcome func that opens on execution of this file
function welcome(){
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
		console.log(currentWord);

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
				console.log("Please enter a letter.");
			}else if(input.length > 1){
				console.log("Please enter one letter at a time.");
			}else if(alreadyGuessed(input.toUpperCase())){
				console.log("You already guessed this letter!")
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
			gameOver();
		}else if(currentGame.wordToGuess.length <= currentGame.winCounter){
			gameWin();
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
		}
	}

}

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
		}
	};
	if(findcount > 0){
		return true;
	}else{
		currentGame.guessesLeft--;
		currentGame.wrongGuess.push(str);
		currentGame.alreadyGuess.push(str);
		console.log(`${username}, try again.`);
		return false;
	}
};


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
}


//tells user they lost
function gameOver(){
	console.log(`Oh no ${username}, you lost!`);
}


//congratulates the user
function gameWin(){
	console.log(`Great Job ${username}, you won!!`);
}



///starts the game on execution of this file
welcome();