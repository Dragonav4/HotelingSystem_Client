// src/shared/api/http.ts
import axios from 'axios'
const { VITE_API_URL } = import.meta.env;

export const API_URL = VITE_API_URL

export const http = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})