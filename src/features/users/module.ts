import { createCrudModule } from '../../../libs/web-core'
import { usersApi } from './api/api'
import { queryClient } from '../../app/queryClient'
import { publicRoute } from '../../routes/public'
import { protectedRoute } from '../../routes/protected'
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
    queryClient,
    parentRoutes: {
        public: publicRoute,
        protected: protectedRoute,
    },
})
