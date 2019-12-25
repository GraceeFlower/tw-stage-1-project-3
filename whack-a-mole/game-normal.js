window.onload = function () {
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.getElementById('start_btn');
  let titleH1 = document.getElementById('title');

  let lastHole;
  let timeUp = false;
  let score = 0;
  let gameTime = 10000;

  startBtn.addEventListener('click', function () {
    showBtnAnimation();
    startGame();
  }, false);

  function showBtnAnimation() {
    event.preventDefault();
    startBtn.classList.add('animate');
    setTimeout(() => {
      startBtn.classList.remove('animate');
      startBtn.style.display = 'none';
    }, 700);
  }

  function startGame() {
    resetScoreAndTime();
    var intervalID = window.setInterval(chooseMole, 1000);
    
    setTimeout(() => {
      startBtn.style.display = 'inline-block';
      startBtn.innerText = "Replay!";
      titleH1.innerHTML = "TimeUp! ";
    }, gameTime);
    setTimeout(() => {
      clearInterval(intervalID);
    }, gameTime - 600);
  }

  function resetScoreAndTime() {
    score = 0;
    scoreBoard.innerText = 0;
    startBtn.innerText = "Start!";
    titleH1.innerText = "WHACK-A-MOLE! ";
  }

  function chooseMole() {
    const time = randomTime(600, 400);
    const hole = randomHole();
    peep(time, hole);
  }

  function peep(holeOutTime, hole) {
    lastHole = hole;
    var hole = document.querySelector(`.${hole}`);
    hole.classList.add("up");
    setTimeout(() => {
        hole.classList.remove("up");
    }, holeOutTime);
  }

  function randomTime(minInterval, interval) {
    return minInterval + Math.random() * interval;
  }

  function randomHole() {
    var holeIndex = "hole" + Math.ceil(Math.random() * 6);
    if (holeIndex === lastHole) {
      return randomHole();
    }
    return holeIndex;
  }

  moles.forEach((mole) => mole.addEventListener("click", function (event) {
    var target = event.target;
    var hole = target.parentNode;
    if (hole.classList.contains("up")) {
        scoreBoard.innerText = ++score;
        hole.classList.remove("up");
    }
  }))
};