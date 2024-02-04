// CartPage.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, IconButton, Input, Typography } from '@mui/material';
import { CartResponse, CheckoutItems, useCart } from '@/services/cart';
import { Add, Remove } from '@mui/icons-material';
import { digitDivider } from '@/common/currency';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const [checkoutItems, setcheckoutItems] = useState<CheckoutItems | null>(
    null,
  );
  const [countTotal, setCountTotal] = useState(0);

  const { findAll, checkout, add } = useCart();

  useEffect(() => {
    findAll().then((res) => {
      setCartItems(res.map((item) => ({ ...item, id: item.product.id })));
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
    // remove cart items
    setCartItems([]);
    checkout().then((res) => {
      setcheckoutItems(res.data);
    });
  };

  const updateCart = (id: number, quantity: number) => {
    add(
      {
        product_id: id,
        quantity,
      },
      true,
    );
  };

  const handleAdd = (id: number) => {
    const item = cartItems.find((item) => item.product.id === id);
    if (item) {
      item.quantity += 1;
      setCartItems([...cartItems]);
      updateCart(id, item.quantity);
    }
  };

  const handleRemove = (id: number) => {
    const item = cartItems.find((item) => item.product.id === id);
    if (item) {
      item.quantity -= 1;
      setCartItems([...cartItems]);
      updateCart(id, item.quantity);
    }
  };

  const CART_COLUMNS: GridColDef[] = [
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
        <Typography variant="body1">
          ${digitDivider(params.row.product.price)}
        </Typography>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
      renderCell: (param) => (
        <>
          <IconButton
            onClick={() => {
              handleAdd(param.row.product.id);
            }}
            aria-label="decrease"
            size="small"
          >
            <Add />
          </IconButton>
          <Input
            value={
              cartItems.find((item) => item.product.id === param.row.product.id)
                ?.quantity
            }
            onChange={(e) => {
              setCartItems(
                cartItems.map((item) => {
                  if (item.product.id === param.row.product.id) {
                    item.quantity = +e.target.value;
                  }
                  return item;
                }),
              );
              updateCart(param.row.product.id, +e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              handleRemove(param.row.product.id);
            }}
            aria-label="increase"
            size="small"
          >
            <Remove />
          </IconButton>
        </>
      ),
    },
  ];

  const CHECKOUT_COLUMNS: GridColDef[] = [
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
        <Typography variant="body1">
          ${digitDivider(params.row.price)}
        </Typography>
      ),
    },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body1">
          $
          {digitDivider(+(+params.row.price * +params.row.quantity).toFixed(2))}
        </Typography>
      ),
    },
  ];

  return (
    <div className="w-full px-10">
      <Typography variant="h5">My Cart</Typography>
      <DataGrid
        rows={cartItems}
        columns={CART_COLUMNS}
        pageSizeOptions={[5, 10]}
      />
      <div className="flex justify-end mt-5">
        <Button variant="contained" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
      {checkoutItems && (
        <div className="mt-10">
          <DataGrid
            rows={checkoutItems.cart}
            columns={CHECKOUT_COLUMNS}
            pageSizeOptions={[5, 10]}
          />
          <div className="flex justify-end mt-5">
            <Typography variant="h6">
              Total: ${digitDivider(checkoutItems.total)}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
