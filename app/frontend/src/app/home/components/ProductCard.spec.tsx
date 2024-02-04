import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Products } from '@/services/products';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
}));

describe('ProductCard component', () => {
  const mockData: Products = {
    id: 1,
    name: 'Product 1',
    price: 100,
    sku: 'SKU-1',
  };

  it('renders product card correctly', () => {
    render(<ProductCard data={mockData} />);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
    expect(screen.getByTestId('product-title')).toHaveTextContent(mockData.name);
    expect(screen.getByTestId('product-sku')).toHaveTextContent(`SKU: ${mockData.sku}`);
    expect(screen.getByTestId('product-price')).toHaveTextContent(`Price: $${mockData.price}`);
  });
});
