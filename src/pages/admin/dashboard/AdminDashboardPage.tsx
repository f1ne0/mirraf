import { SimpleGrid, Stack } from '@chakra-ui/react';
import { FiFolder, FiGlobe, FiPlusCircle } from 'react-icons/fi';
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
          title="Панель управления"
          description="Краткий обзор текущих проектов и публикаций."
          breadcrumbs={[{ label: 'Главная' }]}
        />

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          <StatCard icon={FiFolder} label="Всего проектов" value={projectsCount} />
          <StatCard icon={FiGlobe} label="Панорамы" value={projectsCount} />
          <StatCard
            icon={FiPlusCircle}
            label="Опубликовано"
            value={projectsQuery.data?.filter((project) => project.isPublished).length ?? 0}
          />
        </SimpleGrid>
      </Stack>
    </PageContainer>
  );
}
