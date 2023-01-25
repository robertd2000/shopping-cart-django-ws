import React, { memo, useContext } from 'react';
import ProductCard from '../components/Product/ProductCard';
import AuthContext from '../context/authContext';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const { products } = useCart(user.id);

  return (
    <div>
      Cart
      <div className="products">
        {products
          ? products.map((product) => (
              <ProductCard
                key={product.id}
                product={product.product}
                id={product.id}
              />
            ))
          : 'No products'}
      </div>
    </div>
  );
};

export default memo(Cart);
