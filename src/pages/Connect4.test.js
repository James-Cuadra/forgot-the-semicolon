import { render, screen, fireEvent } from '@testing-library/react';
import Connect4 from './Connect4';
import { BrowserRouter } from 'react-router-dom';

test('renders Connect4 component', () => {
  render(
    <BrowserRouter>
      <Connect4 />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Week 4: Connect 4');
  expect(titleElement).toBeInTheDocument();
});

test('allows players to make moves', () => {
  render(
    <BrowserRouter>
      <Connect4 />
    </BrowserRouter>
  );
  const column0 = screen.getByTestId('column-0');
  fireEvent.click(column0);
  const cell0 = screen.getByTestId('cell-0-0');
  expect(cell0).toHaveClass('Red');
  const column1 = screen.getByTestId('column-1');
  cell1 = screen.getByTestId('cell-0-1');
  expect(cell1).toHaveTextContent('Yellow');
});

test('displays winner message and allows to play again', () => {
  render(
    <BrowserRouter>
      <Connect4 />
    </BrowserRouter>
  );
  const column0 = screen.getByTestId('column-0');
  fireEvent.click(column0);
  const column1 = screen.getByTestId('column-1');
  fireEvent.click(column1);
  fireEvent.click(column0);
  fireEvent.click(column1);
  fireEvent.click(column0);
  fireEvent.click(column1);
  fireEvent.click(column0);
  expect(screen.getByText('Red Wins!')).toBeInTheDocument();
  const playAgainButton = screen.getByText('Play Again');
  fireEvent.click(playAgainButton);
  expect(screen.queryByText('Red Wins!')).not.toBeInTheDocument();
});
