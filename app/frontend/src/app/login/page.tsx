'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/Auth';
import { USER_DATA_KEY, USER_TOKEN_KEY } from '@/constants/auth';
import { UserRole } from '@/@types/user';

export default function SignIn() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>();
  const { login } = useAuth();
  const { setToken, setUser } = React.useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      username: data.get('username') as string,
      password: data.get('password') as string,
    })
      .then((res) => {
        const u = res.data.user;
        localStorage.setItem(USER_TOKEN_KEY, res.data.idToken);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(u));
        setToken(res.data.idToken);
        setUser(u);
        if (u.role === UserRole.BUYER) {
          router.push('/');
        } else if (u.role === UserRole.OWNER) {
          router.push('/dashboard');
        }
      })
      .catch((err) => {
        if (err.response) setErrorMessage(err.response.data.message);
        else setErrorMessage('Something went wrong');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" data-testid="signin-text">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
