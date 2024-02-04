import { render, screen } from '@testing-library/react';
import SignUp from './page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
}));

describe('SignUp component', () => {
  it('renders without crashing', () => {
    render(<SignUp />);
    const elementSignIn = screen.getByTestId('signup-text');
    expect(elementSignIn).toBeInTheDocument();
  });
});
