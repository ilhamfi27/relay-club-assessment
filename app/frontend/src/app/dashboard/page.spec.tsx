import { render, screen } from '@testing-library/react';
import Dashboard from './page';

describe('Dashboard component', () => {
  it('renders without crashing', () => {
    render(<Dashboard />);
    const elementWelcome = screen.getByTestId('welcome-text');
    expect(elementWelcome).toBeInTheDocument();

    const elementInstruction = screen.getByTestId('instruction-text');
    expect(elementInstruction).toBeInTheDocument();
  });
});
