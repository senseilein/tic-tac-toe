import { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleClick = (i) => {
    //if a user has clicked a square that already has a X or and O OR a player has already won, return early
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    //create a copy of the squares array
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  return (
    <>
      <div className="board-row">
        {/* <Square value={squares[0]} onSquareClick={handleClick(0)} />
        Here is why this doesn’t work. The handleClick(0) call will be a part of rendering the board component. Because handleClick(0) alters the state of the board component by calling setSquares, your entire board component will be re-rendered again. But this runs handleClick(0) again, leading to an infinite loop: */}

        {/* Notice the new () => syntax. Here, () => handleClick(0) is an arrow function, which is a shorter way to define functions. When the square is clicked, the code after the => “arrow” will run, calling handleClick(0). */}

        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />

        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

  /**
   The function iterates over each possible winning combination in lines.
For each line, it extracts the three indices (a, b, and c) representing a potential winning line.
It checks if:

    squares[a] is not null (i.e., the square is occupied).
    squares[a] is equal to squares[b] and squares[c], meaning all three squares in the line contain the same player's symbol.

If these conditions are true, it returns squares[a], which is either 'X' or 'O', indicating the winning player.
   */
}

/*
To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent component instead. The parent component can pass that state back down to the children via props. This keeps the child components in sync with each other and with their parent.

------

 Since state is private to a component that defines it, you cannot update the Board’s state directly from Square.

Instead, you’ll pass down a function from the Board component to the Square component, and you’ll have Square call that function when a square is clicked
*/
