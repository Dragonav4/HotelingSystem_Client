import {
    Box,
    Button,
    Container,
    CssBaseline,
    Paper,
    Typography,
    Stack
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../../shared/api/http';

export function LoginForm() {
    const { t } = useTranslation();
    const handleGoogleLogin = () => {
        const returnUrl = window.location.origin;
        window.location.href = `${API_URL}/Auth/login?returnUrl=${encodeURIComponent(returnUrl)}`;
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
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 2
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
                        {t('auth.welcomeBack')}
                    </Typography>

                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
                            onClick={handleGoogleLogin}
                            sx={{
                                py: 1.5,
                                textTransform: 'none',
                                borderColor: '#dadce0',
                                color: 'text.primary',
                                fontSize: '1rem',
                                fontWeight: 500,
                                '&:hover': {
                                    borderColor: '#d2e3fc',
                                    backgroundColor: 'rgba(66, 133, 244, 0.04)',
                                },
                            }}
                        >
                            {t('auth.signInWithGoogle')}
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
}