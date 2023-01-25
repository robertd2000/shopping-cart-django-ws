import React, { memo, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '../api';
import ProductCard from '../components/Product/ProductCard';
import AuthContext from '../context/authContext';

const Products = () => {
  const { isLoading, error, data } = useQuery('products', async () => {
    return await getProducts();
  });

  return (
    <div>
      Products
      <div className="products">
        {data
          ? data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : 'No products yet'}
      </div>
    </div>
  );
};

export default memo(Products);
