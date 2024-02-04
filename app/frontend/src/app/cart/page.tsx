// CartPage.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { CartResponse, CheckoutItems, useCart } from '@/services/cart';

const cartColumns: GridColDef[] = [
  {
    field: 'product.name',
    headerName: 'Product Name',
    width: 200,
    renderCell: (params) => (
      <Typography variant="body1">{params.row.product.name}</Typography>
    ),
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    renderCell: (params) => (
      <img
        src={`https://placehold.co/300x200?font=roboto&text=${params.row.product.name}`}
        alt={params.row.product.name}
        style={{ width: '50px', height: '50px' }}
      />
    ),
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    renderCell: (params) => (
      <Typography variant="body1">${params.row.product.price}</Typography>
    ),
  },
  { field: 'quantity', headerName: 'Quantity', width: 150 },
];

const checkoutColumns: GridColDef[] = [
  {
    field: 'product.name',
    headerName: 'Product Name',
    width: 200,
    renderCell: (params) => (
      <Typography variant="body1">{params.row.name}</Typography>
    ),
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    renderCell: (params) => (
      <img
        src={`https://placehold.co/300x200?font=roboto&text=${params.row.name}`}
        alt={params.row.name}
        style={{ width: '50px', height: '50px' }}
      />
    ),
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    renderCell: (params) => (
      <Typography variant="body1">${params.row.price}</Typography>
    ),
  },
  { field: 'quantity', headerName: 'Quantity', width: 150 },
  {
    field: 'total',
    headerName: 'Total',
    width: 150,
    renderCell: (params) => (
      <Typography variant="body1">
        ${+params.row.price * +params.row.quantity}
      </Typography>
    ),
  },
];

const CartPage = () => {
  const [cartItems, setcartItems] = useState<CartResponse[]>([]);
  const [checkoutItems, setcheckoutItems] = useState<CheckoutItems | null>(
    null,
  );
  const [countTotal, setCountTotal] = useState(0);

  const { findAll, checkout } = useCart();

  useEffect(() => {
    findAll().then((res) => {
      setcartItems(res.data.map((item) => ({ ...item, id: item.product.id })));
    });
  }, []);

  useEffect(() => {
    setCountTotal(
      cartItems.reduce(
        (acc, item) => acc + +item.product.price * +item.quantity,
        0,
      ),
    );
  }, [cartItems]);

  const handleCheckout = () => {
    checkout().then((res) => {
      setcheckoutItems(res.data);
    });
  };

  return (
    <div className="w-full px-10">
      <Typography variant="h5">My Cart</Typography>
      <DataGrid
        rows={cartItems}
        columns={cartColumns}
        pageSizeOptions={[5, 10]}
      />
      <div className="flex justify-end mt-5">
        <Button variant="contained" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
      {checkoutItems && (
        <div className='mt-10'>
          <DataGrid
            rows={checkoutItems.cart}
            columns={checkoutColumns}
            pageSizeOptions={[5, 10]}
          />
          <div className="flex justify-end mt-5">
            <Typography variant="h6">Total: ${checkoutItems.total}</Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
