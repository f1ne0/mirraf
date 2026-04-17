import { z } from 'zod';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '../../../shared/lib/supabase/storage';
import { PROJECT_CATEGORY_VALUES } from './categories';

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

const priceSchema = z.preprocess((value) => {
  if (typeof value === 'string') {
    const normalized = value.replace(/[^\d]/g, '');

    if (!normalized) {
      return NaN;
    }

    return Number(normalized);
  }

  return value;
}, z.number().min(1, 'Цена должна быть больше 0.'));

export const loginSchema = z.object({
  email: z.string().email('Введите корректный email.'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов.'),
});

export const createProjectSchema = z.object({
  title: z.string().min(3, 'Введите название проекта.').max(120, 'Слишком длинное название.'),
  address: z.string().min(5, 'Введите адрес проекта.').max(180, 'Слишком длинный адрес.'),
  category: z.enum(PROJECT_CATEGORY_VALUES, {
    errorMap: () => ({ message: 'Выберите категорию проекта.' }),
  }),
  price: priceSchema,
  panoramaUrl: z.string().trim(),
  isPublished: z.boolean(),
  designImage: requiredImageSchema,
  resultImage: requiredImageSchema,
});

export const updateProjectSchema = z.object({
  title: z.string().min(3, 'Введите название проекта.').max(120, 'Слишком длинное название.'),
  address: z.string().min(5, 'Введите адрес проекта.').max(180, 'Слишком длинный адрес.'),
  category: z.enum(PROJECT_CATEGORY_VALUES, {
    errorMap: () => ({ message: 'Выберите категорию проекта.' }),
  }),
  price: priceSchema,
  panoramaUrl: z.string().trim(),
  isPublished: z.boolean(),
  designImage: optionalImageSchema.optional(),
  resultImage: optionalImageSchema.optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type CreateProjectFormValues = z.input<typeof createProjectSchema>;
export type UpdateProjectFormValues = z.input<typeof updateProjectSchema>;
