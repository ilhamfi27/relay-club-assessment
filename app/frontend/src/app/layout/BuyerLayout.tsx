import { FC, PropsWithChildren, useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { AuthContext } from '@/context/Auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { USER_DATA_KEY, USER_TOKEN_KEY } from '@/constants/auth';
import { CART_KEY } from '@/constants/cart';

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  cartIcon: {
    marginRight: theme.spacing(2),
  },
}));

const BuyerLayout: FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const { token, setToken, setUser, user } = useContext(AuthContext);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(CART_KEY);

    setToken(null);
    setUser(null);
    setAnchorEl(null);
    router.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className="justify-between">
          <Link href={'/'} className={classes.title}>
            <Typography variant="h6">Relay Club Computer Store</Typography>
          </Link>
          {token ? (
            <div className="flex gap-4">
              <IconButton
                edge="start"
                className={classes.cartIcon}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  if (!token) {
                    router.push('/login');
                  } else {
                    router.push('/cart');
                  }
                }}
              >
                <ShoppingCart />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem style={{ cursor: 'default' }}>{user?.name}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href={'/login'}>
                <Typography>Login</Typography>
              </Link>
              <Link href={'/register'}>
                <Typography>Register</Typography>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default BuyerLayout;
