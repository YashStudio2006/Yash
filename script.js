const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord , correctLetters ,wrongGuesscount;
const maxGuessescount = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuesscount = 0;
    hangmanImage.src = `images/hangman-${wrongGuesscount}.svg`;
    guessesText.innerText = `${wrongGuesscount} / ${maxGuessescount}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => { 
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = (isVictory) => { 
    setTimeout(()=> {
        const modalText = isVictory ? `You found the word :` : `The correct word was :`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats !' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
     }, 300);
}

const initGame = (button , clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index)=>{
            if(letter == clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        wrongGuesscount++;
        hangmanImage.src = `images/hangman-${wrongGuesscount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuesscount} / ${maxGuessescount}`;

    if(wrongGuesscount == maxGuessescount) return gameOver(false);
    if(correctLetters.length == currentWord.length) return gameOver(true);
}

// Generate keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    const letter = String.fromCharCode(i); 
    button.textContent = letter; 
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

// Initialize game
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);