import React, { FC, memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import { useCart } from '../../hooks/useCart';
import { IPrice, IProduct } from '../../types';
import styles from './ProductCard.module.css';

interface IProps {
  product: IProduct;
  id?: number;
}

const ProductCard: FC<IProps> = ({ product, id }) => {
  const { user } = useContext(AuthContext);

  const { addToCart, deleteFromCart } = useCart(user.id);

  const handleAdd = () => {
    let data = {
      is_ordered: false,
      id: product.id,
      product,
      date_added: new Date().toLocaleString(),
    };

    addToCart(user.id, data);
  };

  return (
    <div className={styles.card}>
      <img src={'http://127.0.0.1:8000' + product.image} alt="image" />
      <div className={styles['card-body']}>
        <div className={styles.row}>
          <h4>{product.name}</h4>
          <h3>
            {product.price.cost} {product.price.currency}
          </h3>
        </div>
        <div className={styles['view-btn']}>
          <Link to={'/'}>View Details</Link>
        </div>
      </div>

      <div className={styles['btn-group']}>
        {id ? (
          <span onClick={() => deleteFromCart(id)}>Delete</span>
        ) : (
          <div className={styles.btn} onClick={handleAdd}>
            Buy Now
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductCard);
