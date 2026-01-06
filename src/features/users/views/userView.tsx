import { Link, useNavigate } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Box, Typography, Stack, Button, Container, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { userModule } from '../module'
import { DeleteEntityButton } from "../../../shared/components/DeleteButton";
import { useAuthStore } from "../../auth/store/authStore";
import { useTranslation } from 'react-i18next'
import { usePermissions } from '../../../shared/hooks/usePermissions'

export default function UserView() {
    const { t } = useTranslation()
    const { id } = userModule.routes.view.useParams()
    const { data: user } = useSuspenseQuery(userModule.queries.getById(id)) as any
    const currentUser = useAuthStore(s => s.user)
    const isAdmin = currentUser?.role === 'Admin'
    const isAuth = !!currentUser

    if (!isAdmin) return null

    const { canEdit, canDelete } = usePermissions(user?.actions)
    const navigate = useNavigate()

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1">
                    {t('user.title')}
                </Typography>

                <Box sx={{ ml: 'auto', display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                        component={Link}
                        to={userModule.routes.list.to}
                        startIcon={<ArrowBackIcon />}
                        variant="text"
                    >
                        {t('common.back')}
                    </Button>

                    {isAuth && canEdit && (
                        <Button
                            component={Link as any}
                            to={userModule.routes.edit.to}
                            params={{ id: user.id }}
                            variant="outlined"
                        >
                            {t('common.edit')}
                        </Button>
                    )}
                    {isAuth && canDelete && (
                        <DeleteEntityButton
                            id={user.id}
                            title={`${t('user.title').toLowerCase()} ${user.username}`}
                            mutation={userModule.queries.delete}
                            invalidateKey={[userModule.id]}
                            onDeleted={() => navigate({ to: userModule.routes.list.to })}
                        />
                    )}
                </Box>
            </Stack>

            <Box sx={{ mt: 2 }}>
                <Row label={t('user.username')} value={user.username} />
                <Divider />
                <Row label={t('user.email')} value={user.email} />
                <Divider />
                <Row label={t('user.role')} value={user.role} />
                <Divider />
                <Row label={t('common.id')} value={user.id} />
            </Box>
        </Container>
    )
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <Stack direction="row" spacing={2} sx={{ py: 2 }}>
            <Typography variant="subtitle1" sx={{ width: 160, fontWeight: 'bold', color: 'text.secondary' }}>
                {label}
            </Typography>
            <Typography variant="body1">
                {value}
            </Typography>
        </Stack>
    )
}
