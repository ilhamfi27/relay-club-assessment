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
