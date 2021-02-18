/* Helper Functions */
function random(int) {
  return Math.floor(Math.random() * int);
}

function titleCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

/* Main */
const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
const RPS = [ROCK, PAPER, SCISSORS];

function computerPlay() {
  return RPS[random(RPS.length)];
}

function playRound(playerSelection, computerSelection) {
  const WIN = 'win';
  const LOSE = 'lose';
  const DRAW = 'draw';

  let result;
  switch (computerSelection) {
    case ROCK:
      result = (playerSelection === PAPER) ? WIN :
        (playerSelection === SCISSORS) ? LOSE :
        DRAW;
      break;
    case PAPER:
      result = (playerSelection === SCISSORS) ? WIN :
        (playerSelection === ROCK) ? LOSE :
        DRAW;
      break;
    case SCISSORS:
      result = (playerSelection === ROCK) ? WIN :
        (playerSelection === PAPER) ? LOSE :
        DRAW;
      break;
  }

  console.log(
    (result === WIN) ? `You Win! ${titleCase(playerSelection)} beats ${titleCase(computerSelection)}` :
    (result === LOSE) ? `You Lose! ${titleCase(computerSelection)} beats ${titleCase(playerSelection)}` :
    `Draw! Both Player and Computer chose ${titleCase(computerSelection)}`
  );

  return result;
}

// 2021-02-19
// Working on UI buttons
const buttons = document.querySelectorAll('button');
const computer = document.querySelector('#computer');
const result = document.querySelector('#result');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const playerSelection = e.target.value;
    const computerSelection = computerPlay();
    console.log(playerSelection, computerSelection);

    // Show what computer will play
    computer.textContent = computerSelection;

    const round = playRound(playerSelection, computerSelection);
    result.textContent = round;
  });
});
