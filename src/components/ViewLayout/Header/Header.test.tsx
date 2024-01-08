import React from "react";
import { render, screen } from "@testing-library/react";
import Header from ".";

describe("<Header />", () => {
  const renderHeader = () => {
    render(<Header />);

    const { getByText } = screen;
    const header = getByText(/React DnD Kanban Board/i);

    return {
      header,
    };
  };

  it("renders the header with the correct text", () => {
    const { header } = renderHeader();
    expect(header).toBeInTheDocument();
  });
});
