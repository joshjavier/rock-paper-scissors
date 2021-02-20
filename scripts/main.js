/* Helper functions */
function random(int) {
  return Math.floor(Math.random() * int);
}

function titleCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

/* Main */
const [ROCK, PAPER, SCISSORS] = ['rock', 'paper', 'scissors'];
const [WIN, LOSE, DRAW] = ['win', 'lose', 'draw'];

function computerPlay(choices = [ROCK, PAPER, SCISSORS]) {
  return choices[random(choices.length)];
}

function playRound(playerSelection, computerSelection) {
  let result;
  switch (computerSelection) {
    case ROCK:
      result = (playerSelection === PAPER) ? WIN
             : (playerSelection === SCISSORS) ? LOSE
             : DRAW;
      break;
    case PAPER:
      result = (playerSelection === SCISSORS) ? WIN
             : (playerSelection === ROCK) ? LOSE
             : DRAW;
      break;
    case SCISSORS:
      result = (playerSelection === ROCK) ? WIN
             : (playerSelection === PAPER) ? LOSE
             : DRAW;
      break;
  }

  return result;
}

// 2021-02-19
// Working on UI buttons
const playerButtons = document.querySelectorAll('#player > button');
const computerButton = document.querySelector('#computer > button');
const result = document.querySelector('#result');

let scores = { player: 0, computer: 0 };

playerButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const playerSelection = e.target.value;
    const computerSelection = computerPlay();

    // Show what computer will play
    computerButton.textContent = titleCase(computerSelection);

    const round = playRound(playerSelection, computerSelection);
    result.textContent = (round === 'win') ? 'You Win!'
                       : (round === 'lose') ? 'You Lose!'
                       : 'Draw!';

    assignPoints(round);
    printScores(scores);

  });
});

// 2021-02-20
// What's missing?
// - determine the winner

function assignPoints(round) { // assign points based on a round's result
  if (round === WIN) scores.player++;
  if (round === LOSE) scores.computer++;
}

function printScores(scores) { // print the scores on the page
  const playerScore = document.querySelector('#playerScore');
  const computerScore = document.querySelector('#computerScore');
  playerScore.textContent = scores.player;
  computerScore.textContent = scores.computer;
}

function checkWinner() {
  // check if there's a winner, and print it on the page
}
