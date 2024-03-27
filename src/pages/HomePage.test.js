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
    { name: 'Week 1: Password Generator', path: '/week1' },
    { name: 'Week 2: Tic Tac Toe', path: '/week2' },
    { name: 'Week 3: Coming soon', path: '/week3' },
    { name: 'Week 4: Coming soon', path: '/week4' }
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
