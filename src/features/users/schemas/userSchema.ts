import { z } from 'zod';

export const userSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string('Invalid email address'),
    role: z.string().min(1, 'Role is required'),
});

export type UserFormData = z.infer<typeof userSchema>;
