import { Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useProjectQuery, useUpdateProjectMutation } from '../../../entities/project/api/projectQueries';
import { ProjectForm } from '../../../features/project-form/ProjectForm';
import { LoadingSkeleton } from '../../../shared/ui/LoadingSkeleton';
import { PageContainer } from '../../../widgets/admin/PageContainer';
import { PageTitle } from '../../../widgets/admin/PageTitle';

export function AdminProjectEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const projectQuery = useProjectQuery(id ?? '');
  const updateMutation = useUpdateProjectMutation();

  if (!id) {
    return <Navigate to="/admin/projects" replace />;
  }

  return (
    <PageContainer>
      <PageTitle
        title="Редактировать проект"
        description="Обновите информацию о проекте, при необходимости замените фотографии и сохраните изменения."
        breadcrumbs={[
          { label: 'Главная', to: '/admin' },
          { label: 'Проекты', to: '/admin/projects' },
          { label: 'Редактировать проект' },
        ]}
      />

      {projectQuery.isLoading ? <LoadingSkeleton rows={3} /> : null}

      {!projectQuery.isLoading && !projectQuery.data ? (
        <Alert status="warning" borderRadius="24px" bg="rgba(209,163,91,0.12)" color="admin.text">
          <AlertIcon color="warning.500" />
          Проект не найден.
        </Alert>
      ) : null}

      {projectQuery.data ? (
        <ProjectForm
          mode="edit"
          initialValues={projectQuery.data}
          isSubmitting={updateMutation.isPending}
          onSubmit={async (payload) => {
            await updateMutation.mutateAsync({ id, payload });
            toast({
              title: 'Проект обновлён',
              status: 'success',
              duration: 2600,
              isClosable: true,
            });
            navigate('/admin/projects');
          }}
        />
      ) : null}
    </PageContainer>
  );
}
