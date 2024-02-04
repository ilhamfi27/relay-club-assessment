'use client';

import { User, UserRole } from '@/@types/user';
import { USER_DATA_KEY, USER_TOKEN_KEY } from '@/constants/auth';
import { usePathname, useRouter } from 'next/navigation';
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

type ContextType = {
  user: User | null;
  token: string | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  isUserOwner: () => boolean;
  isUserBuyer: () => boolean;
};

const userData = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(USER_DATA_KEY)
      ? (JSON.parse(localStorage.getItem(USER_DATA_KEY) as string) as User)
      : null;
  }
  return null;
};

const userToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(USER_TOKEN_KEY);
  }
  return null;
};

export const AuthContext = createContext<ContextType>({
  user: userData(),
  token: userToken(),
  setUser: () => null,
  setToken: () => null,
  isUserOwner: () => false,
  isUserBuyer: () => false,
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const ALLOWED_ANON_PATH = ['/', '/login', '/register', '/shop'];

  const isUserOwner = () => user?.role === UserRole.OWNER;
  const isUserBuyer = () => user?.role === UserRole.BUYER;

  useEffect(() => {
    setInterval(() => {
      const ut = userToken();
      const ud = userData();
      if (ut) {
        setToken(userToken);
      }
      if (ud) {
        setUser(ud);
      }
    });
  }, []);

  // simple guard using useEffect
  useEffect(() => {
    if (!user && !ALLOWED_ANON_PATH.includes(pathname)) {
      router.push('/login');
      return;
    }
    if (user && pathname.startsWith('/login')) {
      if (user.role === UserRole.OWNER) {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        isUserOwner,
        isUserBuyer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
