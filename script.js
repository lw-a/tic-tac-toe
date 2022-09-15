const gameBoard = document.getElementById("gameboard");

for (let i = 0; i <= 8; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.dataset.square = i;
  gameBoard.appendChild(square);
}

const playerFactory = (team) => {

  const getTeam = () => {
    return team;
  };

  return { getTeam };
};

const game = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return board;
  };

  const getSquare = (i) => {
    return board[i];
  };

  const updateBoard = (square, team) => {
    board[square] = team;
    console.log(board);
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    };
  };

  return { getBoard, updateBoard, reset, getSquare };
})();

const displayController = (() => {
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.innerText != "") return;
      const team = gameController.getTeam();
      gameController.updateRound();
      game.updateBoard([square.dataset.square], team);
      updateBoard();
      gameController.checkWinner();
    })
  });

  const updateBoard = () => {
    for (i = 0; i < squares.length; i++) {
      squares[i].innerText = game.getSquare(i);
    }
  };

  const restart = document.querySelector(".restart")
  restart.addEventListener("click", () => {
    gameController.reset();
    game.reset();
    updateBoard();
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
  const checkWinner = () => {
    winningSets.forEach((set) => {
        if ( game.getSquare(set[0]) == "X" && game.getSquare(set[1])  == "X" && game.getSquare(set[2]) == "X") {
          console.log("X wins")
        }
    });
  }

  const reset = () => {
    round = 1;
  }

  return { getTeam, updateRound, reset, checkWinner };
})();
