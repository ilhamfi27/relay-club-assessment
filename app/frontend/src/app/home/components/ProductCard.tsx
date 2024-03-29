'use client';

import React, { FC } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import 'tailwindcss/tailwind.css';
import { Products } from '@/services/products';
import { CartRequest, useCart } from '@/services/cart';
import Swal from 'sweetalert2';
import Toast from '@/components/Toast';
import { useRouter } from 'next/navigation';

type ProductCardProps = {
  data: Products;
};

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  const { id, name, price, sku } = data;
  const router = useRouter();

  const { add } = useCart();

  const handlerAddToCart = (data: CartRequest) => {
    add(data)
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product added to cart',
        });
      })
      .catch((error) => {
        // if error is 401, redirect to login
        if (error.response.status === 401) {
          router.push('/login');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      });
  };

  return (
    <Card
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
      data-testid="product-card"
    >
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={`https://placehold.co/600x400?font=roboto&text=${name}`}
        alt={name}
      />
      <CardContent className="p-4">
        <Typography
          variant="h6"
          className="font-bold mb-2"
          data-testid="product-title"
        >
          {name}
        </Typography>
        <div className="flex justify-between items-center">
          <div className="">
            <Typography
              variant="body2"
              className="text-gray-600"
              data-testid="product-sku"
            >
              SKU: {sku}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-600"
              data-testid="product-price"
            >
              Price: ${price}
            </Typography>
          </div>
          <Button
            variant="contained"
            className="text-white px-4 py-2 rounded-lg"
            onClick={() => {
              handlerAddToCart({
                product_id: id,
                quantity: 1,
              });
            }}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
