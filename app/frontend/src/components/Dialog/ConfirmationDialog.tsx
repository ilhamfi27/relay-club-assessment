import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type ConfirmationDialogProps = PropsWithChildren & {
  open: boolean;
  title: string;
  message?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  handleClose: () => void;
  handleOk: () => void;
  handleCancel?: () => void;
};

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  children,
  open,
  title,
  message,
  maxWidth = 'sm',
  handleClose,
  handleOk,
  handleCancel,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {message && <DialogContentText>{message}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel ?? handleClose}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
