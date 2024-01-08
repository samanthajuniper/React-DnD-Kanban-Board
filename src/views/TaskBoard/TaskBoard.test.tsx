import { render, screen } from '@testing-library/react';
import TaskBoard from '.';

describe('<TaskBoard />', () => {
  const renderTaskBoard = () => {
    render(<TaskBoard />);

    const { getByText } = screen;
    const todoColumn = getByText(/To do/i);
    const inProgressColumn = getByText(/In progress/i);
    const doneColumn = getByText(/Done/i);

    return {
      todoColumn,
      inProgressColumn,
      doneColumn,
    };
  };

  it('renders todo, inProgress, and done columns', () => {
    const { todoColumn, inProgressColumn, doneColumn } = renderTaskBoard();

    expect(todoColumn).toBeInTheDocument();
    expect(inProgressColumn).toBeInTheDocument();
    expect(doneColumn).toBeInTheDocument();
  });
});
