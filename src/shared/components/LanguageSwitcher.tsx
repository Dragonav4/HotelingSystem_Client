import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (
        _event: React.MouseEvent<HTMLElement>,
        newLanguage: string | null,
    ) => {
        if (newLanguage !== null) {
            i18n.changeLanguage(newLanguage);
        }
    };

    return (
        <ToggleButtonGroup
            value={i18n.language.split('-')[0]} // Handle cases like 'en-US'
            exclusive
            onChange={handleLanguageChange}
            aria-label="language selector"
            size="small"
            sx={{
                bgcolor: 'background.paper',
                '& .MuiToggleButton-root': {
                    px: 1.5,
                    py: 0.5,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }
            }}
        >
            <ToggleButton value="en" aria-label="english">
                EN
            </ToggleButton>
            <ToggleButton value="pl" aria-label="polish">
                PL
            </ToggleButton>
        </ToggleButtonGroup>
    );
}