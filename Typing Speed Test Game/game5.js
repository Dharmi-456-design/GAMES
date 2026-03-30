// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const timer1 = document.querySelector('#timer1');
const timer2 = document.querySelector('#timer2');
const timer3 = document.querySelector('#timer3');

// Test texts
const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster.",
    "Technology has revolutionized the way we communicate and work in the modern digital era.",
    "Typing speed is an essential skill for anyone working with computers in today's workplace.",
];

// Game state
let currentText = "";
let timeLeft = 60;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;
let pauseTimer = null;
let firstSpaceDone = false;





function webLoad() {
    onLoad();
    displayContent();
}


function onLoad() {
    var temp = sessionStorage.getItem('previousWpm');
    if (temp != null) {
        bestWPM = parseInt(temp);
    }
    else {
        bestWPM = 0;
    }
}



function displayContent() {
    timerDisplay.textContent = timeLeft;
    bestWPMDisplay.textContent = bestWPM;


}


webLoad();





function endGame() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    timeLeft = 60;
    displayContent();
}
function s15() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    timeLeft = 15;
    displayContent();
}

function s30() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    timeLeft = 30;
    displayContent();
}
function s60() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    timeLeft = 60;
    displayContent();
}

function startGame() {
    firstSpaceDone = false;

    startBtn.disabled = true;
    startBtn.disabled = true;
    currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
    console.log(currentText);
    textDisplay.textContent = currentText;

    typingArea.disabled = false;
    typingArea.value = "";
    typingArea.focus();
    typingArea.setAttribute('placeholder', 'Now you are eligible to write and use the input box');


    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endGame();
        }
        displayContent();
    }, 1000);
}

function updateStatus() {
    var textContent = typingArea.value;
   

    const word = textContent.trim().split(/\s+/).filter(w => w.length > 0);
    console.log(word);
    const elapsedTime = (Date.now() - startTime) / 1000 / 60;
    console.log(elapsedTime);
    const wpm = elapsedTime > 0 ? Math.floor(word.length / elapsedTime) : 0;
    wpmDisplay.textContent = wpm;

     
    if (wpm > 20) {
        wpmDisplay.style.fontWeight = 'bold';
   
    } else{
        wpmDisplay.style.fontWeight = 'normal';
    }
     
    var currentScore = 0;
    for (var i = 0; i < currentText.length; i++) {
        if (currentText[i] === textContent[i]) {
            currentScore++;
        }

    }
    const accuracy = (textContent.length > 0) ? Math.floor(currentScore / textContent.length * 100) : 0;
    accuracyDisplay.textContent = accuracy;


    if (accuracy === 100) {
        accuracyDisplay.style.color = 'yellow';
        accuracyDisplay.textContent = accuracy + "%";
    } else {
        accuracyDisplay.style.color = 'white';
    }
}

function Highlights() {
    var textContent = typingArea.value;
    var highlightText = " ";

    for (let i = 0; i < currentText.length; i++) {
        if (i <= textContent.length) {

            if (currentText[i] === textContent[i]) {
                highlightText += `<span class = "correct">${currentText[i]}</span>`;
            }
            else {
                highlightText += `<span class = "incorrect">${currentText[i]}</span>`;
            }
        }
        else {
            highlightText += currentText[i];
        }
    }
    textDisplay.innerHTML = highlightText;
}

function typeControl() {
    if (startTime == null) {
        startTime = Date.now();
    }
    console.log(startTime);
    updateStatus();
}



// function saveBestWPM(newWPM) {
// if (newWPM > bestWPM) {
// bestWPM = newWPM;
// sessionStorage.setItem('previousWpm', bestWPM);
// bestWPMDisplay.textContent = bestWPM;
// bestWPMDisplay.style.color = 'red';
// bestWPMDisplay.style.fontWeight = 'bold';
// }
// }

function wordType() {
    var textContent = typingArea.value;
    if (startTime == null) {
        startTime = Date.now();
    }


    clearTimeout(pauseTimer);

    pauseTimer = setTimeout(() => {
        accuracyDisplay.style.color = 'blue';
        accuracyDisplay.textContent = "Keep typing!";
    }, 3000);

    updateStatus();
    Highlights();
}

startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', wordType);
timer1.addEventListener('click', s15);
timer2.addEventListener('click', s30);
timer3.addEventListener('click', s60);