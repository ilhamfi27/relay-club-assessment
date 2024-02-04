import { render, screen } from '@testing-library/react';
import Products from './page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
}));

describe('Products component', () => {
  it('renders without crashing', () => {
    render(<Products />);
    const elementSignIn = screen.getByTestId('product-text');
    expect(elementSignIn).toBeInTheDocument();
  });
});
