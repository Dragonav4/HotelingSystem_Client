import { useNavigate } from '@tanstack/react-router'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { userModule } from '../module'
import { UserForm } from './forms/UserForm'
import { useAuthStore } from '../../auth/store/authStore'

export default function UserEditView() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { id } = userModule.routes.edit.useParams()
    const isAdmin = useAuthStore(s => s.user?.role === 'Admin')

    if (!isAdmin) return null

    const { queries } = userModule
    const { data: user } = useSuspenseQuery(queries.getById(id)) as any

    const { mutate, isPending, error: mutationError } = useMutation({
        ...queries.update,
        onSuccess: async (result, variables, context) => {
            if (queries.update.onSuccess) {
                queries.update.onSuccess(result, variables, context)
            }
            navigate({ to: userModule.routes.view.to, params: { id } })
        }
    })

    return (
        <UserForm
            title={t('user.editTitle')}
            submitLabel={t('user.updateUser')}
            initialData={user}
            isPending={isPending}
            error={mutationError instanceof Error ? mutationError : null}
            onSubmit={(data) => mutate({ id, data: { ...data, id, actions: user.actions } })}
            onCancel={() => navigate({ to: userModule.routes.view.to, params: { id } })}
            isEdit
        />
    )
}
