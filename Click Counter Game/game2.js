var currentScore = document.querySelector('#currentScore');
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var statusMessage = document.querySelector('#statusMessage');
var resumeButton = document.querySelector('#resumeButton');
var pauseButton = document.querySelector('#pauseButton');
var resetButton = document.querySelector('#resetButton');
var body = document.querySelector('body');
var video = document.querySelector('video');







var current = 0;   //user -> button clicked -> data store (clike me)
var high = 0; //highscore -> track rakh sake..
var time1 = 10; //  time-> update...
var track = false;
var idTrack = null; // time -> control




function loadContent() {
    dataLoad();
    displayMessage();
}



function dataLoad() {

    var temp = localStorage.getItem('highScore');  //pehli bar local storage -> return null otherwise -> data;
    if (temp != null) {
        high = parseInt(temp); //explicity type conversion...
    }
    else {
        high = 0;
    }
};

function displayMessage() {

    currentScore.textContent = current;
    highScore.textContent = high;
    timer.textContent = time1;

    if (current > 20) {
        currentScore.style.color = "red";
    } else {
        currentScore.style.color = "white";
    }

};


function statusMsg(msg) {
    statusMessage.textContent = msg;

}


function endGame() {
    clearInterval(idTrack);
    track = false;
    clickButton.disabled = true;
    startButton.disabled = false;
    startButton.innerText = "Play Again";
        alert(`you clicked ${current / 10} times per second!`);
    if (current > high) {

        localStorage.setItem('highScore', current);
        high = current; //49
        displayMessage();
        statusMsg("you're current score is higher than previous one");
        document.body.style.background = 'gold';
        setInterval(() =>{
        document.body.style.background = 'white';
        },1000);
    }
    else if (current = high) {
        statusMsg("you're current score is equal to the previous one");
    }
    else {
        statusMsg("you're current score is less compare to previous one");
        alert("oops! Time's up - but you can totally crush it next round!");
        statusMsg("All tasks Are successfully completed!");
    }

    clickButton.style.transform = 'scale(1.1)'

}


function startGame() {

    track = true;
    clickButton.disabled = false;
    startButton.disabled = true;
    time1 = 10;
    current = 0;

    statusMsg("Game is started");
    idTrack = setInterval(function () {
        time1--;
        if (time1 <= 0) {
            endGame();
            alert(" Game over! Try again!");
        }
        displayMessage();
    }, 1000);

    setTimeout(() => {
        clickButton.innerText = "";
    }, 1000);

}



function clickMe() {
    if (track) {

        current++;

        displayMessage();
    }




}

function resetHighscore() {
    localStorage.removeItem('highscore');
    high = 0;
    displayMessage();
    statusMessage.textContent = "Your Entire game reset now you are goof to go with new game";

};

function pauseGame() {
    clickButton.disabled = true;
    startButton.disabled = false;
    clearInterval(idTrack);
    statusMsg("Your game is paused...");
    resumeButton.style.display = "block";

};

function resumeGame() {
    clickButton.disabled = true;
    startButton.disabled = false;
    idTrack = setInterval(function () {
        time1--;
        displayMessage();
        if (time1 <= 0) {
            endGame();
        }
    }, 1000);
    statusMsg("Your game is restarted...");

};


loadContent();



startButton.addEventListener('click', startGame);

clickButton.addEventListener('click', clickMe);

resetButton.addEventListener('click', resetHighscore);

pauseButton.addEventListener('click', pauseGame);

resumeButton.addEventListener('click', resumeGame);




