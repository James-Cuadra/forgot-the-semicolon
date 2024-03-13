import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Woops from './Woops';

test('renders Woops component', () => {
  render(
    <BrowserRouter>
      <Woops />
    </BrowserRouter>
  );

  const titleElement = screen.getByText("Woops, you're lost!");
  expect(titleElement).toBeInTheDocument();

  const backButtonElement = screen.getByRole('link', {
    name: 'Back to Homepage'
  });
  expect(backButtonElement).toBeInTheDocument();
  expect(backButtonElement.getAttribute('href')).toBe('/');
});
