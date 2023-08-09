// Import necessary dependencies
import React, { useState } from "react";
import Cell from "./Cell"; // Import the Cell component
import "./Board.css"; // Import the Board CSS styles

// Define the Board component
function Board({ nrows, ncols, chanceLightStartsOn }) {
  // Use the useState hook to manage the board state
  const [board, setBoard] = useState(createBoard());

  // Function to create the initial game board
  function createBoard() {
    const initialBoard = Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
    );
    return initialBoard;
  }

  // Function to flip cells around a given coordinate
  function flipCellsAround(coord) {
    // Extract row and column from the coordinate
    const [y, x] = coord.split("-").map(Number);

    // Create a copy of the board to modify
    const boardCopy = board.map((row) => [...row]);

    // Function to flip a cell's state
    flipCell(y, x, boardCopy);

    // Define the adjacent cells
    const adjacentCells = [
      [y, x - 1],
      [y, x + 1],
      [y - 1, x],
      [y + 1, x],
    ];

    // Flip adjacent cells
    for (const [adjY, adjX] of adjacentCells) {
      flipCell(adjY, adjX, boardCopy);
    }

    // Update the board state with the modified copy
    setBoard(boardCopy);
  }

  // Function to flip the state of a cell
  function flipCell(y, x, board) {
    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      board[y][x] = !board[y][x];
    }
  }

  // Function to check if the player has won
  function hasWon() {
    return board.every((row) => row.every((cell) => !cell));
  }

  // Render "You won!" message if the player has won
  if (hasWon()) {
    return <div className="winner">You won!</div>;
  }

  // Render the game board
  let tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(
      <tr key={y} className="board-row">
        {row}
      </tr>
    );
  }

  // Return the rendered game board
  return <div className="Board">{tableBoard}</div>;
}

// Export the Board component as the default export
export default Board;
