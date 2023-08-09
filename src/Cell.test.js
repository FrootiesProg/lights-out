import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

test("renders a cell properly", () => {
  const { container } = render(<Cell isLit={true} onClick={() => {}} />);
  expect(container.firstChild).toHaveClass("Cell Cell-lit");
});
