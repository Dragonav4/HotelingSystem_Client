import { Outlet, createRoute } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'

export const publicRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'public',
    path: '',
    component: PublicLayout,
})

function PublicLayout() {
    return (
        <>
            <Outlet />
        </>
    )
}
