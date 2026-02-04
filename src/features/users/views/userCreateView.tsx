import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { userModule } from '../module'
import { UserForm } from './forms/UserForm'
import { useAuthStore } from '../../auth/store/authStore'

export default function UserCreateView() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const isAdmin = useAuthStore(s => s.user?.role === 2)

    if (!isAdmin) return null

    const { queries } = userModule

    const { mutate, isPending, error } = useMutation({
        ...queries.create,
        onSuccess: async (result, variables, context) => {
            if (queries.create.onSuccess) {
                // calls onSuccess with no args as per definition in createCrudQueries
                await (queries.create.onSuccess as any)()
            }
            navigate({ to: userModule.routes.list.to })
        }
    })

    return (
        <UserForm
            title={t('user.createTitle')}
            submitLabel={t('user.createUser')}
            isPending={isPending}
            error={error as Error}
            onSubmit={(data) => {
                mutate({
                    userName: data.username,
                    email: data.email,
                    password: 'ChangeMe123!', // Default password for now
                    // 2 = Admin, 1 = Employee
                    role: data.role === 'Admin' ? 2 : 1
                })
            }}
            onCancel={() => navigate({ to: userModule.routes.list.to })}
        />
    )
}