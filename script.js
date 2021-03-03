/**************************************************
*
* Function declarations
*
**************************************************/

/* Helper functions */

function random(int) {
  return Math.floor(Math.random() * int);
}

function titleCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

/* Main functions */

function computerPlay(options=OPTIONS) {
  return options[random(options.length)];
}

function playRound(playerSelection, computerSelection) {
  let result;
  const winOrLose = (playerBeats, playerLosesTo) => {
    if (computerSelection === playerLosesTo) return LOSE;
    if (computerSelection === playerBeats) return WIN;
  };

  if (playerSelection === computerSelection) result = DRAW;
  else {
    if (playerSelection === ROCK) result = winOrLose(SCISSORS, PAPER);
    if (playerSelection === PAPER) result = winOrLose(ROCK, SCISSORS);
    if (playerSelection === SCISSORS) result = winOrLose(PAPER, ROCK);
  }

  return result;
}

function generateEmoji(value) {
  let filename = (value === ROCK) ? 'emoji_u270a.svg'
    : (value === PAPER) ? 'emoji_u270b.svg'
    : (value === SCISSORS) ? 'emoji_u270c.svg'
    : null;

  const emoji = document.createElement('img');
  emoji.src = `img/${filename}`;
  emoji.alt = value;
  
  return emoji;
}

function displayChoices(playerChoice, computerChoice, playerEmoji, computerEmoji) {
  // remove existing child elements
  playerChoice.removeChild(playerChoice.firstChild);
  computerChoice.removeChild(computerChoice.firstChild);

  // append emojis
  playerChoice.appendChild(playerEmoji);
  computerChoice.appendChild(computerEmoji);
}

function displayResult(dest, round, playerSelection, computerSelection) {
  dest.textContent = (round === DRAW) ? 'Draw!'
    : (round === LOSE) ? `Sad, ${computerSelection} beats ${playerSelection} :(`
    : `You're awesome! ${titleCase(playerSelection)} beats ${computerSelection}!`;

  console.log(dest.textContent);
}

function assignPoints(round) {
  if (round === WIN) scores.player++;
  if (round === LOSE) scores.computer++;
}

function displayScores(scores) {
  playerScore.textContent = scores.player;
  computerScore.textContent = scores.computer;
}

function declareWinner(dest, winner, resetButton) {
  currentRound.textContent = 'Game Over';
  roundNum.textContent = '';
  dest.textContent = (winner === 'computer') ? 'Computer won the game. You lost, man :('
    : 'You won the game! Go treat yo\' self ;)';
  resetButton.style.display = 'unset';
  
  // Log game results
  console.log(`Game Over! ${titleCase(winner)} wins.
Player: ${scores.player}
Computer: ${scores.computer}`
  );
}

/**************************************************
*
* Main program
*
**************************************************/

// Game variables
const OPTIONS = ['rock', 'paper', 'scissors'];
const [ROCK, PAPER, SCISSORS] = [...OPTIONS];
const [WIN, LOSE, DRAW] = ['win', 'lose', 'draw'];

// DOM elements
const currentRound = document.querySelector('#currentRound');
const roundNum = document.querySelector('#round');
const buttons = document.querySelectorAll('#buttons > button');
const [pc, cc] = document.querySelectorAll('#choices > div');
const resultMsg = document.querySelector('#resultMsg');
const resetButton = document.querySelector('#reset');
const playerScore = document.querySelector('#playerScore');
const computerScore = document.querySelector('#computerScore');

// Data
let scores = { player: 0, computer: 0 };
let counter = 1;

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const playerSelection = e.target.id;
    const computerSelection = computerPlay();

    const pe = generateEmoji(playerSelection);
    const ce = generateEmoji(computerSelection);
    displayChoices(pc, cc, pe, ce);

    // Determine the match results
    const round = playRound(playerSelection, computerSelection);

    displayResult(resultMsg, round, playerSelection, computerSelection);
    assignPoints(round);
    displayScores(scores);

    let winner;
    for (const prop in scores) {
      if (scores[prop] === 5) {
        winner = prop;
        declareWinner(resultMsg, winner, resetButton)
        buttons.forEach((button) => button.disabled = true);
      }
    }

    // If no winner yet, prepare for the next round
    if (!winner) roundNum.textContent = ++counter;
  });
});

resetButton.addEventListener('click', (e) => {
  // reset counter
  counter = 1;
  roundNum.textContent = counter;
  currentRound.textContent = 'Round ';

  // reset scores
  for (const prop in scores) scores[prop] = 0;
  displayScores(scores);

  // clear choices
  pc.removeChild(pc.firstChild);
  cc.removeChild(cc.firstChild);
  pc.textContent = '?';
  cc.textContent = '?';

  // clear result
  resultMsg.textContent = '';
  resetButton.style.display = 'none';

  // enable buttons
  buttons.forEach((button) => button.disabled = false);
});
