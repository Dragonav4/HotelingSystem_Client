// src/shared/api/http.ts
import axios from 'axios'

export const API_URL = 'http://localhost:5126/api'

export const http = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})