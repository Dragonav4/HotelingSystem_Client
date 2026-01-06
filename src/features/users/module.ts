import { createCrudModule } from '../../shared/lib/crud/createCrudModule'
import { usersApi } from './api/api'
import {
    UsersListView,
    UserView,
    UserCreateView,
    UserEditView,
} from './views'

export const userModule = createCrudModule({
    name: 'users',
    api: usersApi,
    views: {
        List: UsersListView,
        View: UserView,
        Create: UserCreateView,
        Edit: UserEditView,
    },
})
