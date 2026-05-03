import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders the landing page initially', () => {
    render(<App />);
    expect(screen.getByText(/Navigate the Election Process with/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Start the Guide/i })).toBeDefined();
  });

  it('navigates to the assistant flow when start button is clicked', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /Start the Guide/i });
    fireEvent.click(startButton);
    expect(screen.getByText(/The Basics/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Next/i })).toBeDefined();
  });
});
