import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Button, Avatar, styled, type AppBarProps as MuiAppBarProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { useColorMode } from '../../app/ThemeContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { authModule } from '../../features/auth';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

interface HeaderProps {
    open: boolean;
    onOpenDrawer: () => void;
    user: any;
    onProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Header({ open, onOpenDrawer, user, onProfileMenuOpen }: HeaderProps) {
    const { t } = useTranslation();
    const { mode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onOpenDrawer}
                    edge="start"
                    sx={[{ mr: 2 }, open && { display: 'none' }]}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    {t('layout.appTitle')}
                </Typography>

                <LanguageSwitcher />

                {!user && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate({ to: authModule.routes.login.fullPath })}
                        sx={{ ml: 2 }}
                    >
                        {t('common.login')}
                    </Button>
                )}

                <IconButton onClick={toggleColorMode} color="inherit" sx={{ ml: 1 }}>
                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>

                {user && (
                    <IconButton onClick={onProfileMenuOpen} sx={{ p: 0, ml: 2 }}>
                        <Avatar alt={user.name ?? user.email} src={user.picture ?? undefined} />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
}
