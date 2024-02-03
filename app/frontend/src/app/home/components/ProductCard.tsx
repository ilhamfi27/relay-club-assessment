'use client';

import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import 'tailwindcss/tailwind.css';
import { Products } from '@/services/products';

type ProductCardProps = {
  data: Products;
};

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  const { name, price, sku } = data;

  return (
    <Card className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={`https://placehold.co/600x400?font=roboto&text=${name}`}
        alt={name}
      />
      <CardContent className="p-4">
        <Typography variant="h6" className="font-bold mb-2">
          {name}
        </Typography>
        <div className="flex justify-between items-center">
          <div className="">
            <Typography variant="body2" className="text-gray-600">
              SKU: {sku}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Price: {price}
            </Typography>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
