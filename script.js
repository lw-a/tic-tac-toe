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

const boardController = (() => {
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
      if (square.innerText != "" || gameController.checkStatus() == true) return;

      gameController.playGame(square);
      updateBoard();

    })
  });

  const updateBoard = () => {
    for (i = 0; i < squares.length; i++) {
      squares[i].innerText = boardController.getSquare(i);
    }
  };

  const restart = document.querySelector(".restart")
  restart.addEventListener("click", () => {
    gameController.reset();
    boardController.reset();
    updateBoard();
  });
})();

const gameController = (() => {

  const playerX = playerFactory("X");
  const playerO = playerFactory("O");

  let round = 1;
  let gameOver = false;

  const playGame = ((square) => {

    const getTeam = () => {
      return round % 2 === 0 ? playerO.getTeam() : playerX.getTeam();
    };

    boardController.updateBoard([square.dataset.square], getTeam());

    const checkWinner = (() => {
      return winningSets.some((combination) => {
        return combination.every((index) => {
          return boardController.getSquare(index) == getTeam();
        });
      });
    });

    console.log(checkWinner());

    if (checkWinner() == true) gameOver = true;

    round++;
  })

  const winningSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


  const reset = () => {
    round = 1;
    gameOver = false;
  }

  const checkStatus = () => {
    return gameOver;
  }

  return { reset, checkStatus, playGame };
})();
