const inquirer = require('inquirer');
const words = require('./words');

let username = "";
let guesses = 9;




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
		userGuess();
	})
};


function userGuess(){
	inquirer.prompt([
	{
		type: "input",
		message: `${username}, what letter would you like to guess?`,
		name: "askuser",
		validate: function(input){
			const regex = new RegExp("[a-zA-Z]");
			if(regex.test(input) == false){
				console.log("Please enter a letter.");
			}else if(input.length > 1){
				console.log("Please enter one letter at a time.");
			}
			return true;
		}
	}
	]).then(function(answers){
		console.log(`You guessed: ${answers.askuser}`);
	})
}

welcome();