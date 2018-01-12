
function Game(){
	this.wordToGuess = [/*"L","A","G","E","R"*/];
	this.guessesLeft = 9;
	this.winCounter = 0;
	this.wordBank= ["LAGER","PINT","WHISKEY","CRAFT","BARLEY","SPARGE","PILSNER","FLANDERS","BELGIUM"];
	this.alreadyGuess = [];
	this.wrongGuess = [];
	this.letterObjs = [];

	this.setupWord = function(str){
		let wordCount = this.wordBank.length;
		let index = Math.floor(Math.random()* wordCount);
		let selectedWord = this.wordBank[index];
		this.wordToGuess = selectedWord.trim().split("");
	};
}

module.exports= Game;

