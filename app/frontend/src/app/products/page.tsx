'use client';

import { Products } from '@/services/products';
import { Box, Typography } from '@mui/material';
import ProductList from './components/ProductList';

export default function Products() {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5">Products</Typography>
      <ProductList />
    </Box>
  );
}
