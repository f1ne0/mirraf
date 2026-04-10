import { Alert, AlertIcon, Button, HStack, Stack, useDisclosure, useToast } from '@chakra-ui/react';
import { FiFolder } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDeleteProjectMutation, useProjectsQuery } from '../../../entities/project/api/projectQueries';
import { Project } from '../../../entities/project/model/types';
import { PageContainer } from '../../../widgets/admin/PageContainer';
import { PageTitle } from '../../../widgets/admin/PageTitle';
import { ProjectTable } from '../../../widgets/admin/ProjectTable';
import { EmptyState } from '../../../shared/ui/EmptyState';
import { LoadingSkeleton } from '../../../shared/ui/LoadingSkeleton';
import { ProjectPreviewModal } from '../../../features/project-preview/ProjectPreviewModal';

export function AdminProjectsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const preview = useDisclosure();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projectsQuery = useProjectsQuery();
  const deleteMutation = useDeleteProjectMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: 'Проект удалён',
        status: 'success',
        duration: 2600,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'Не удалось удалить проект.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <PageContainer>
      <Stack spacing={6}>
        <HStack justify="space-between" align="flex-start" flexWrap="wrap" gap={4}>
          <PageTitle
            title="Projects"
            description="Список проектов с превью изображений, 360-ссылкой, ценой и действиями редактирования."
            breadcrumbs={[{ label: 'Dashboard', to: '/admin' }, { label: 'Projects' }]}
          />
          <Button onClick={() => navigate('/admin/projects/create')}>Добавить проект</Button>
        </HStack>

        {projectsQuery.isLoading ? <LoadingSkeleton rows={5} /> : null}

        {projectsQuery.isError ? (
          <Alert status="error" borderRadius="24px">
            <AlertIcon />
            Не удалось загрузить проекты.
          </Alert>
        ) : null}

        {!projectsQuery.isLoading && !projectsQuery.isError && (projectsQuery.data?.length ?? 0) === 0 ? (
          <EmptyState
            icon={<FiFolder />}
            title="Проекты пока не добавлены"
            description="Создайте первый проект, чтобы увидеть таблицу, превью изображений и дальнейшие действия."
            actionLabel="Добавить проект"
            onAction={() => navigate('/admin/projects/create')}
          />
        ) : null}

        {!projectsQuery.isLoading && !projectsQuery.isError && projectsQuery.data ? (
          <ProjectTable
            projects={projectsQuery.data}
            isDeleting={deleteMutation.isPending}
            onDelete={handleDelete}
            onPreview={(project) => {
              setSelectedProject(project);
              preview.onOpen();
            }}
          />
        ) : null}
      </Stack>

      <ProjectPreviewModal
        project={selectedProject}
        isOpen={preview.isOpen}
        onClose={preview.onClose}
      />
    </PageContainer>
  );
}
