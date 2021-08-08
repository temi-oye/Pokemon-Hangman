let submit = document.getElementById("submit");
let word = document.getElementById("word");
let guess = document.getElementById("guess").value;

let wordLength = 0;
let pokemonName = "";
let lives = document.getElementById("lives");
let maxHealth = 10;
let livesCounter = maxHealth;
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

const kantoBattleSound = new Audio("https://vgmsite.com/soundtracks/pokemon-game-boy-pok-mon-sound-complete-set-play-cd/rsbgemdj/1-07%20-%20Battle%20%28VS%20Wild%20Pok%C3%A9mon%29.mp3");
const kantoWinSound = new Audio("https://vgmsite.com/soundtracks/pokemon-game-boy-pok-mon-sound-complete-set-play-cd/wllwzvql/1-16%20-%20Victory%20%28VS%20Wild%20Pok%C3%A9mon%29.mp3");

const johtoBattleSound = new Audio("https://vgmsite.com/soundtracks/pokemon-gold-silver/zhidihnupz/17%20Battle%21%20%28Wild%20Pok%C3%A9mon%20-%20Johto%20Day%20Version%29.mp3")
const johtoWinSound = new Audio("https://vgmsite.com/soundtracks/pokemon-gold-silver/tficaxbjbq/19%20Victory%21%20%28Wild%20Pok%C3%A9mon%29.mp3")

const hoennWinSound = new Audio("https://vgmsite.com/soundtracks/pokemon-sapphire-2002-gba/zlfvjrlgwt/1-10%20Wild%20Pokemon%20Defeated%21.mp3")
const hoennBattleSound = new Audio("https://vgmsite.com/soundtracks/pokemon-sapphire-2002-gba/jujrfrohyi/1-09%20Battle%21%20Wild%20Pokemon.mp3")

const sinnohBattleSound = new Audio("https://vgmsite.com/soundtracks/pokemon-diamond-and-pearl-super-music-collection/qyrqtktu/1-09%20Battle%21%20Wild%20Pok%C3%A9mon.mp3")
const sinnohWinSound = new Audio("https://vgmsite.com/soundtracks/pokemon-diamond-and-pearl-super-music-collection/pofknbfb/1-10%20Victory%20Against%20Wild%20Pok%C3%A9mon%21.mp3");

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
	// battleSound.play();

	stopBattleMusic();

	winSound.pause();
	winSound.currentTime = 0;
	
	enableInput();
	resetGame();
	
	let kantoDex =  Math.ceil(Math.random() * 151);
	let johtoDex =  Math.floor(Math.random() * (251 - 152 + 1) + 152);
	let hoennDex =  Math.floor(Math.random() * (386 - 252 + 1) + 252);
	let sinnohDex = Math.floor(Math.random() * (493 - 387 + 1) + 387);

	switch(this){
		case kanto:
			info.innerText = "";
			getNewWord(kantoDex);
			kantoBattleSound.play();
			winSound = kantoWinSound;
			break;
		case johto:
			info.innerText = "";;
			getNewWord(johtoDex);
			johtoBattleSound.play();
			winSound = johtoWinSound;
			break;
		case hoenn:
			info.innerText = "";
			getNewWord(hoennDex);
			hoennBattleSound.play();
			winSound = hoennWinSound;
			break;
		case sinnoh:
			info.innerText = "";
			getNewWord(sinnohDex);
			sinnohBattleSound.play();
			winSound = sinnohWinSound;
			break;	
		default:
	}

}

kanto.onclick = switchRegion;
johto.onclick = switchRegion;
hoenn.onclick = switchRegion;
sinnoh.onclick = switchRegion;

// lives.innerText = lives.innerText + livesCounter;

function updateWord(newWord){
	word.innerText = "";
	// pokemonName = newWord.replace(/[^A-z]/g, "");
	pokemonName = newWord;
	guessWord = pokemonName.replace(/[^A-z]/g, "");
	wordLength = pokemonName.length; 
	createBlanks(wordLength);
	console.log(pokemonName);
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

		// for testing/ restrict api calls
	// updateWord("getNewWord")
	// spriteSrc = "";
		
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
		
		let letter = new RegExp("[a-z]");
		let isLetter = letter.test(pokemonName[i]);
		console.log(isLetter, pokemonName[i], "hi")

		if(isLetter){
			li.classList.add("guessWord", "hide");
		}
		li.innerText = pokemonName[i];

		word.appendChild(li);

	}

}

function check(){	
// document.querySelector("label[for='" + "kanto" + "']").style.outline = "solid black 14px";

	guess = document.getElementById("guess").value;
	guess = guess.toLowerCase();

	for(let i=0; i<pokemonName.length; i++){
		if(pokemonName[i] == guess){
			let elements=document.getElementById('word').children;
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
		lives.innerText = "LIVES:" + livesCounter;
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
	livesCounter = maxHealth;
	lives.innerText = "LIVES:" + livesCounter;
	wrongGeusses = "";
	wrongGuessWrapper.innerText = "";
	hideImage();
}

function lose(){
	for(let i=0; i<pokemonName.length; i++){
			var elements=document.getElementById('word').children;
			elements.item(i).classList.remove("hide");
		}
		stopBattleMusic();
		info.innerText = "You lose. Try again?";
		disableInput();
		loseSound.play();		
		revealImage();
	}

function win(){
	stopBattleMusic()
	info.innerText = "You win! Play again?";
	winSound.play();
	disableInput();
	revealImage();
}

function revealImage(){
	sprite.src = spriteSrc;
	sprite.style.height = "150px";
  sprite.style.width = "150px";
	sprite.alt = "Sprite Reveal";
}
function hideImage(){
	sprite.src = "";
	sprite.alt = "";
	sprite.style.height = "0";
  sprite.style.width = "0";
}

function stopBattleMusic(){
	kantoBattleSound.pause();
	kantoBattleSound.currentTime = 0;

	johtoBattleSound.pause();
	johtoBattleSound.currentTime = 0;

	hoennBattleSound.pause();
	hoennBattleSound.currentTime = 0;

	sinnohBattleSound.pause();
	sinnohBattleSound.currentTime = 0;
}