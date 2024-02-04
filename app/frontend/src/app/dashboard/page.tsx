'use client';
import Typography from '@mui/material/Typography';
import ProductList from '../products/components/ProductList';

export default function Dashboard() {
  return (
    <>
      <div className='shadow-md p-4 mb-10'>
        <Typography variant='h5' data-testid="welcome-text">
          Welcome to the dashboard! This dashboard is the entrypoint for admin
          pages.
        </Typography>
        <Typography variant='body1' data-testid="instruction-text">
          There are page for managing products, and discounts.
        </Typography>
      </div>
      <div className='shadow-md p-4'>
        <Typography variant="h5" data-testid="product-text">
          Products
        </Typography>
        <ProductList />
      </div>
    </>
  );
}
