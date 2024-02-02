import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, PropsWithChildren } from 'react';
import { title } from 'process';

type SimpleDialogProps = PropsWithChildren & {
  open: boolean;
  handleClose: () => void;
  title: string;
  message?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
};

const SimpleDialog: FC<SimpleDialogProps> = ({
  children,
  open,
  title,
  handleClose,
  message,
  maxWidth = 'sm',
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {message && <DialogContentText>{message}</DialogContentText>}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default SimpleDialog;
