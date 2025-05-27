const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');

const startGameBtn = document.getElementById('startGame');

const gameBoard = document.getElementById('game');

const cells = document.querySelectorAll('.cell');

const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let players = {
  X: "Player X",
  O: "Player O"
};

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {

  const index = e.target.dataset.index;
  // console.log(index);

  if (board[index] !== "" || !gameActive) return; // cheking the board index empty or not empty 

  console.log(gameActive); // status true beacuse not empty index box

  board[index] = currentPlayer; 
  console.log(board); // So AFTER CLICK shows who the current player is at that position Then the current player at that position is set (e.g. "X" or "O").

  e.target.textContent = currentPlayer; // this line shows u currentplayer text in box ex 
  // (x or y)

  e.target.classList.add(currentPlayer.toLowerCase()); // adding a class to css

  if (checkWinner()) {
    statusText.textContent = `${players[currentPlayer]} wins!`;

    gameActive = false; // after win game off

    launchFireworks();

  } else if (board.every(cell => cell !== "")) {  // If the entire page cell is filled, it will give a message like It's a draw!. 
    statusText.textContent = "It's a draw!";
    gameActive = false;

  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";  // this is Ternary Operator
    //  understanding simple if else  
    // }   if (currentPlayer === "X") {
    //   currentPlayer = "O";

    // } else {
    //   currentPlayer = "X";  
    // }
    statusText.textContent = `${players[currentPlayer]}'s turn`;


  }
}

function checkWinner() {
  return winConditions.some(([a, b, c]) => {
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `${players[currentPlayer]}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

function launchFireworks() {
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Start Game with Names
startGameBtn.addEventListener('click', () => {
  const nameX = playerXInput.value.trim();
  const nameO = playerOInput.value.trim();

  if (!nameX || !nameO) {
    alert("Please enter names for both players!");
    return;
  }

  players.X = nameX;
  players.O = nameO;
  gameActive = true;
  statusText.textContent = `${players[currentPlayer]}'s turn`;
  gameBoard.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
  document.getElementById('player-inputs').classList.add("hidden");
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
