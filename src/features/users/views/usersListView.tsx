import { Link, useNavigate } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Container,
    Stack,
    TablePagination
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'

import { userModule } from '../module'
import { useAuthStore } from '../../auth/store/authStore'
import { useTranslation } from 'react-i18next'
import { usePermissions } from '../../../shared/hooks/usePermissions'
import type { ChangeEvent } from "react"

export function UsersListView() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { page, size } = userModule.routes.list.useSearch()
    const { data } = useSuspenseQuery(userModule.queries.getAll({ page, size })) as any

    const user = useAuthStore(s => s.user)
    const isAdmin = user?.role === 'Admin'
    const isAuth = !!user

    if (!isAdmin) return null

    const { items, actions, totalCount } = data
    const { canCreate } = usePermissions(actions)

    const handleChangePage = (_: any, newPage: number) => {
        navigate({ to: ".", search: (prev: any) => ({ ...prev, page: newPage }) })
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        navigate({
            to: '.',
            search: (prev: any) => ({ ...prev, size: Number.parseInt(event.target.value, 10), page: 0 })
        })
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1">
                    {t('user.listTitle')}
                </Typography>

                {isAuth && canCreate && (
                    <Button
                        component={Link}
                        to={userModule.routes.create.to}
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ ml: 'auto' }}
                    >
                        {t('user.createUser')}
                    </Button>
                )}
            </Stack>

            <TableContainer component={Paper} elevation={2}>
                <Table sx={{ minWidth: 650 }} aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>{t('user.username')}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>{t('user.email')}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>{t('user.role')}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">{t('common.options')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items?.map((userItem: any) => (
                            <TableRow
                                key={userItem.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {userItem.username}
                                </TableCell>
                                <TableCell>{userItem.email}</TableCell>
                                <TableCell>{userItem.role}</TableCell>
                                <TableCell align="right">
                                    <Link
                                        to={userModule.routes.view.to}
                                        params={{ id: userItem.id }}
                                        style={{ textDecoration: 'none', marginRight: '8px' }}
                                    >
                                        <Button
                                            variant="outlined"
                                            startIcon={<VisibilityIcon />}
                                            size="small"
                                        >
                                            {t('common.view')}
                                        </Button>
                                    </Link>
                                    {usePermissions(userItem.actions).canEdit && (
                                        <Link
                                            to={userModule.routes.edit.to}
                                            params={{ id: userItem.id }}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Button
                                                variant="outlined"
                                                startIcon={<EditIcon />}
                                                size="small"
                                            >
                                                {t('common.edit')}
                                            </Button>
                                        </Link>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={totalCount || 0}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={size}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Container>
    )
}

export default UsersListView
