const boxes = document.querySelectorAll(".box");
const winnerText = document.getElementById("winner-text");
const newGameBtn = document.getElementById("new-game-btn");
const resetBtn = document.getElementById("reset-btn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleBoxClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    winnerText.textContent = `Winner: ${currentPlayer}`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    winnerText.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    winnerText.textContent = `Turn: ${currentPlayer}`;
  }
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach(box => box.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  winnerText.textContent = `Turn: ${currentPlayer}`;
}

newGameBtn.addEventListener("click", resetBoard);
resetBtn.addEventListener("click", resetBoard);
boxes.forEach(box => box.addEventListener("click", handleBoxClick));
x`  `