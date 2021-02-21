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
const buttons = document.querySelectorAll('#buttons > button');
const result = document.querySelector('#result');
let scores = { player: 0, computer: 0 };
let counter = 1;

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const playerSelection = e.target.dataset.value;
    const computerSelection = computerPlay();

    // Display what player and computer will play
    const [playerPick, computerPick] = document.querySelectorAll('#plays > div');
    playerPick.textContent = titleCase(playerSelection);
    computerPick.textContent = titleCase(computerSelection);

    // Determine the match results
    const round = playRound(playerSelection, computerSelection);
    let winner, winningHand, losingHand;
    if (round === WIN) {
      winner = 'You';
      winningHand = titleCase(playerSelection);
      losingHand = titleCase(computerSelection);
    } else if (round === LOSE) {
      winner = 'Computer';
      winningHand = titleCase(computerSelection);
      losingHand = titleCase(playerSelection);
    } else {
      winner = 'Nobody';
      losingHand = titleCase(playerSelection); // for Draw results
    }

    printResults(winner, winningHand, losingHand);
    assignPoints(round);
    printScores(scores);

    // Prepare for the next round
    const roundNum = document.querySelector('#round');
    roundNum.textContent = ++counter;
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

function printResults(winner, winningHand, losingHand) {
  const line1 = document.createElement('p');
  if (winningHand) {
    line1.innerHTML = `<em>${winningHand}</em> beats <em>${losingHand}</em>`;
  } else {
    line1.innerHTML = `Both player and computer played <em>${titleCase(losingHand)}</em>`;
  }

  const line2 = document.createElement('p');
  line2.innerHTML = `${winner} won in Round ${counter}.`;

  // clear previous results
  [...result.children].forEach((child) => result.removeChild(child));
  // append new results
  [line1, line2].forEach((line) => result.appendChild(line));
  // then log into the console for those who want a history
  [...result.children].forEach((child) => console.log(child.textContent));
}

function checkWinner() {
  // check if there's a winner, and print it on the page
}
