const gameBoard = document.getElementById("gameboard");

for (let i = 0; i <= 8; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.dataset.square = i;
  gameBoard.appendChild(square);
}

const playerFactory = (team) => {

  const getTeam = () => {
    return team
  };

  return { getTeam };
};

const playerX = playerFactory("X");
const playerO = playerFactory("O");

const game = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const showBoard = () => {
    return board;
  };

  const updateBoard = (square) => {
    board[square] = "X";
    console.log(board)
  };

  return { showBoard, updateBoard };
})();
console.log(game)
console.log(game.showBoard)
game.showBoard

// const displayController = (() => {
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      square.innerText = "X"
      game.updateBoard([square.dataset.square])
      // console.log(game.showBoard)
    })
  });

// });
