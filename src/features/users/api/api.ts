import { http } from '../../../shared/api'
import type {
    User,
    UserCreateDto,
    UserUpdateDto,
    UserListResponse,
} from '../types/types'

export const usersApi = {
    async getAll(params: { page?: number; size?: number } = {}): Promise<UserListResponse> {
        const { page = 0, size = 10 } = params
        const skip = page * size
        const take = size
        const r = await http.get('/users', { params: { skip, take } })
        return r.data
    },

    async get(id: string): Promise<User> {
        return http.get(`/users/${id}`).then(r => r.data)
    },

    async create(payload: UserCreateDto) {
        const r = await http.post('/users', payload)
        return r.data as UserUpdateDto
    },

    async update(id: string, payload: UserUpdateDto) {
        return http.put(`/users/${id}`, payload).then(r => r.data as UserUpdateDto)
    },

    async delete(id: string) {
        return http.delete(`/users/${id}`).then(r => r.data)
    },
}
