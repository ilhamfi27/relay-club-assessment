import { useRequest } from './api.internal';

export interface Products {
  id: number;
  name: string;
  sku: string;
  price: number;
}

export const useProduct = () => {
  const { client } = useRequest();
  const findAll = (page = 1, size = 100) => {
    return client.get<Products[]>(`/products?page=${page}&size${size}`);
  };
  const create = (data: Omit<Products, 'id'>) => {
    return client.post(`/products`, data);
  };
  const update = (id: number, data: Omit<Products, 'id'>) => {
    return client.put(`/products/${id}`, data);
  };
  const remove = (id: number) => {
    return client.delete(`/products/${id}`);
  };
  return {
    findAll,
    create,
    update,
    remove,
  };
};
