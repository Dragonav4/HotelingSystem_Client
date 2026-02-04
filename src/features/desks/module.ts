import { createCrudModule } from '../../../libs/web-core'
import { desksApi } from './api/api'
import { queryClient } from '../../app/queryClient'
import { publicRoute } from '../../routes/public'
import { protectedRoute } from '../../routes/protected'
import {
    DesksListView,
    DeskView,
    DeskCreateView,
    DeskEditView,
} from './views'

export const desksModule = createCrudModule({
    name: 'desks',
    api: desksApi,
    views: {
        List: DesksListView,
        View: DeskView,
        Create: DeskCreateView,
        Edit: DeskEditView,
    },
    queryClient,
    parentRoutes: {
        public: publicRoute,
        protected: protectedRoute,
    },
})
