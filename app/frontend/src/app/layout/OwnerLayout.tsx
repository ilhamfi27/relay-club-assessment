'use client';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DiscountIcon from '@mui/icons-material/Discount';
import { FC, PropsWithChildren, ReactNode, useContext, useState } from 'react';
import SidebarItem from '@/components/ListItem/SidebarItem';
import Link from 'next/link';
import { AuthContext } from '@/context/Auth';
import { useRouter } from 'next/navigation';
import { USER_DATA_KEY, USER_TOKEN_KEY } from '@/constants/auth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const OwnerLayout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { token, setToken, setUser, isUserOwner } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    setOpen(false);
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return <Box sx={{ display: 'flex' }}>{children}</Box>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            href={isUserOwner() ? '/dashboard' : '/'}
            onClick={handleDrawerClose}
          >
            <Typography variant="h6" noWrap component="div">
              Home
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {isUserOwner() ? (
            <>
              <Link href={'/dashboard'} onClick={handleDrawerClose}>
                <SidebarItem text="Dashboard" icon={<HomeIcon />} />
              </Link>
              <Link href={'/products'} onClick={handleDrawerClose}>
                <SidebarItem text="Products" icon={<InventoryIcon />} />
              </Link>
              <Link href={'/discount-rules'} onClick={handleDrawerClose}>
                <SidebarItem text="Discount Rules" icon={<DiscountIcon />} />
              </Link>
            </>
          ) : (
            <Link href={'/cart'} onClick={handleDrawerClose}>
              <SidebarItem text="Cart" icon={<ShoppingCartIcon />} />
            </Link>
          )}
          <Divider />
          <SidebarItem
            text="Logout"
            icon={<LogoutIcon />}
            onClick={handleLogout}
          />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default OwnerLayout;
