// CartPage.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, IconButton, Input, Typography } from '@mui/material';
import { CartResponse, CheckoutItems, useCart } from '@/services/cart';
import { Add, Remove } from '@mui/icons-material';
import { digitDivider } from '@/common/currency';
import CartList from './components/CartList';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const [checkoutItems, setcheckoutItems] = useState<CheckoutItems | null>(
    null,
  );
  const { findAll, checkout, add } = useCart();

  useEffect(() => {
    findAll()
      .then((res) => {
        setCartItems(res.map((item) => ({ ...item, id: item.product.id })));
      })
      .catch((err) => {
        setCartItems([]);
      });
  }, []);

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

  return (
    <div className="w-full px-10" data-testid="cart-component">
      <CartList />
    </div>
  );
};

export default CartPage;
