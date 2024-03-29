import { useContext } from 'react';
import { useRequest } from './api.internal';
import { Products } from './products';
import { AuthContext } from '@/context/Auth';
import { CART_KEY } from '@/constants/cart';

export interface CartRequest {
  product_id: number;
  quantity: number;
}

export interface CartResponse {
  quantity: number;
  product: Products;
}

// Generated by https://quicktype.io

export interface CheckoutItems {
  cart: CartItem[];
  total: number;
}

export interface CartItem extends Products {
  quantity: number;
}

export const useCart = () => {
  const { client } = useRequest();
  const { token } = useContext(AuthContext);

  const storeCartToLocalStorage = (cart: CartRequest) => {
    if (!token) {
      return;
    }
    // add quantity to the same product in local storage
    const cartInLocalStorage = localStorage.getItem(CART_KEY);
    if (cartInLocalStorage) {
      const parsedCart = JSON.parse(cartInLocalStorage) as CartRequest[];
      const index = parsedCart.findIndex(
        (item) => item.product_id === cart.product_id,
      );
      if (index !== -1) {
        parsedCart[index].quantity = cart.quantity;
      } else {
        parsedCart.push(cart);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(parsedCart));
    } else {
      localStorage.setItem(CART_KEY, JSON.stringify([cart]));
    }
    const latestCart = JSON.parse(
      localStorage.getItem(CART_KEY) ?? '[]',
    ) as CartRequest[];
    return latestCart.find((item) => item.product_id === cart.product_id);
  };

  const getCartFromLocalStorage = (product_id: number) => {
    const cartInLocalStorage = localStorage.getItem(CART_KEY);
    if (cartInLocalStorage) {
      const parsedCart = JSON.parse(cartInLocalStorage) as CartRequest[];
      return parsedCart.find((item) => item.product_id === product_id);
    }
  };

  const findAll = async (page = 1, size = 100) => {
    const { data } = await client.get<CartResponse[]>(
      `/carts?page=${page}&size${size}`,
    );
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(
        data.map((item) => {
          return {
            product_id: item.product.id,
            quantity: item.quantity,
          };
        }),
      ),
    );
    return data;
  };
  const add = (data: CartRequest, replace = false) => {
    const cartInLocalStorage = getCartFromLocalStorage(data.product_id);
    if (!replace && cartInLocalStorage) {
      data.quantity += cartInLocalStorage.quantity;
    }
    const localCart = storeCartToLocalStorage(data);
    return client.put(`/carts/products`, localCart);
  };
  const checkout = () => {
    localStorage.removeItem(CART_KEY);
    return client.get<CheckoutItems>(`/carts/checkout`);
  };
  return { add, findAll, checkout };
};
