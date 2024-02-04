'use client';

import { Box, Typography } from '@mui/material';
import ProductList from './components/ProductList';

export default function Products() {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="product-text">Products</Typography>
      <ProductList />
    </Box>
  );
}
