import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Input,
  Button,
} from '@mui/material';
import { CartResponse, CheckoutItems, useCart } from '@/services/cart';
import { Add, Remove } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { digitDivider } from '@/common/currency';

const CartList = () => {
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const [checkoutItems, setcheckoutItems] = useState<CheckoutItems | null>(
    null,
  );
  const { findAll, checkout, add } = useCart();

  useEffect(() => {
    findAll().then((res) => {
      setCartItems(res.map((item) => ({ ...item, id: item.product.id })));
    });
  }, []);
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

  const handleCheckout = () => {
    // remove cart items
    setCartItems([]);
    checkout().then((res) => {
      setcheckoutItems(res.data);
    });
  };

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
    <Container className="mt-8">
      <Typography variant="h5" gutterBottom data-testid="cart-text">
        Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="subtitle1">Your cart is empty.</Typography>
      ) : (
        <List>
          {cartItems.map((item, idx) => (
            <ListItem key={item.product.id} className="mb-4 bg-blue-50">
              <ListItemText
                primary={`${item.product.name} - $${item.product.price}`}
                secondary={`Quantity: ${item.quantity}`}
              />
              <ListItemSecondaryAction>
                <>
                  <IconButton
                    onClick={() => {
                      handleAdd(item.product.id);
                    }}
                    aria-label="decrease"
                    size="small"
                  >
                    <Add />
                  </IconButton>
                  <Input
                    value={cartItems[idx].quantity}
                    onChange={(e) => {
                      // update cart items using idx
                      const c = cartItems;
                      c[idx].quantity = +e.target.value;
                      setCartItems([...c]);
                      updateCart(item.product.id, +e.target.value);
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      handleRemove(item.product.id);
                    }}
                    aria-label="increase"
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                </>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      {!checkoutItems && (
        <div className="flex justify-end mt-5">
          <Button variant="contained" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      )}
      {checkoutItems && (
        <div className="mt-10">
          <DataGrid
            rows={checkoutItems.cart}
            columns={CHECKOUT_COLUMNS}
            pageSizeOptions={[5, 10]}
          />
          <div className="flex justify-end mt-5">
            <Typography variant="h6">
              Total: ${digitDivider(+checkoutItems.total.toFixed(2))}
            </Typography>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CartList;
