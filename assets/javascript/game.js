// ****  VARIABLES   *******

// create an array of words that for the game
var wordOptions = ["enclave", "dogmeat", "pipboy", "wasteland", "nukacola", "brotherhood", "vault"];
// create array for word to guess
var selectedWord = "";
var lettersinWord=[];
var numBlanks = 0;
var blanksAndSuccesses = []; // e _ _ _ _ _ 
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;


//******  FUNCTIONS ************
function startGame() {
	//picks random word
	selectedWord = wordOptions[Math.floor(Math.random()* wordOptions.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;

	//resets for game
	guessesLeft=10;
	wrongLetters = [];
	blanksAndSuccesses = [];

	//puts blanks and successes with right number of blanks
	for(var i = 0; i < numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");

	document.getElementById("numGuesses").innerHTML = guessesLeft;

	document.getElementById("winCounter").innerHTML = winCount;

	document.getElementById("lossCounter").innerHTML = lossCount;

}

function checkLetters(letter) {
	//is letter in word
	var isLetterInWord = false;

	for(var i = 0; i < numBlanks; i++){
		if(selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}

	if(isLetterInWord) {
		for(var i = 0; i < numBlanks; i++){
			if(selectedWord[i] == letter) {
				blanksAndSuccesses[i] == letter;
			}
		}
	}
	//letter not found
	else {
		wrongLetters.push(letter);
		guessesLeft--;
	}
}

function roundComplete() {
	console.log("WinCount: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft);

	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	if(lettersinWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Win!");

		document.getElementById("winCounter").innerHTML = winCount;

		startGame();
	}
	else if (guessesLeft == 0) {
		lossCount++;
		alert("You lose!");

		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}
}



//****** MAIN PROCESS ********* 
startGame();

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	//does letterGuess 
	checkLetters(letterGuessed);
	roundComplete();

	// console.log(letterGuessed);
}