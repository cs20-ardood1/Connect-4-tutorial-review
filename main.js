// GLOBAL VARIABLES
let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = playerRed;
let gameover = false;
let board;
let rows = 6;
let columns = 7;
let currColumns;
let playerRedScore = 0;
let playerYellowScore = 0;

window.onload = function () {
  setGame();
  document.getElementById("btn").addEventListener("click", replayGame);
};

function setGame() {
  board = []; // board array
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");
      // div
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      if (!tile) {
        tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");
        tile.addEventListener("click", setPiece);
        //append the div within the html instead of doing it manually 42 times
        document.getElementById("board").append(tile);
      } else {
        tile.style.backgroundColor = "";
      }
    }
    board.push(row);
  }
}

function replayGame() {
  gameover = false;
  currentPlayer = playerRed;
  setGame();
}

function setPiece() {
  if (gameover) {
    return;
  }

  let coords = this.id.split("-"); //coordinates of tile clicked
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  r = currColumns[c];
  if (r < 0) {
    return;
  }

  let playerRedColor = document.getElementById("playerRedColor").value;
  let playerYellowColor = document.getElementById("playerYellowColor").value;
  if (playerRedColor === playerYellowColor) {
    //Pieces cant be the same color
    alert("The pieces can't have the same color");
    document.getElementById("playerRedColor").value = "#FF0000";
    document.getElementById("playerYellowColor").value = "#FFFF00";
    return;
  }

  board[r][c] = currentPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currentPlayer === playerRed) {
    tile.style.backgroundColor = playerRedColor;
    currentPlayer = playerYellow;
  } else {
    tile.style.backgroundColor = playerYellowColor;
    currentPlayer = playerRed;
  }

  r -= 1;
  currColumns[c] = r;
  checkWinner();
}

function checkWinner() {
  //check 4 in a row horizontally
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c + 1] === board[r][c + 2] &&
          board[r][c + 2] === board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //check 4 in a row vertically
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] === board[r + 1][c] &&
          board[r + 1][c] === board[r + 2][c] &&
          board[r + 2][c] === board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
  //check 4 in a row anti diagonally
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] === board[r + 1][c + 1] &&
          board[r + 1][c + 1] === board[r + 2][c + 2] &&
          board[r + 2][c + 2] === board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //check 4 in a row diagonally
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] === board[r - 1][c + 1] &&
          board[r - 1][c + 1] === board[r - 2][c + 2] &&
          board[r - 2][c + 2] === board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Check for a tie
  let isTie = true;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === " ") {
        isTie = false;
        break;
      }
    }
    if (!isTie) {
      break;
    }
  }

  if (isTie) {
    gameover = true;
    let winner = document.getElementById("winner");
    winner.innerHTML = "It's a Tie";
  }
}

function setWinner(r, c) {
  gameover = true;
  let winner = document.getElementById("winner");

  // Create a new Audio object
  let audio = new Audio("sounds/winner.wav");

  if (board[r][c] === playerRed) {
    playerRedScore++;
    document.getElementById("playerRedScore").innerHTML =
      "Player Red Score: " + playerRedScore;
    winner.innerHTML = "Red Wins";
  } else {
    playerYellowScore++;
    document.getElementById("playerYellowScore").innerHTML =
      "Player Yellow Score: " + playerYellowScore;
    winner.innerHTML = "Yellow Wins";
  }

  // Play the audio
  audio.play();
}

function replayGame() {
  // Reset the game variables
  currentPlayer = playerRed;
  gameover = false;
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  let tiles = document.getElementsByClassName("tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].style.backgroundColor = "";
  }

  // Reinitialize the game board
  setGame();
}
