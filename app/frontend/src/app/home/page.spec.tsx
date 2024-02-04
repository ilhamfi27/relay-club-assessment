import { render, screen, cleanup } from '@testing-library/react';
import Home from './page';

const mockGetAxios = jest.fn();

jest.mock('axios', () => ({
  create: jest.fn().mockImplementation(() => ({
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: mockGetAxios,
  })),
}));

afterEach(cleanup);

describe('Home component', () => {
  it('renders without crashing', () => {
    mockGetAxios.mockResolvedValue({
      data: [
        { id: 1, name: 'product1', price: 100, sku: 'sku1' },
        { id: 2, name: 'product2', price: 200, sku: 'sku2' },
      ],
    });
    render(<Home />);
    const element = screen.getByTestId('homepage');
    expect(element).toBeInTheDocument();
  });
});
