import { z } from 'zod';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '../../../shared/lib/supabase/storage';

const requiredImageSchema = z
  .custom<File | null>((value) => value instanceof File, {
    message: 'Файл обязателен.',
  })
  .refine((file) => !!file && ACCEPTED_IMAGE_TYPES.includes(file.type), 'Только JPG, PNG и WEBP.')
  .refine((file) => !!file && file.size <= MAX_IMAGE_SIZE, 'Максимум 5MB.');

const optionalImageSchema = z
  .custom<File | null | undefined>((value) => value == null || value instanceof File)
  .refine(
    (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Только JPG, PNG и WEBP.',
  )
  .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, 'Максимум 5MB.');

export const loginSchema = z.object({
  email: z.string().email('Введите корректный email.'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов.'),
});

export const createProjectSchema = z.object({
  title: z.string().min(3, 'Введите название проекта.').max(120, 'Слишком длинное название.'),
  address: z.string().min(5, 'Введите адрес проекта.').max(180, 'Слишком длинный адрес.'),
  price: z.coerce.number().min(1, 'Цена должна быть больше 0.'),
  panoramaUrl: z.string().trim(),
  isPublished: z.boolean(),
  designImage: requiredImageSchema,
  resultImage: requiredImageSchema,
});

export const updateProjectSchema = z.object({
  title: z.string().min(3, 'Введите название проекта.').max(120, 'Слишком длинное название.'),
  address: z.string().min(5, 'Введите адрес проекта.').max(180, 'Слишком длинный адрес.'),
  price: z.coerce.number().min(1, 'Цена должна быть больше 0.'),
  panoramaUrl: z.string().trim(),
  isPublished: z.boolean(),
  designImage: optionalImageSchema.optional(),
  resultImage: optionalImageSchema.optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
export type UpdateProjectFormValues = z.infer<typeof updateProjectSchema>;
