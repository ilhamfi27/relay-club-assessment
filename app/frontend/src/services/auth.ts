import { UserLogin, UserType } from '@/@types/user';
import { useRequest } from './api.internal';

export const useAuth = () => {
  const { client } = useRequest();
  const login = ({ username, password }: UserLogin) => {
    return client.post('/login', { username, password });
  };
  const register = ({ name, username, password }: UserType) => {
    return client.post('/users', { name, username, password });
  };
  const getProfile = () => {
    return client.get('/users/me');
  };
  return {
    getProfile,
    login,
    register,
  };
};
