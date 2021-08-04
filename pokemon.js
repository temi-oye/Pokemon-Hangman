let submit = document.getElementById("submit");
let word = document.getElementById("word");
let guess = document.getElementById("guess").value;

let wordLength = 0;
let pokemonName = "";
let lives = document.getElementById("lives");
let livesCounter = 10;
let guessWord = "";
let wrongGeusses = "";
let wrongGuessWrapper = document.getElementById("wrong-guess-wrapper");
let kanto = document.getElementById("kanto");
let johto = document.getElementById("johto");
let hoenn = document.getElementById("hoenn");
let sinnoh = document.getElementById("sinnoh");
let info = document.getElementById("info");

let sprite = document.getElementById("sprite");
let spriteSrc = "";

let pressSound = new Audio("https://www.myinstants.com/media/sounds/pokemon-exclamation-mark-sound-effect.mp3");
let winSound = new Audio("https://www.myinstants.com/media/sounds/06-caught-a-pokemon.mp3");
let correctSound = new Audio("https://www.myinstants.com/media/sounds/hit-super-effective.mp3");
let incorrectSound = new Audio("https://www.myinstants.com/media/sounds/hit-weak-not-very-effective.mp3"); 
let loseSound = new Audio("https://www.myinstants.com/media/sounds/pokemon-red_blue_yellow-run-away-sound-effect-1.mp3")
let battleSound = new Audio("https://www.myinstants.com/media/sounds/pokemon-battle.mp3");
//kanto: 1-151 Johto: 152-251 hoenn: 252-386 sinnoh: 387-493

window.onload = function () {
	battleSound.play();
}
disableInput();


function disableInput(){
	document.getElementById("guess").disabled = true;
	submit.disabled = true;
}

function enableInput(){
	document.getElementById("guess").disabled = false;
	submit.disabled = false;
}

function switchRegion(){
	pressSound.play();
	battleSound.play();
	
	enableInput();
	resetGame();
	
	let kantoDex =  Math.ceil(Math.random() * 151);
	let johtoDex =  Math.floor(Math.random() * (251 - 152 + 1) + 152);
	let hoennDex =  Math.floor(Math.random() * (386 - 252 + 1) + 252);
	let sinnohDex = Math.floor(Math.random() * (493 - 387 + 1) + 387);

	switch(this){
		case kanto:
			info.innerText = "This pokemon is in the kanto region";
			getNewWord(kantoDex);
			break;
		case johto:
			info.innerText = "This pokemon is in the johto region";
			getNewWord(johtoDex);
			break;
		case hoenn:
			info.innerText = "This pokemon is in the hoenn region";
			getNewWord(hoennDex);
			break;
		case sinnoh:
			info.innerText = "This pokemon is in the sinnoh region"
			getNewWord(sinnohDex);
			break;	
		default:
	}

}

kanto.onclick = switchRegion;
johto.onclick = switchRegion;
hoenn.onclick = switchRegion;
sinnoh.onclick = switchRegion;

lives.innerText = lives.innerText + livesCounter;

function updateWord(newWord){
	word.innerText = "";
	pokemonName = newWord.replace(/[^A-z]/g, "");
	guessWord = pokemonName;
	wordLength = pokemonName.length; 
	createBlanks(wordLength);
}

function getNewWord(range){

	let url = 'https://pokeapi.co/api/v2/pokemon/' + range;
	fetch(url)
		.then((response) => {
			return response.json()
		})
		.then((json) => {
			updateWord(json.name);
			spriteSrc = json.sprites.front_default;
			
		});
		
}


function resetForm(){
	document.getElementById("guess").value = "";
}

document.getElementById("guess").addEventListener("keyup", function(event) {
	if ("Enter" === event.key) {
		event.preventDefault();
		attempt();
	}
});

submit.onclick = attempt;

function attempt(){
	check();
	resetForm();
}


function createBlanks(num){
	
	for(let i=0; i<num; i++){

		let li = document.createElement("Li");
		li.classList.add("guessWord", "hide");
		
		li.innerText = pokemonName[i];

		word.appendChild(li);

	}

}

function check(){	
	guess = document.getElementById("guess").value;
	guess = guess.toLowerCase();

	for(let i=0; i<pokemonName.length; i++){
		if(pokemonName[i] == guess){
			var elements=document.getElementById('word').children;
			elements.item(i).classList.remove("hide");
			correctSound.play();
			let indexOfLetter = guessWord.indexOf(guess);

			if(indexOfLetter !== -1){
				guessWord = guessWord.replace(guess, "");
			}
		}	
	}
	
	if(pokemonName.indexOf(guess) ==-1 && livesCounter>0 && wrongGeusses.indexOf(guess) ==-1){
		incorrectSound.play();
		livesCounter--;
		lives.innerText = "lives:" + livesCounter;
		wrongGeusses += guess;

		let s = document.createElement("s");
		s.classList.remove("guessWord", "hide");
		
		s.innerText = guess;

		wrongGuessWrapper.appendChild(s);

	}	if(livesCounter==0){
		lose();
		return;
	}

	if(guessWord.length==0){
		win();
		return;
	}
	
}
function resetGame(){
	livesCounter = 10;
	lives.innerText = "lives:" + livesCounter;
	wrongGeusses = "";
	wrongGuessWrapper.innerText = "";
	hideImage();
}

function lose(){
	for(let i=0; i<pokemonName.length; i++){
			var elements=document.getElementById('word').children;
			elements.item(i).classList.remove("hide");
		}
		info.innerText = "You lose, try again";
		disableInput();
		loseSound.play();		
		revealImage();
	}

function win(){
	info.innerText = "You win, play again";
	winSound.play();
	disableInput();
	revealImage();
}

function revealImage(){
	sprite.src = spriteSrc;
	sprite.alt = "Pokemon Reveal";
	sprite.style.height = "150px";
  sprite.style.width = "150px";
}
function hideImage(){
	sprite.src = "";
	sprite.alt = "";
	sprite.style.height = "0";
  sprite.style.width = "0";
}