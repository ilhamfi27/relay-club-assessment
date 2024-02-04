import { useRequest } from './api.internal';

export enum RuleType {
  BUY_X_GET_Y_FREE = 'BUY_X_GET_Y_FREE',
  BULK_PURCHASE_DISCOUNT = 'BULK_PURCHASE_DISCOUNT',
  FREE_PRODUCT = 'FREE_PRODUCT',
}

export interface DiscountRules {
  id: number;
  rule_type: RuleType;
  quantity: number;
  discount_value: number;
  product: Product;
  discount_product: Product;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
}

export const useDiscountRules = () => {
  const { client } = useRequest();
  const findAll = (page = 1, size = 100) => {
    return client.get<DiscountRules[]>(
      `/discount-rules?page=${page}&size${size}`,
    );
  };
  const create = (data: Omit<DiscountRules, 'id'>) => {
    return client.post(`/discount-rules`, data);
  };
  const update = (
    id: number,
    data: Omit<DiscountRules, 'id'>,
  ) => {
    return client.put(`/discount-rules/${id}`, data);
  };
  const remove = (id: number) => {
    return client.delete(`/discount-rules/${id}`);
  };
  return {
    findAll,
    create,
    update,
    remove,
  };
};
