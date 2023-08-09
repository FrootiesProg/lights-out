import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from "./Board";

test("renders the starter board", () => {
  const { asFragment } = render(
    <Board nrows={5} ncols={5} chanceLightStartsOn={0.25} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("handles cell-clicking", () => {
  render(<Board nrows={5} ncols={5} chanceLightStartsOn={0.25} />);

  const firstCell = screen.getByTestId("cell-0-0");
  userEvent.click(firstCell);

  // Verify that the clicked cell and its neighbors have flipped
  expect(firstCell).toHaveClass("Cell-lit");
  //  Check other cells as needed
});

test("displays 'You won!' message on win", () => {
  const winBoard = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  render(<Board nrows={3} ncols={3} chanceLightStartsOn={0.25} />);
  // Override the board state with a winning configuration
  jest.spyOn(Board.prototype, "createBoard").mockReturnValue(winBoard);

  // Verify that the "You won!" message is displayed
  expect(screen.getByText("You won!")).toBeInTheDocument();
});
