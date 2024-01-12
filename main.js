// GLOBAL VARIABLES
let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = playerRed;
let gameover = false;
let board;
let rows = 6;
let columns = 7;
let currColumns;

window.onload = function () {
  setGame();
  // location.realod()
};

function setGame() {
  board = [];// board array
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");
      // div
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      //append the div within the html instead of doing it manually 42 times
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameover) {
    return;
  }
  let coords = this.id.split("-");//coordinates of tile clicked
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
    alert("The pieces can't have the same color!");
    return;
  }

  board[r][c] = currentPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currentPlayer === playerRed) {
    tile.style.backgroundColor= playerRedColor;
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
  for (let r = 3; r < rows3; r++) {
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
}

function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] === playerRed) {
    winner.innerHTML = "Red Wins";
  } else {
    winner.innerHTML = "Yellow Wins";
  }
  gameover = true;
  
}
