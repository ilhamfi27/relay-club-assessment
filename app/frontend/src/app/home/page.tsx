'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { Products, useProduct } from '@/services/products';

const Home = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const { findAll } = useProduct();

  useEffect(() => {
    findAll().then((res) => {
      setProducts(res.data);
    });
  }, []);

  // const products = [
  //   {
  //     name: 'Quant trident shirts',
  //     price: '$13.99 $20.99',
  //     imageUrl: 'https://via.placeholder.com/300',
  //   },
  //   {
  //     name: 'Quant olap shirts',
  //     price: '$14.99 $21.99',
  //     imageUrl: 'https://via.placeholder.com/300',
  //   },
  //   {
  //     name: 'Quant ruybi shirts',
  //     price: '$17.99 $25.99',
  //     imageUrl: 'https://via.placeholder.com/300',
  //   },
  // ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
