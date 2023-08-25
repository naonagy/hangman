
// drawing the hangman

function draw() {
const canvas = document.getElementById("canvas");
if (canvas.getContext) {
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(225, 100, 50, 0, Math.PI * 2, true); // Outer circle
ctx.moveTo(260, 100);
ctx.arc(225, 100, 35, 0, Math.PI, false); // Mouth (clockwise)
ctx.moveTo(215, 90);
ctx.arc(210, 90, 5, 0, Math.PI * 2, true); // Left eye
ctx.moveTo(245, 90);
ctx.arc(240, 90, 5, 0, Math.PI * 2, true); // Right eye
ctx.moveTo(225, 150); // The start of the neck
ctx.lineTo(225, 325); // Neck and body
ctx.lineTo(300, 425); // Right leg 
ctx.moveTo(225, 325);
ctx.lineTo(150, 425); // Left leg 
ctx.moveTo(225, 250);
ctx.lineTo(300, 175); // Right arm
ctx.moveTo(225, 250);
ctx.lineTo(150, 175); // Left arm
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

// checkIfContains function
function checkIfContains(letterToFind, lettersArray) {
  const foundIndexes = [];
  const normalizedLetter = letterToFind.trim().toLowerCase(); // Normalize and lowercase the input letter
  for (let i = 0; i < lettersArray.length; i++) {
    const normalizedArrayLetter = lettersArray[i].trim().toLowerCase(); // Normalize and lowercase each array letter
    if (normalizedLetter === normalizedArrayLetter) {
      foundIndexes.push(i);
    }
  }
  return foundIndexes;
}


// changing the letter
function changeFoundLetter(arrayOfIndexes, hiddenArray, revealedArray){
for (let i = 0; i < arrayOfIndexes.length; i++)
{
  const index = arrayOfIndexes[i];
  hiddenArray[index] = revealedArray[index];
}
return hiddenArray;
}

let revealedLetters, hiddenword, randomWordElement;

// displaying the abc
const lettersArray = generateAlphabetArray();
const alphabetButtonsElement = document.getElementById('alphabetButtons');
lettersArray.forEach(letter => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = letter;
  buttonElement.onclick = function() {
    checkLetterAndUpdate(letter);
  };
  alphabetButtonsElement.appendChild(buttonElement);
});

function checkLetterAndUpdate(letter) {
  console.log('Button clicked:', letter);
  const foundIndexes = checkIfContains(letter, revealedLetters);
  console.log('Found indexes:', foundIndexes);
  changeFoundLetter(foundIndexes, hiddenword, revealedLetters);
  console.log('Updated hiddenword:', hiddenword);
  randomWordElement.textContent = hiddenword.join(' ');
}



// getting a new word displaying on screen
fetch('https://random-word-api.herokuapp.com/word?length=6')
  .then(response => response.json())
  .then(data => {
    const randomWord = data[0];
    console.log(randomWord);

    revealedLetters = randomWord.split('');
    hiddenword = Array.from({ length: revealedLetters.length }, () => '_');
    randomWordElement = document.getElementById('randomWord');
    randomWordElement.textContent = hiddenword.join(' ');
  })
  .catch(error => {
    console.error('Error:', error);
  });


