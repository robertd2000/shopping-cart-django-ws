import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Products from '../pages/Products';
import SignUp from '../pages/SignUp';

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export enum RouteNames {
  PRODUCTS = '/',
  CART = '/cart',
  LOGIN = '/login',
  SIGN_UP = '/sign-up',
}

export const routes = [
  { path: RouteNames.PRODUCTS, element: Products },
  { path: RouteNames.CART, element: Cart },
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.SIGN_UP, element: SignUp },
];
