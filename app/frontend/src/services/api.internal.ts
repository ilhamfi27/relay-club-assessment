import axios from 'axios';

export const useRequest = () => {
  const client = axios.create({
    baseURL: '/svc',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        typeof window !== 'undefined' && localStorage.getItem('userToken')
      }`,
    },
  });
  return { client };
};
