import { createCrudModule } from '../../shared/lib/crud/createCrudModule'
import { reservationsApi } from './api/api'
import { queryClient } from '../../app/queryClient'
import { publicRoute } from '../../routes/public'
import { protectedRoute } from '../../routes/protected'
import ReservationCreateView from './views/reservationCreateView'
import ReservationView from './views/reservationView'
import type { Reservation, ReservationCreateDto, ReservationUpdateDto } from './types/types'
import ReservationsListView from './views/reservationsListView'
import ReservationEditView from "./views/reservationEditView";


export const reservationModule = createCrudModule<Reservation, ReservationCreateDto, ReservationUpdateDto>({
    name: 'reservations',
    api: reservationsApi,
    views: {
        List: ReservationsListView,
        View: ReservationView,
        Create: ReservationCreateView,
        Edit: ReservationEditView,
    },
    queryClient,
    parentRoutes: {
        public: publicRoute,
        protected: protectedRoute,
    },
})
