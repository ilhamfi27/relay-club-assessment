'use client';
import { AuthContext } from '@/context/Auth';
import { useAuth } from '@/services/auth';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Home() {
  const { getProfile } = useAuth();
  const { token, setUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      getProfile().catch((res) => {
        router.push('/login');
      });
    } else {
      getProfile().then((res) => {
        setUser(res.data);
      });
    }
  }, []);
  return <Typography paragraph>Welcome To Relay Club Assessment</Typography>;
}
