import * as z from "zod";

export const CreateUserSchema = z.object({
    username: z.string()
        .min(5, { error: 'Username must be at least 5 characters long!' })
        .regex(/^[A-Za-z0-9]+$/),
    password: z.string()
        .min(8, { error: 'Password must be at least 8 charactes long!' })
        .regex(/^[A-Za-z0-9]+$/),
    repeatPassword: z.string()
}).refine((data) => data.password === data.repeatPassword, {
    error: 'Passwords do not match!',
    path: ['repeatPassword']
}).transform(({ repeatPassword, ...data }) => data);

export const UserLoginSchema = z.object({
    username: z.string()
        .min(5, { error: 'Username must be at least 5 characters long!' })
        .regex(/^[A-Za-z0-9]+$/),
    password: z.string()
        .min(8, { error: 'Password must be at least 8 charactes long!' })
        .regex(/^[A-Za-z0-9]+$/)
})