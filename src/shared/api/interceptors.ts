// src/shared/api/interceptors.ts
import { http } from './http'
import { auth } from '../../features/auth/store/authStore'

http.interceptors.request.use(config => {
    const token = auth.getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            auth.signOut();

            const isListPage = ['/', '/desks', '/reservations','/reservations/'].includes(window.location.pathname);
            const isReservationView = /^\/reservations\/[^/]+$/.test(window.location.pathname);
            const isPublicOrView = isListPage || isReservationView
            if (!isPublicOrView) {
                const returnUrl = window.location.origin;
                window.location.href = `http://localhost:5126/api/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`;
            }
        }
        return Promise.reject(error);
    })

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data) {
            const data = error.response.data;

            const serverMessage = data.detail || data.title || data.message;

            if (serverMessage) {
                error.message = serverMessage;
            }
        }

        return Promise.reject(error);
    }
);