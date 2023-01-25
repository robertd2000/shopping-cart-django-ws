import React, { useEffect, useState } from 'react';
import { IOrder, IProduct } from '../types';

export const useCart = (pk: number) => {
  const [products, setProducts] = useState<IOrder[]>([]);

  const ws = new WebSocket('ws://127.0.0.1:8000/ws/socket-server/');

  useEffect(() => {
    ws.onopen = (e) => {
      ws.send(
        JSON.stringify({
          pk,
          action: 'subscribe_to_cart',
          request_id: new Date(),
        })
      );
    };

    ws.onmessage = (e) => {
      try {
        let data = JSON.parse(e.data);
        setProducts(data.cart.items);
        console.log('Data:', data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const addToCart = (id: number, product: IOrder) => {
    ws.send(
      JSON.stringify({
        pk: id,
        action: 'add_product_to_cart',
        request_id: new Date(),
        product,
      })
    );
  };

  const deleteFromCart = (id: number) => {
    ws.send(
      JSON.stringify({
        pk: id,
        action: 'delete_product_from_cart',
        request_id: 4,
        cart_id: id,
      })
    );
  };

  return {
    products,
    addToCart,
    deleteFromCart,
  };
};
