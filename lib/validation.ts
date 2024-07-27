import { z } from 'zod';

const requiredSring = z.string().trim().min(1, 'required');

export const signUpSchema = z.object({
    email: requiredSring.email("Email invalide"),
    username: requiredSring.regex(/^[a-zA-Z0-9_]{3,15}$/, "Username invalide"),
    password: requiredSring.min(8, "Le mot de passe doit contenir au moins 8 caractères"),
})

export type SignUpValues = z.infer<typeof signUpSchema>;

export const logingSchema = z.object({
    username: requiredSring,
    password: requiredSring,
})

export type LoginValues = z.infer<typeof logingSchema>;