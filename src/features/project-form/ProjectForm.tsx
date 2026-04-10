import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Stack,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  createProjectSchema,
  CreateProjectFormValues,
  updateProjectSchema,
  UpdateProjectFormValues,
} from '../../entities/project/model/schemas';
import { Project } from '../../entities/project/model/types';
import { FileUpload } from './FileUpload';

type ProjectFormProps = {
  mode: 'create' | 'edit';
  initialValues?: Project | null;
  isSubmitting?: boolean;
  onSubmit: (payload: {
    title: string;
    address: string;
    price: number;
    panoramaUrl: string;
    isPublished: boolean;
    designImage?: File | null;
    resultImage?: File | null;
  }) => Promise<void>;
};

type FormValues = CreateProjectFormValues | UpdateProjectFormValues;

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

  const [designPreview, setDesignPreview] = useState(initialValues?.designImage ?? '');
  const [resultPreview, setResultPreview] = useState(initialValues?.resultImage ?? '');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? '',
      address: initialValues?.address ?? '',
      price: initialValues?.price ?? 0,
      panoramaUrl: initialValues?.panoramaUrl ?? '',
      isPublished: initialValues?.isPublished ?? mode === 'create',
      designImage: undefined,
      resultImage: undefined,
    },
  });

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
        price: values.price,
        panoramaUrl: values.panoramaUrl,
        isPublished: values.isPublished,
        designImage: values.designImage ?? null,
        resultImage: values.resultImage ?? null,
      });
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

        <FormControl isInvalid={Boolean(errors.price)}>
          <FormLabel>Цена</FormLabel>
          <Input type="number" placeholder="128000000" {...register('price')} />
          <FormErrorMessage>{errors.price?.message?.toString()}</FormErrorMessage>
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
          Проверьте поля и сохраните изменения.
        </Text>
        <Button type="submit" isLoading={isSubmitting} minW="220px">
          {mode === 'create' ? 'Создать проект' : 'Сохранить изменения'}
        </Button>
      </Stack>
    </Stack>
  );
}
