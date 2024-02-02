import { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

type SidebarItemProps = {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const SidebarItem: FC<SidebarItemProps> = ({ text, icon, onClick }) => {
  return (
    <ListItem key={text} disablePadding onClick={onClick && onClick}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
