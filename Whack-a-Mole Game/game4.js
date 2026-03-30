//DOM ELEMENTS
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const hitMsg = document.querySelector('#hitMsg');          
const hitsDisplay = document.querySelector('#hits');       
const lastScoreDisplay = document.querySelector('#lastScore'); 
const fastestHitDisplay = document.querySelector('#fastestHit');

// REQUIRED VARIABLE
var score = 0;
var time = 30;
var bestScore = 0;
var playGame = false;
var gameId = null;
var hits = 0;                       
var moleStartTime = 0;              
var fastestHit = null;              


// COMMON FUNCTION
function webLoad() {
    onLoad();
    displayContent();

    // Load LAST GAME score (sessionStorage)
    let last = sessionStorage.getItem('lastScore');
    lastScoreDisplay.textContent = last ? last : "—";

    // Load fastest hit
    let fh = sessionStorage.getItem('fastestHit');
    fastestHit = fh ? parseInt(fh) : null;
    fastestHitDisplay.textContent = fastestHit ? fastestHit + "ms" : "—";
}

function onLoad() {
    var temp = localStorage.getItem('highScoreMole');
    bestScore = temp ? parseInt(temp) : 0;
}

function displayContent() {
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;
    hitsDisplay.textContent = hits;

    
    scoreDisplay.style.color = score > 5 ? "gold" : "white";
}

function endGame() {
    clearInterval(gameId);
    playGame = false;
    startBtn.disabled = false;

    
    sessionStorage.setItem('lastScore', score);
    lastScoreDisplay.textContent = score;

    
    if (score > bestScore) {
        localStorage.setItem('highScoreMole', score);
        bestScore = score;

        
        maxScoreDisplay.style.textShadow = "0 0 20px yellow";
        setTimeout(() => {
            maxScoreDisplay.style.textShadow = "none";
        }, 1000);

      alert(`🎉 NEW RECORD! Score: ${score}`);

    } else {
        alert(`Your score: ${score}`);

    }

        startBtn.textContent = "Play Again";

    displayContent();
}

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomHole() {
    var index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function popGame() {
    
    var timer = time < 10 ? randomTime(250, 600) : randomTime(500, 1500);

    var hole = randomHole();
    var mole = hole.querySelector('.mole');


    moleStartTime = Date.now();

    if (playGame) {
        mole.classList.add('up');

        setTimeout(() => {
            mole.classList.remove('up');
            popGame();
        }, timer);
    }
}

function startGame() {
    time = 30;
    score = 0;
    hits = 0;

    startBtn.disabled = true;
    startBtn.textContent = "Playing...";

    playGame = true;
    displayContent();
    popGame();

    
    gameId = setInterval(() => {
        time--;
        if (time == 0) endGame();
        displayContent();
    }, 1000);
}

function bonk(event) {
    if (!event.isTrusted) return;
    if (!playGame) return;

    if (event.target.classList.contains('up')) {
        score++;
        hits++;
        event.target.classList.remove('up');
        event.target.classList.add('bonked');
        hitMsg.textContent = "Whack!";
        hitMsg.style.opacity = 1;
        setTimeout(() => hitMsg.style.opacity = 0, 300);

               let timeTaken = Date.now() - moleStartTime;

        if (fastestHit === null || timeTaken < fastestHit) {
            fastestHit = timeTaken;
            sessionStorage.setItem('fastestHit', fastestHit);
            fastestHitDisplay.textContent = fastestHit + "ms";
        }

        setTimeout(() => {
            event.target.classList.remove('bonked');
            displayContent();
        }, 300);
    }
}

webLoad();
moles.forEach(m => m.addEventListener('click', bonk));
startBtn.addEventListener('click', startGame);