import { render, screen } from '@testing-library/react';
import DiscountRule from './page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
}));

describe('DiscountRule component', () => {
  it('renders without crashing', () => {
    render(<DiscountRule />);
    const elementSignIn = screen.getByTestId('discount-text');
    expect(elementSignIn).toBeInTheDocument();
  });
});
