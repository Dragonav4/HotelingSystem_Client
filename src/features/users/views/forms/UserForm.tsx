import { useEffect } from 'react'
import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    MenuItem,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, type UserFormData } from '../../schemas/userSchema'

interface UserFormProps {
    title: string
    submitLabel: string
    initialData?: UserFormData
    isPending: boolean
    error: Error | null
    onSubmit: (data: UserFormData) => void
    onCancel: () => void
    isEdit?: boolean
}

export function UserForm({
    title,
    submitLabel,
    initialData,
    isPending,
    error,
    onSubmit,
    onCancel,
    isEdit = false
}: Readonly<UserFormProps>) {
    const { t } = useTranslation()

    const {
        register, handleSubmit,
        control, reset,
        formState: { errors } } = useForm<UserFormData>({
            resolver: zodResolver(userSchema),
            defaultValues: initialData || {
                username: '',
                email: '',
                role: 'Guest',
            }
        })

    useEffect(() => {
        if (initialData) {
            reset(initialData)
        }
    }, [initialData, reset])

    return (
        <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {title}
                </Typography>

                <form onSubmit={handleSubmit((data) => onSubmit(data))} noValidate>
                    <Stack spacing={3} sx={{ mt: 3 }}>
                        <TextField
                            label={t('user.username')}
                            {...register('username')}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            required
                            fullWidth
                        />

                        <TextField
                            label={t('user.email')}
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            required
                            fullWidth
                            disabled={isEdit} // Users can't change email
                        />

                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label={t('user.role')}
                                    error={!!errors.role}
                                    helperText={errors.role?.message}
                                    required
                                    fullWidth
                                >
                                    <MenuItem value="Employee">Employee</MenuItem>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                </TextField>
                            )}
                        />

                        {error && (
                            <Typography color="error" variant="body2">
                                {error.message || t('common.error')}
                            </Typography>
                        )}

                        <Stack direction="row" spacing={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isPending}
                                fullWidth
                            >
                                {isPending ? t('common.saving') : submitLabel}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={onCancel}
                                disabled={isPending}
                                fullWidth
                            >
                                {t('common.cancel')}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </Box>
    )
}
