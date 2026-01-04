import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next';
import { Button, Typography, Stack, CircularProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface DeleteEntityButtonProps {
    id: string
    title: string
    mutation: any
    invalidateKey: any[]
    onDeleted: () => void
}

export function DeleteEntityButton({
    id,
    title,
    mutation,
    invalidateKey,
    onDeleted
}: Readonly<DeleteEntityButtonProps>) {
    const [isConfirming, setIsConfirming] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const queryClient = useQueryClient()
    const { t } = useTranslation();

    const { mutate, isPending } = useMutation<unknown, Error, string>({
        ...mutation,
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: [invalidateKey[0], id] })
            onDeleted()
            await queryClient.invalidateQueries({ queryKey: invalidateKey })
        },
        onError: (err: any) => {
            setErrorMessage(err instanceof Error ? err.message : t('common.error'))
        }
    })

    const handleCancel = () => {
        setIsConfirming(false)
        setErrorMessage(null)
    }

    if (isConfirming) {
        return (
            <Stack direction="column" spacing={0.5}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        border: 1,
                        borderColor: 'divider',
                        p: 0.5,
                        borderRadius: 1,
                        bgcolor: 'background.paper'
                    }}
                >
                    <Typography variant="body2" sx={{ color: 'text.secondary', px: 1 }}>
                        {t('common.delete')} {title}?
                    </Typography>

                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                            e.stopPropagation()
                            mutate(id)
                        }}
                        disabled={isPending}
                    >
                        {isPending ? <CircularProgress size={16} color="inherit" /> : t('common.yes')}
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleCancel()
                        }}
                        disabled={isPending}
                    >
                        {t('common.no')}
                    </Button>
                </Stack>

                {errorMessage && (
                    <Typography variant="caption" color="error" sx={{ px: 1 }}>
                        {errorMessage}
                    </Typography>
                )}
            </Stack>
        )
    }

    return (
        <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(e) => {
                e.stopPropagation()
                setIsConfirming(true)
            }}
        >
            {t('common.delete')}
        </Button>
    )
}