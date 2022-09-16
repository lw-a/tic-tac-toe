// Adds game board to the DOM

const gameBoard = document.getElementById("gameboard");

for (let i = 0; i <= 8; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.dataset.square = i;
  gameBoard.appendChild(square);
}

// Player Factory

const playerFactory = (team) => {

  const getTeam = () => {
    return team;
  };

  return { getTeam };
};

// Board Controller

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
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    };
  };

  return { getBoard, updateBoard, reset, getSquare };
})();

// Display Controller

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

  const message = document.querySelector(".message");

  const setMessage = (() => {
      message.innerText = `Player ${gameController.getTeam()}'s turn`
  });
  const endMessage = ((result) => {
    if (result == "draw") {
      message.innerText = "It's a draw!"
    } else {
      message.innerText = `Player ${result} wins!`
    }
  })

  const restart = document.querySelector(".restart")
  restart.addEventListener("click", () => {
    gameController.reset();
    boardController.reset();
    setMessage();
    updateBoard();
  });

  return { setMessage, endMessage };
})();

// Game Controller

const gameController = (() => {

  const playerX = playerFactory("X");
  const playerO = playerFactory("O");

  let round = 1;
  let gameOver = false;

  const getTeam = () => {
    return round % 2 === 0 ? playerO.getTeam() : playerX.getTeam();
  };

  const playGame = ((square) => {

    boardController.updateBoard([square.dataset.square], getTeam());

    const winningSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const checkWinner = (() => {
      return winningSets.some((combination) => {
        return combination.every((index) => {
          // called index as its used as an index in boardController.getSquare
          return boardController.getSquare(index) == getTeam();
        });
      });
    });

    if (checkWinner() == true) {
      gameOver = true;
      displayController.endMessage(getTeam())
    } else if (round == 9) {
      gameOver = true;
      displayController.endMessage("draw")
    } else {
      round++;
      displayController.setMessage();
    };

  })

  const reset = () => {
    round = 1;
    gameOver = false;
  }

  const checkStatus = () => {
    return gameOver;
  }

  return { reset, checkStatus, playGame, getTeam };
})();
