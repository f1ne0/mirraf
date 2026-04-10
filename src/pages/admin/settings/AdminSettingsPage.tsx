import { Stack, Text } from '@chakra-ui/react';
import { PageContainer } from '../../../widgets/admin/PageContainer';
import { PageTitle } from '../../../widgets/admin/PageTitle';

export function AdminSettingsPage() {
  return (
    <PageContainer>
      <Stack spacing={6}>
        <PageTitle
          title="Settings"
          description="Экран-заготовка для будущих параметров панели, интеграции Supabase и бизнес-настроек."
          breadcrumbs={[{ label: 'Dashboard', to: '/admin' }, { label: 'Settings' }]}
        />

        <Stack
          spacing={4}
          bg="admin.surface"
          border="1px solid"
          borderColor="admin.border"
          borderRadius="24px"
          boxShadow="adminCard"
          p={{ base: 5, md: 6 }}
        >
          <Text fontSize="lg" fontWeight="800">
            Панель готова к развитию
          </Text>
          <Text color="admin.textMuted" lineHeight={1.8}>
            Здесь позже можно добавить настройки пользователя, ключи интеграции, флаги features
            и подключение Supabase. Текущая архитектура уже отделяет страницы от сервисного слоя.
          </Text>
        </Stack>
      </Stack>
    </PageContainer>
  );
}
