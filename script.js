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

const game = {
  board: ["", "", "", "", "", "", "", "", ""]
};


// const displayController = (() => {
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      square.innerText = "X"
    })
  });

// });
