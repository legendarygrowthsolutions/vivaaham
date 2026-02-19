
import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().optional(),
    brideName: z.string().min(1, 'Bride name is required'),
    groomName: z.string().min(1, 'Groom name is required'),
    weddingDate: z.string().optional(),
    plan: z.string().default('mangal'),
})

// Schema for just the wedding details part (separate from auth)
export const setupSchema = z.object({
    brideName: z.string().min(1, 'Bride name is required'),
    groomName: z.string().min(1, 'Groom name is required'),
    weddingDate: z.string().optional(),
    plan: z.string().default('mangal'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type SetupInput = z.infer<typeof setupSchema>
