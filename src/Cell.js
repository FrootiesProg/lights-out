import React from "react";
import "./Cell.css";

function Cell({ isLit, flipCellsAroundMe, coord }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;

  return <td className={classes} onClick={() => flipCellsAroundMe(coord)}></td>;
}

export default Cell;
