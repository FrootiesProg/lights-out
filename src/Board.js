import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    const initialBoard = Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
    );
    return initialBoard;
  }

  function flipCell(y, x, board) {
    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      board[y][x] = !board[y][x];
    }
  }

  function flipCellsAround(coord) {
    const [y, x] = coord.split("-").map(Number);

    const boardCopy = board.map((row) => [...row]);

    flipCell(y, x, boardCopy);
    const adjacentCells = [
      [y, x - 1],
      [y, x + 1],
      [y - 1, x],
      [y + 1, x],
    ];
    for (const [adjY, adjX] of adjacentCells) {
      flipCell(adjY, adjX, boardCopy);
    }

    setBoard(boardCopy);
  }

  function hasWon() {
    return board.every((row) => row.every((cell) => !cell));
  }

  if (hasWon()) {
    return <div className="winner">You won!</div>;
  }

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

  return <div className="Board">{tableBoard}</div>;
}

export default Board;
