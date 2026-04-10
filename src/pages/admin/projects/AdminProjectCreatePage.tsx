import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCreateProjectMutation } from '../../../entities/project/api/projectQueries';
import { ProjectForm } from '../../../features/project-form/ProjectForm';
import { PageContainer } from '../../../widgets/admin/PageContainer';
import { PageTitle } from '../../../widgets/admin/PageTitle';

export function AdminProjectCreatePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useCreateProjectMutation();

  return (
    <PageContainer>
      <PageTitle
        title="Добавить проект"
        description="Заполните основные данные проекта, добавьте фотографии и сохраните запись."
        breadcrumbs={[
          { label: 'Главная', to: '/admin' },
          { label: 'Проекты', to: '/admin/projects' },
          { label: 'Добавить проект' },
        ]}
      />

      <ProjectForm
        mode="create"
        isSubmitting={mutation.isPending}
        onSubmit={async (payload) => {
          await mutation.mutateAsync(payload);
          toast({
            title: 'Проект создан',
            status: 'success',
            duration: 2600,
            isClosable: true,
          });
          navigate('/admin/projects');
        }}
      />
    </PageContainer>
  );
}
