import { createRoute } from "@tanstack/react-router";
import { publicRoute } from '../../routes/public'
import { LoginForm } from './views/loginForm'

const loginRoute = createRoute({
    getParentRoute: () => publicRoute,
    path: 'auth/login',
    component: () => LoginForm(),
})

export const authModule = {
    routes: {
        login: loginRoute,
    }
}