import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

test('renders home page component', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const titleElement = screen.getByText('Forgot The Sem;colon');
  expect(titleElement).toBeInTheDocument();
});

test('renders solution links', () => {
  const solutions = [
    { name: 'Challenge 1: Password Generator', path: '/challenge1' },
    { name: 'Challenge 2: Tic Tac Toe', path: '/challenge2' },
    { name: 'Challenge 3: Weather App', path: '/challenge3' },
    { name: 'Challenge 4: Coming soon', path: '/challenge4' }
  ];
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  solutions.forEach((solution) => {
    const solutionLink = screen.getByText(solution.name);
    expect(solutionLink).toBeInTheDocument();
    expect(solutionLink.parentElement.getAttribute('href')).toBe(solution.path);
  });
});
