import type { ListResponse } from "../../../shared/lib/crud/types.ts";

export interface UserCreateDto {
    username: string;
    email: string;
    role: string;
}

export interface UserUpdateDto extends UserCreateDto {
    id: string;
    actions: number;
}

export interface User extends UserUpdateDto {
}

export interface UserListResponse extends ListResponse<User> {
}