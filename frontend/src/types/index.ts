export interface IProduct {
  barcode: string;
  id: number;
  image: string;
  name: string;
  price: IPrice;
  remaining_stock: number;
  supplier: string;
  type: IType;
  updated_at: string;
}

export interface IType {
  id: number;
  name: string;
  description: string;
}
export interface IPrice {
  currency: string;
  cost: string;
}

export interface IOrder {
  date_added: string;
  id: number;
  is_ordered: boolean;
  product: IProduct;
}
