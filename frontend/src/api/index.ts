import { IProduct } from '../types';

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch('http://127.0.0.1:8000/api/v1/');
  const data = await response.json();

  return data;
};
