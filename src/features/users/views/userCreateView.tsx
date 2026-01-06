import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { userModule } from '../module'
import { UserForm } from './forms/UserForm'
import { useAuthStore } from '../../auth/store/authStore'

export default function UserCreateView() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const isAdmin = useAuthStore(s => s.user?.role === 'Admin')

    if (!isAdmin) return null

    const { queries } = userModule

    const { mutate, isPending, error } = useMutation({
        ...queries.create,
        onSuccess: async (result, variables, context) => {
            if (queries.create.onSuccess) {
                await queries.create.onSuccess(result, variables, context)
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
            onSubmit={(data) => mutate(data)}
            onCancel={() => navigate({ to: userModule.routes.list.to })}
        />
    )
}