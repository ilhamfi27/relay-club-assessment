import { USER_TOKEN_KEY } from '@/constants/auth';
import axios from 'axios';
import { useState } from 'react';

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const client = axios.create({
    baseURL: '/svc',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        typeof window !== 'undefined' && localStorage.getItem(USER_TOKEN_KEY)
      }`,
    },
  });
  client.interceptors.request.use((config) => {
    setLoading(true);
    return config;
  });
  client.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    },
  );
  return { client, loading };
};
