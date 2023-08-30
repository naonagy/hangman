let randomWordElement, revealedLetters, hiddenword;

document.addEventListener("DOMContentLoaded", function () {
  // Assign randomWordElement when the DOM is fully loaded
  randomWordElement = document.getElementById("randomWord");

  // Fetch the first random word and initialize the game
  fetchRandomWord();
  start(); // Call start() to set initial visibility
});

// drawing the hangman

const canvas = document.getElementById("canvas");
function clearCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
}

function errorDraw1(){
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(225, 100, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.stroke();
  }
}
function errorDraw2(){
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(260, 100);
    ctx.arc(225, 100, 35, 0, Math.PI, false); // Mouth (clockwise)
    ctx.stroke();
  }
}
function errorDraw3(){
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(215, 90);
    ctx.arc(210, 90, 5, 0, Math.PI * 2, true); // Left eye
    ctx.moveTo(245, 90);
    ctx.arc(240, 90, 5, 0, Math.PI * 2, true); // Right eye
    ctx.stroke();
  }
}
function errorDraw4(){
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(225, 150); // The start of the neck
    ctx.lineTo(225, 325); // Neck and body
    ctx.stroke();
  }
}
function errorDraw5(){
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(225, 325);
    ctx.lineTo(300, 425); // Right leg 
    ctx.stroke();
  }
}
function errorDraw6(){
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(225, 325);
    ctx.lineTo(150, 425); // Left leg 
    ctx.stroke();
  }
}
function errorDraw7(){
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(225, 250);
    ctx.lineTo(300, 175); // Right arm
    ctx.stroke();
  }
}
function errorDraw8(){
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(225, 250);
    ctx.lineTo(150, 175); // Left arm
    ctx.stroke();
  }
}
function draw() {
if (canvas.getContext) {
const ctx = canvas.getContext("2d");

ctx.beginPath();
//ctx.arc(225, 100, 50, 0, Math.PI * 2, true); // Outer circle
//ctx.moveTo(260, 100);
//ctx.arc(225, 100, 35, 0, Math.PI, false); // Mouth (clockwise)
//ctx.moveTo(215, 90);
//ctx.arc(210, 90, 5, 0, Math.PI * 2, true); // Left eye
//ctx.moveTo(245, 90);
//ctx.arc(240, 90, 5, 0, Math.PI * 2, true); // Right eye
//ctx.moveTo(225, 150); // The start of the neck
//ctx.lineTo(225, 325); // Neck and body
//ctx.lineTo(300, 425); // Right leg 
//ctx.moveTo(225, 325);
//ctx.lineTo(150, 425); // Left leg 
//ctx.moveTo(225, 250);
//ctx.lineTo(300, 175); // Right arm
//ctx.moveTo(225, 250);
//ctx.lineTo(150, 175); // Left arm
ctx.moveTo(25, 10); 
ctx.lineTo(25, 500); 
ctx.moveTo(25, 50);
ctx.lineTo(65, 10);
ctx.moveTo(25, 10);
ctx.lineTo(225, 10);
ctx.lineTo(225, 50);
ctx.moveTo(0, 500);
ctx.lineTo(350, 500);
ctx.stroke();
}
}
draw();

// create ABC array

function generateAlphabetArray() {
  const alphabet = [];
  for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  return alphabet;
}

// checking if array contains given letter and returning indexes

function checkIfContains(letterToFind, lettersArray) {
  const foundIndexes = [];
  const normalizedLetter = letterToFind.trim().toLowerCase(); // normalize and lowercase the input letter
  for (let i = 0; i < lettersArray.length; i++) {
    const normalizedArrayLetter = lettersArray[i].trim().toLowerCase(); // normalize and lowercase each array letter
    if (normalizedLetter === normalizedArrayLetter) {
      foundIndexes.push(i);
    }
  }
  return foundIndexes;
}

// changing the _ with guessed letter, returning changed array

function changeFoundLetter(arrayOfIndexes, hiddenArray, revealedArray){
for (let i = 0; i < arrayOfIndexes.length; i++)
{
  const index = arrayOfIndexes[i];
  hiddenArray[index] = revealedArray[index];
}
return hiddenArray;
}

