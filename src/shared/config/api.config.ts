import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
    input: `http://${import.meta.env.VITE_BACKEND_HOST ?? 'localhost'}:${import.meta.env.VITE_BACKEND_PORT ?? '5126'}/swagger/v1/swagger.json`,
    output: 'src/shared/api/generated',
    plugins: [
        {
            name: '@hey-api/client-axios',
            baseUrl: `http://${import.meta.env.VITE_BACKEND_HOST ?? 'localhost'}:${import.meta.env.VITE_BACKEND_PORT ?? '5126'}`,
        },
        {
            name: 'zod',
        },
        {
            name: '@hey-api/sdk',
            validator: true,
            transformer: true,
        },
        {
            name: '@hey-api/transformers',
            dates: true,
            bigInt: true,
        },
    ],
})