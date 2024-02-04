import { render, screen } from '@testing-library/react';
import SignIn from './page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
}));

describe('SignIn component', () => {
  it('renders without crashing', () => {
    render(<SignIn />);
    const elementSignIn = screen.getByTestId('signin-text');
    expect(elementSignIn).toBeInTheDocument();
  });
});
