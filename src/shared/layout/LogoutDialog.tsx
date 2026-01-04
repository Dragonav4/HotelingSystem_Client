import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LogoutDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function LogoutDialog({ open, onClose, onConfirm }: LogoutDialogProps) {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('auth.confirmLogout')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t('auth.areYouSureLogout')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t('common.cancel')}</Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    {t('common.logout')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
