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
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameover) {
    return;
  }
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  r = currColumns[c];
  if (r < 0) {
    return;
  }

   var playerRedColor = document.getElementById("playerRedColor").value;
  var playerYellowColor = document.getElementById("playerYellowColor").value;

  if (playerRedColor === playerYellowColor) {
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
  //horizontally
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

  //vertically
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
  //anti diagonally
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

  //diagonally
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
