import { render, screen, fireEvent } from '@testing-library/react';
import PasswordGenerator from './PasswordGenerator';

test('renders password generator component', () => {
  render(<PasswordGenerator />);
  const passwordGeneratorElement = screen.getByText(
    'Week 1: Password Generator'
  );
  expect(passwordGeneratorElement).toBeInTheDocument();
});

test('updates password length state when input value changes', () => {
  render(<PasswordGenerator />);
  const passwordLengthInput = screen.getByLabelText('Password Length');
  fireEvent.change(passwordLengthInput, { target: { value: '10' } });
  expect(passwordLengthInput.value).toBe('10');
});

test('updates include uppercase state when checkbox is clicked', () => {
  render(<PasswordGenerator />);
  const uppercaseCheckbox = screen.getByLabelText('Include Uppercase');
  fireEvent.click(uppercaseCheckbox);
  expect(uppercaseCheckbox.checked).toBe(false);
});

test('updates include lowercase state when checkbox is clicked', () => {
  render(<PasswordGenerator />);
  const lowercaseCheckbox = screen.getByLabelText('Include Lowercase');
  fireEvent.click(lowercaseCheckbox);
  expect(lowercaseCheckbox.checked).toBe(false);
});

test('updates include numbers state when checkbox is clicked', () => {
  render(<PasswordGenerator />);
  const numbersCheckbox = screen.getByLabelText('Include Numbers');
  fireEvent.click(numbersCheckbox);
  expect(numbersCheckbox.checked).toBe(false);
});

test('updates include special characters state when checkbox is clicked', () => {
  render(<PasswordGenerator />);
  const specialCharsCheckbox = screen.getByLabelText(
    'Include Special Characters'
  );
  fireEvent.click(specialCharsCheckbox);
  expect(specialCharsCheckbox.checked).toBe(false);
});

test('generates password when generate password button is clicked', () => {
  render(<PasswordGenerator />);
  const generatePasswordButton = screen.getByText('Generate Password');
  fireEvent.click(generatePasswordButton);
  const generatedPasswordElement = screen.getByLabelText('Generated Password');
  expect(generatedPasswordElement.value).not.toBe('');
});
