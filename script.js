const gameBoard = document.getElementById("gameboard");

for (let i = 0; i <= 8; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.dataset.square = i;
  gameBoard.appendChild(square);
}

const playerFactory = (team) => {

  this.team = team;

  const getTeam = () => {
    return team;
  };

  return { getTeam };
};

const game = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const updateBoard = (square, team) => {
    board[square] = team;
    console.log(board)
  };

  return { updateBoard };
})();

const displayController = (() => {
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.innerText != "") return;
      const team = gameController.getTeam();
      gameController.updateRound();
      square.innerText = team;
      game.updateBoard([square.dataset.square], team);
    })
  });
})();

const gameController = (() => {

  const playerX = playerFactory("X");
  const playerO = playerFactory("O");

  let round = 1;

  const getTeam = () => {
    return round % 2 === 0 ? playerO.getTeam() : playerX.getTeam();
  };

  const updateRound = () => {
    round++;
  }

  const winningSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  return { getTeam, updateRound };
})();
