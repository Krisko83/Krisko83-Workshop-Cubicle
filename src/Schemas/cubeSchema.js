import strict from "node:assert/strict";
import * as z from "zod";

export const CreateCubeAndAccessosrySchema = z.object({
    name: z.string().min(5 , {error: 'Name must be at least 5 characters long!' }).regex(/^[A-Za-z0-9 ]+$/),
    description: z.string().min(20 , {error: 'Description must be at least 20 characters long!' }).regex(/^[A-Za-z0-9 ]+$/),
    imageUrl: z.string().regex(/^https?:\/\//, {error: 'Image URL must start http:// or https://'}),
    difficultyLevel: z.enum(['1', '2', '3', '4', '5', '6'], { error: 'Invalid Difficulty Level!'}).optional()
})