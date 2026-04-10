import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../../features/admin-auth/authService';
import { useAdminAuth } from '../../../features/admin-auth/AuthProvider';
import { LoginFormValues, loginSchema } from '../../../entities/project/model/schemas';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { user } = useAdminAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      await loginAdmin(values.email, values.password);
      toast({
        title: 'Вход выполнен',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
      const nextPath = (location.state as { from?: string } | null)?.from ?? '/admin';
      navigate(nextPath, { replace: true });
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'Не удалось выполнить вход.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  });

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #0B1218 0%, #101922 100%)"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
    >
      <Box
        position="absolute"
        top="-140px"
        right="-80px"
        w={{ base: '240px', md: '420px' }}
        h={{ base: '240px', md: '420px' }}
        bg="radial-gradient(circle, rgba(195,165,116,0.18) 0%, rgba(195,165,116,0) 70%)"
        filter="blur(8px)"
      />
      <Container maxW="7xl" py={{ base: 10, md: 16 }}>
        <Grid templateColumns={{ base: '1fr', xl: '1.05fr 0.95fr' }} gap={{ base: 10, xl: 16 }} alignItems="center">
          <GridItem>
            <Stack spacing={6} maxW="2xl">
              <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.35em" color="accent.300">
                Mirraf Admin Dashboard
              </Text>
              <Heading fontSize={{ base: '4xl', md: '6xl' }} lineHeight={0.94}>
                Панель управления мебельными проектами
              </Heading>
              <Text color="admin.textMuted" fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.85}>
                Удобное пространство для добавления, редактирования и публикации проектов
                компании в одном месте.
              </Text>
            </Stack>
          </GridItem>

          <GridItem>
            <Stack
              as="form"
              spacing={5}
              onSubmit={onSubmit}
              bg="admin.surface"
              border="1px solid"
              borderColor="admin.border"
              borderRadius="24px"
              boxShadow="adminCard"
              p={{ base: 6, md: 8 }}
            >
              <Heading size="lg">Авторизация</Heading>
              <Text color="admin.textMuted">Войдите, чтобы открыть панель управления.</Text>

              <Box>
                <Text mb={2} fontWeight="700">Email</Text>
                <Input placeholder="admin@mirraf.uz" {...register('email')} />
                {errors.email ? (
                  <Text mt={2} color="error.500" fontSize="sm">
                    {errors.email.message}
                  </Text>
                ) : null}
              </Box>

              <Box>
                <Text mb={2} fontWeight="700">Пароль</Text>
                <Input type="password" placeholder="Введите пароль" {...register('password')} />
                {errors.password ? (
                  <Text mt={2} color="error.500" fontSize="sm">
                    {errors.password.message}
                  </Text>
                ) : null}
              </Box>

              <Button type="submit" isLoading={isSubmitting}>
                Войти в панель
              </Button>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
