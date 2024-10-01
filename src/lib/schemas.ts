import { z } from 'zod';

export const SignupFormSchema = z
  .object({
    email: z.string().email('Invalid Email address'),
    password: z
      .string()
      .min(8, { message: 'Password should be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password should be at least 8 characters' })
      .optional(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const SigninFormSchema = z.object({
  email: z.string().email('Invalid Email address'),
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters' }),
});

export const OTPSchema = z.object({
  otp: z.string().min(6, { message: 'OTP should be at least 6 characters' }),
});
