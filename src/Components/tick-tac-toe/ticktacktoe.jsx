import React, { useState } from "react";
import "./ticktacktoe.css";
import { Margin } from "@mui/icons-material";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState([]);

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      const line = getWinningLine(newBoard);
      setWinningLine(line);
    } else {
      setWinningLine([]);
    }
  };

  const calculateWinner = (squares) => {
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
  };

  const getWinningLine = (squares) => {
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
        return lines[i];
      }
    }
    return [];
  };

  const checkDraw = (squares) => {
    return squares.every(square => square !== null) && !calculateWinner(squares);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine([]);
  };

  const status = calculateWinner(board)
    ? `Winner: ${calculateWinner(board)}`
    : checkDraw(board)
    ? "It's a draw!"
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {board.map((item, i) => (
          <button
            className={`square ${winningLine.includes(i) ? "winning" : ""}`}
            key={i}
            onClick={() => handleClick(i)}
          >
            {item}
          </button>
        ))}
        {winningLine.length > 0 && <div className="line" style={getLineStyle(winningLine)} />}
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

const getLineStyle = (line) => {
  const styles = {
    position: "absolute",
    backgroundColor: "red",
    zIndex: 1,
  };

  if (line[0] === 0 && line[1] === 1 && line[2] === 2) {
    return { ...styles, width: "52%", height: "5px", top: "42%", left: "24%" }; // Horizontal line
  }
  if (line[0] === 3 && line[1] === 4 && line[2] === 5) {
    return { ...styles, width: "52%", height: "5px", top: "56%", left: "24%" };
  }
  if (line[0] === 6 && line[1] === 7 && line[2] === 8) {
    return { ...styles, width: "52%", height: "5px", top: "70%", left: "24%" };
  }
  if (line[0] === 0 && line[1] === 3 && line[2] === 6) {
    return { ...styles, width: "5px", height: "42%", top: "36%", left: "32%" }; // Vertical line
  }
  if (line[0] === 1 && line[1] === 4 && line[2] === 7) {
    return { ...styles, width: "5px", height: "42%", top: "36%", left: "50%" };
  }
  if (line[0] === 2 && line[1] === 5 && line[2] === 8) {
    return { ...styles, width: "5px", height: "42%", top: "36%", left: "67%" };
  }
  if (line[0] === 0 && line[1] === 4 && line[2] === 8) {
    return { ...styles, width: "80%", height: "5px", top: "30%", left: "18%", transform: "rotate(39deg)", transformOrigin: "1 0" }; // Diagonal line
  }
  if (line[0] === 2 && line[1] === 4 && line[2] === 6) {
    return { ...styles, width: "75%", height: "5px", top: "35%", left: "1%", transform: "rotate(-40deg)", transformOrigin: "100% 0" }; // Diagonal line
  }
  return {};
};

export default TicTacToe;
