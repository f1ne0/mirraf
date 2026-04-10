import { Button, Grid, GridItem, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { FiFolder, FiGlobe, FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useProjectsQuery } from '../../../entities/project/api/projectQueries';
import { PageContainer } from '../../../widgets/admin/PageContainer';
import { PageTitle } from '../../../widgets/admin/PageTitle';
import { StatCard } from '../../../shared/ui/StatCard';

export function AdminDashboardPage() {
  const projectsQuery = useProjectsQuery();
  const projectsCount = projectsQuery.data?.length ?? 0;

  return (
    <PageContainer>
      <Stack spacing={6}>
        <PageTitle
          title="Dashboard"
          description="Краткий обзор текущего состояния проектов и быстрый доступ к ключевым действиям."
          breadcrumbs={[{ label: 'Dashboard' }]}
        />

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          <StatCard icon={FiFolder} label="Всего проектов" value={projectsCount} />
          <StatCard icon={FiGlobe} label="360 preview" value={projectsCount} />
          <StatCard icon={FiPlusCircle} label="Готовность к scale" value="Backend Ready" />
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', xl: '1.2fr 0.8fr' }} gap={5}>
          <GridItem
            bg="admin.surface"
            border="1px solid"
            borderColor="admin.border"
            borderRadius="24px"
            boxShadow="adminCard"
            p={6}
          >
            <Stack spacing={4}>
              <Text fontSize="lg" fontWeight="800">
                Архитектура уже готова к интеграции
              </Text>
              <Text color="admin.textMuted" lineHeight={1.8}>
                Данные идут через отдельный service слой и React Query. Это означает, что позже
                можно заменить localStorage на Supabase или REST API без полной переделки страниц,
                форм и layout-компонентов.
              </Text>
            </Stack>
          </GridItem>

          <GridItem
            bg="admin.surface"
            border="1px solid"
            borderColor="admin.border"
            borderRadius="24px"
            boxShadow="adminCard"
            p={6}
          >
            <Stack spacing={4}>
              <Text fontSize="lg" fontWeight="800">
                Быстрые действия
              </Text>
              <Button as={Link} to="/admin/projects/create">
                Добавить новый проект
              </Button>
              <Button as={Link} to="/admin/projects" variant="adminOutline">
                Перейти к списку проектов
              </Button>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </PageContainer>
  );
}

