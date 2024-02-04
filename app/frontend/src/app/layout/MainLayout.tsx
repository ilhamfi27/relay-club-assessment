'use client';

import Box from '@mui/material/Box';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { FC, ReactNode, useContext, useState } from 'react';
import { AuthContext } from '@/context/Auth';
import OwnerLayout from './OwnerLayout';
import BuyerLayout from './BuyerLayout';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { token, isUserOwner, isUserBuyer } = useContext(AuthContext);

  if (isUserOwner()) {
    return <OwnerLayout>{children}</OwnerLayout>;
  }

  if (isUserBuyer() || !token) {
    return <BuyerLayout>{children}</BuyerLayout>;
  }
};

export default MainLayout;
