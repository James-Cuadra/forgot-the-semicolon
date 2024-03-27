import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';
import { BrowserRouter } from 'react-router-dom';

test('renders TicTacToe component', () => {
  render(
    <BrowserRouter>
      <TicTacToe />
    </BrowserRouter>
  );

  // Test initial state
  const currentPlayerElement = screen.getByText(/Next player: X/i);
  expect(currentPlayerElement).toBeInTheDocument();

  const resetButton = screen.getByRole('button', { name: /Reset/i });
  expect(resetButton).toBeInTheDocument();

  const backButton = screen.getByRole('link', { name: /Back to Homepage/i });
  expect(backButton).toBeInTheDocument();

  // Test clicking on squares
  const square0 = screen.getByTestId('square-0');
  fireEvent.click(square0);
  expect(square0).toHaveTextContent('X');

  const square1 = screen.getByTestId('square-1');
  fireEvent.click(square1);
  expect(square1).toHaveTextContent('O');

  // Test winning condition
  const square3 = screen.getByTestId('square-3');
  fireEvent.click(square3);
  expect(square3).toHaveTextContent('X');

  const square4 = screen.getByTestId('square-4');
  fireEvent.click(square4);
  expect(square4).toHaveTextContent('O');

  const square6 = screen.getByTestId('square-6');
  fireEvent.click(square6);
  expect(square6).toHaveTextContent('X');

  const winnerElement = screen.getByText(/Winner: X/i);
  expect(winnerElement).toBeInTheDocument();

  // Test reset button
  fireEvent.click(resetButton);
  expect(square0).toHaveTextContent('');
  expect(square1).toHaveTextContent('');
  expect(square3).toHaveTextContent('');
  expect(square4).toHaveTextContent('');
  expect(square6).toHaveTextContent('');
  expect(winnerElement).not.toHaveTextContent(/Winner: X/i);
});
