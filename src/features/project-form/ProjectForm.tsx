import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Select,
  Stack,
  Switch,
  Textarea,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  createProjectSchema,
  CreateProjectFormValues,
  updateProjectSchema,
  UpdateProjectFormValues,
} from '../../entities/project/model/schemas';
import { PROJECT_CATEGORY_OPTIONS } from '../../entities/project/model/categories';
import { Project } from '../../entities/project/model/types';
import { FileUpload } from './FileUpload';

type ProjectFormProps = {
  mode: 'create' | 'edit';
  initialValues?: Project | null;
  isSubmitting?: boolean;
  onSubmit: (payload: {
    title: string;
    address: string;
    description: string;
    category: Project['category'];
    price: number;
    panoramaUrl: string;
    isPublished: boolean;
    designImage?: File | null;
    resultImage?: File | null;
  }) => Promise<void>;
};

type FormValues = CreateProjectFormValues | UpdateProjectFormValues;

type DraftValues = Pick<
  CreateProjectFormValues,
  'title' | 'address' | 'description' | 'category' | 'price' | 'panoramaUrl' | 'isPublished'
>;

function formatPriceInput(value: string) {
  const digits = value.replace(/[^\d]/g, '');

  if (!digits) {
    return '';
  }

  return new Intl.NumberFormat('ru-RU').format(Number(digits));
}

function getDefaultValues(mode: 'create' | 'edit', initialValues?: Project | null): DraftValues {
  return {
    title: initialValues?.title ?? '',
    address: initialValues?.address ?? '',
    description: initialValues?.description ?? '',
    category: initialValues?.category ?? 'other',
    price: initialValues?.price ? String(initialValues.price) : '',
    panoramaUrl: initialValues?.panoramaUrl ?? '',
    isPublished: initialValues?.isPublished ?? mode === 'create',
  };
}

export function ProjectForm({
  mode,
  initialValues,
  isSubmitting = false,
  onSubmit,
}: ProjectFormProps) {
  const toast = useToast();
  const schema = useMemo(
    () => (mode === 'create' ? createProjectSchema : updateProjectSchema),
    [mode],
  );
  const draftStorageKey = useMemo(
    () => `project-form-draft:${mode}:${initialValues?.id ?? 'new'}`,
    [initialValues?.id, mode],
  );
  const defaultValues = useMemo(() => {
    const baseValues = getDefaultValues(mode, initialValues);

    if (typeof window === 'undefined') {
      return baseValues;
    }

    const rawDraft = window.sessionStorage.getItem(draftStorageKey);

    if (!rawDraft) {
      return baseValues;
    }

    try {
      const parsedDraft = JSON.parse(rawDraft) as Partial<DraftValues>;

      return {
        ...baseValues,
        ...parsedDraft,
      };
    } catch {
      window.sessionStorage.removeItem(draftStorageKey);
      return baseValues;
    }
  }, [draftStorageKey, initialValues, mode]);

  const [designPreview, setDesignPreview] = useState(initialValues?.designImage ?? '');
  const [resultPreview, setResultPreview] = useState(initialValues?.resultImage ?? '');

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
      designImage: undefined,
      resultImage: undefined,
    },
  });
  const watchedValues = watch([
    'title',
    'address',
    'description',
    'category',
    'price',
    'panoramaUrl',
    'isPublished',
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const [title, address, description, category, price, panoramaUrl, isPublished] = watchedValues;
    const nextDraft: DraftValues = {
      title,
      address,
      description,
      category,
      price,
      panoramaUrl,
      isPublished,
    };

    window.sessionStorage.setItem(draftStorageKey, JSON.stringify(nextDraft));
  }, [draftStorageKey, watchedValues]);

  const updatePreview = (
    event: ChangeEvent<HTMLInputElement>,
    setPreview: (value: string) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = handleSubmit(async (values) => {
    try {
      await onSubmit({
        title: values.title,
        address: values.address,
        description: values.description?.trim() ?? '',
        category: values.category,
        price: Number(String(values.price).replace(/[^\d]/g, '')),
        panoramaUrl: values.panoramaUrl,
        isPublished: values.isPublished,
        designImage: values.designImage ?? null,
        resultImage: values.resultImage ?? null,
      });

      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(draftStorageKey);
      }
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'Не удалось сохранить проект.',
        status: 'error',
        duration: 3200,
        isClosable: true,
      });
    }
  });

  return (
    <Stack
      as="form"
      spacing={6}
      onSubmit={submitHandler}
      bg="admin.surface"
      border="1px solid"
      borderColor="admin.border"
      borderRadius="24px"
      boxShadow="adminCard"
      p={{ base: 5, md: 7 }}
    >
      <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={5}>
        <FormControl isInvalid={Boolean(errors.title)}>
          <FormLabel>Название проекта</FormLabel>
          <Input placeholder="Например, Кухня премиум-класса" {...register('title')} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.address)}>
          <FormLabel>Адрес</FormLabel>
          <Input placeholder="Город, район, улица" {...register('address')} />
          <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.description)}>
          <FormLabel>Описание</FormLabel>
          <Textarea
            placeholder="Добавьте индивидуальное описание проекта"
            minH="132px"
            resize="vertical"
            {...register('description')}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.price)}>
          <FormLabel>Цена</FormLabel>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                inputMode="numeric"
                placeholder="128 000 000"
                value={formatPriceInput(String(field.value ?? ''))}
                onChange={(event) => field.onChange(event.target.value.replace(/[^\d]/g, ''))}
              />
            )}
          />
          <FormErrorMessage>{errors.price?.message?.toString()}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.category)}>
          <FormLabel>Категория</FormLabel>
          <Select placeholder="Выберите категорию" {...register('category')}>
            {PROJECT_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.panoramaUrl)}>
          <FormLabel>Panorama URL</FormLabel>
          <Input placeholder="https://momento360.com/..." {...register('panoramaUrl')} />
          <FormErrorMessage>{errors.panoramaUrl?.message}</FormErrorMessage>
        </FormControl>
      </Grid>

      <FormControl display="flex" alignItems="center" gap={3}>
        <Controller
          name="isPublished"
          control={control}
          render={({ field }) => (
            <Switch
              isChecked={field.value}
              onChange={(event) => field.onChange(event.target.checked)}
            />
          )}
        />
        <Text color="admin.textMuted">Показывать проект на публичном сайте</Text>
      </FormControl>

      <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={6}>
        <FormControl isInvalid={Boolean(errors.designImage)}>
          <Controller
            name="designImage"
            control={control}
            render={({ field: { onChange } }) => (
              <FileUpload
                label="Фото 3D дизайна"
                preview={designPreview}
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  onChange(file);
                  updatePreview(event, setDesignPreview);
                }}
              />
            )}
          />
          <FormErrorMessage>{errors.designImage?.message?.toString()}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.resultImage)}>
          <Controller
            name="resultImage"
            control={control}
            render={({ field: { onChange } }) => (
              <FileUpload
                label="Фото результата"
                preview={resultPreview}
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  onChange(file);
                  updatePreview(event, setResultPreview);
                }}
              />
            )}
          />
          <FormErrorMessage>{errors.resultImage?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Grid>

      <Stack
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        align={{ base: 'stretch', sm: 'center' }}
        pt={2}
      >
        <Text color="admin.textMuted" fontSize="sm">
          Проверьте поля и сохраните изменения. Черновик сохраняется автоматически в этой сессии.
        </Text>
        <Button type="submit" isLoading={isSubmitting} minW="220px">
          {mode === 'create' ? 'Создать проект' : 'Сохранить изменения'}
        </Button>
      </Stack>
    </Stack>
  );
}
