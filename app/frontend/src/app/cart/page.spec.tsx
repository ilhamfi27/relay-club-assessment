import { render, screen } from '@testing-library/react';
import CartPage from './page';

describe('CartPage component', () => {
  it('renders without crashing', () => {
    render(<CartPage />);
    const elementCart = screen.getByTestId('cart-component');
    expect(elementCart).toBeInTheDocument();

    const elementCartText = screen.getByTestId('cart-text');
    expect(elementCartText).toBeInTheDocument();
  });
});
