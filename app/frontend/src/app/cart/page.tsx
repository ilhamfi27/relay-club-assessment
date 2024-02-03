// CartPage.jsx
'use client';

import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Product Name', width: 200 },
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    renderCell: (params) => (
      <img
        src={params.value}
        alt={params.row.name}
        style={{ width: '50px', height: '50px' }}
      />
    ),
  },
  { field: 'quantity', headerName: 'Quantity', width: 150 },
];

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://via.placeholder.com/150',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://via.placeholder.com/150',
      quantity: 1,
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
    <Typography variant="h5">My Cart</Typography>
      <DataGrid rows={cartItems} columns={columns} pageSizeOptions={[5, 10]} />
    </div>
  );
};

export default CartPage;