let track=0; // counting the mistakes that were made

// displaying the abc

const lettersArray = generateAlphabetArray();
const alphabetButtonsElement = document.getElementById('alphabetButtons');
lettersArray.forEach(letter => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = letter;
  buttonElement.onclick = function() {
      checkLetterAndUpdate(letter, buttonElement); // Pass letter and button element
  };
  alphabetButtonsElement.appendChild(buttonElement);
});

//  changing the _ with the clicked letter in real time

function checkLetterAndUpdate(letter, buttonElement) {
  const foundIndexes = checkIfContains(letter, revealedLetters);

  if (foundIndexes.length > 0) {
      changeFoundLetter(foundIndexes, hiddenword, revealedLetters);
      randomWordElement.textContent = hiddenword.join(' ');
      if (!(hiddenword.includes('_')))
        wonTheGame();
  } else {
      track++;
      errorTracking();
  }
  // Disable the clicked button
  buttonElement.disabled = true;
}

function enableLetterButtons() {
  const letterButtons = document.querySelectorAll('#alphabetButtons button');
  letterButtons.forEach(button => {
    button.disabled = false;
  });
}

// counting the mistakes that were made, and drawing the hangman based on progress

function errorTracking(){
  switch (track) {
    case 1:
      errorDraw1();
      break;
    case 2:
      errorDraw2();
      break;
    case 3:
      errorDraw3();
      break;
    case 4:
      errorDraw4();
      break;
    case 5:
      errorDraw5();
      break;
    case 6:
      errorDraw6();
      break;
    case 7:
      errorDraw7();
      break;
    default:
      errorDraw8();
      gameOver();
  }
}

// getting a new word displaying on screen

  function fetchRandomWord() {
    fetch('https://random-word-api.herokuapp.com/word?length=6')
    .then(response => response.json())
    .then(data => {
        const randomWord = data[0];
        console.log(randomWord);

        revealedLetters = randomWord.split('');
        firstLetter = revealedLetters[0];

        hiddenword = Array.from({ length: 6 }, (_, index) => {
            if (revealedLetters[index] === firstLetter) {
                return firstLetter;
            } else {
                return '_';
            }
        });

        randomWordElement.textContent = hiddenword.join(' ');

        // Update the correct word display with the revealed letters
        const correctWordDisplay = document.getElementById("correctWordDisplay");
        correctWordDisplay.textContent = revealedLetters.join('');

    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function start()
{
  document.getElementById("startingPage").style.visibility = "visible";
  document.getElementById("gameingPage").style.visibility = "hidden";
  document.getElementById("gameOverPage").style.visibility = "hidden";
  document.getElementById("rulesPage").style.visibility = "hidden";
  document.getElementById("winningPage").style.visibility = "hidden";

}
function play() {
  // Clear hangman drawing and reset track
  clearCanvas();
  track = 0;

  // Fetch a new random word
  fetchRandomWord();

  // Reset letter buttons to enable them
  enableLetterButtons();
  // Reset revealed and hidden letters arrays
  revealedLetters = [];
  hiddenword = [];

  // Update displayed word with underscores
  for (let i = 0; i < revealedLetters.length; i++) {
      hiddenword.push('_');
  }

  // Hide game over page and show gaming page
  document.getElementById("startingPage").style.visibility = "hidden";
  document.getElementById("gameingPage").style.visibility = "visible";
  document.getElementById("gameOverPage").style.visibility = "hidden";
  document.getElementById("rulesPage").style.visibility = "hidden";
  document.getElementById("winningPage").style.visibility = "hidden";

}

function gameOver()
{

  document.getElementById("gameOverPage").style.visibility = "visible";


}
function rules()
{
  document.getElementById("startingPage").style.visibility = "hidden";
  document.getElementById("gameingPage").style.visibility = "hidden";
  document.getElementById("gameOverPage").style.visibility = "hidden";
  document.getElementById("rulesPage").style.visibility = "visible";
  document.getElementById("winningPage").style.visibility = "hidden";

}
function wonTheGame()
{
  document.getElementById("winningPage").style.visibility = "visible";

}
