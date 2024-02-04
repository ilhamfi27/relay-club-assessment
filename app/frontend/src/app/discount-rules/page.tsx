'use client';

import { DiscountRules } from '@/services/discount-rules';
import { Box, Typography } from '@mui/material';
import ProductList from './components/ProductList';

export default function DiscountRules() {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="discount-text">Discount Rules</Typography>
      <ProductList />
    </Box>
  );
}
