import { USER_TOKEN_KEY } from '@/constants/auth';
import axios from 'axios';

export const useRequest = () => {
  const client = axios.create({
    baseURL: '/svc',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        typeof window !== 'undefined' && localStorage.getItem(USER_TOKEN_KEY)
      }`,
    },
  });
  return { client };
};
