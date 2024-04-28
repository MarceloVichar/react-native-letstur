import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type Login = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
  access_token: z.string(),
  user_roles: z.array(z.string()),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
