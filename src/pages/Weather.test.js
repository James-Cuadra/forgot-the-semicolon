import { render, screen, fireEvent } from '@testing-library/react';
import Weather from './Weather';
import { BrowserRouter } from 'react-router-dom';

test('renders Weather component', () => {
  render(
    <BrowserRouter>
      <Weather />
    </BrowserRouter>
  );

  // Check if the reset location button is displayed
  const resetButtonElement = screen.getByRole('button', {
    name: 'Reset Location'
  });
  expect(resetButtonElement).toBeInTheDocument();

  // Check if the fetch weather data button is displayed
  const fetchButtonElement = screen.getByRole('button', {
    name: 'Fetch Weather Data'
  });
  expect(fetchButtonElement).toBeInTheDocument();
});

test('fetches weather data and displays it', async () => {
  render(
    <BrowserRouter>
      <Weather />
    </BrowserRouter>
  );

  // Mock the fetchWeatherByCoords function
  const mockFetchWeatherByCoords = jest.fn();
  mockFetchWeatherByCoords.mockResolvedValueOnce({
    days: [
      {
        temp: 75,
        conditions: 'Sunny',
        icon: 'sunny'
      }
    ]
  });

  // Replace the original fetchWeatherByCoords function with the mock
  Weather.prototype.fetchWeatherByCoords = mockFetchWeatherByCoords;

  // Click the fetch weather data button
  const fetchButtonElement = screen.getByRole('button', {
    name: 'Fetch Weather Data'
  });
  fireEvent.click(fetchButtonElement);

  // Wait for the weather data to be fetched and displayed
  const weatherElement = await screen.findByText('75°F');
  expect(weatherElement).toBeInTheDocument();
});
