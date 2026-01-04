import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { http } from '../../../shared/api'

export type User = { id: string; email: string; name?: string; picture?: string | null }

type AuthStore = {
    user: User | null
    accessToken: string | null
    setUser: (user: User | null) => void
    setAccessToken: (token: string | null) => void
    setPicture: (picture: string | null) => void
    signIn: (p: { user: User; accessToken?: string | null }) => void
    signOut: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,

            setUser: (user) => set({ user }),
            setAccessToken: (accessToken) => set({ accessToken }),

            setPicture: (url) => set((state) => ({
                user: state.user ? { ...state.user, picture: url } : null
            })),
            signIn: ({ user, accessToken = null }) => set({ user, accessToken }),
            signOut: () => set({ user: null, accessToken: null }),
        }),
        {
            name: 'auth_state_v1',
            storage: createJSONStorage(() => localStorage),
            partialize: (s) => ({ user: s.user, accessToken: s.accessToken }),
            version: 1,
        },
    ),
)

export const auth = {
    getUser: () => useAuthStore.getState().user,
    isAuthenticated: () => Boolean(useAuthStore.getState().user),
    getAccessToken: () => useAuthStore.getState().accessToken,

    signIn: (p: { user: User; accessToken?: string | null }) => useAuthStore.getState().signIn(p),
    signOut: () => useAuthStore.getState().signOut(),

    fetchCurrentUser: async () => {
        try {
            const response = await http.get<User>('/Auth/me');

            auth.signIn({ user: response.data });
            return response.data;
        } catch (error) {
            auth.signOut();
            return null;
        }
    }
}
