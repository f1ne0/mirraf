import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  getPublishedProjects,
  updateProject,
  type ProjectPayload,
} from './projectService';

export const projectKeys = {
  all: ['projects'] as const,
  admin: ['projects', 'admin'] as const,
  published: ['projects', 'published'] as const,
  detail: (id: string) => ['projects', 'detail', id] as const,
};

export function useProjectsQuery() {
  return useQuery({
    queryKey: projectKeys.admin,
    queryFn: getProjects,
  });
}

export function usePublishedProjectsQuery() {
  return useQuery({
    queryKey: projectKeys.published,
    queryFn: getPublishedProjects,
    refetchOnMount: 'always',
  });
}

export function useProjectQuery(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => getProjectById(id),
    enabled: Boolean(id),
  });
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProjectPayload) => createProject(payload),
    onSuccess: (project) => {
      queryClient.setQueryData(projectKeys.admin, (current: Awaited<ReturnType<typeof getProjects>> | undefined) =>
        current ? [project, ...current] : [project],
      );

      queryClient.setQueryData(
        projectKeys.published,
        (current: Awaited<ReturnType<typeof getPublishedProjects>> | undefined) => {
          if (!project.isPublished) {
            return current ?? [];
          }

          return current ? [project, ...current] : [project];
        },
      );

      queryClient.setQueryData(projectKeys.detail(project.id), project);
      queryClient.invalidateQueries({ queryKey: projectKeys.admin });
      queryClient.invalidateQueries({ queryKey: projectKeys.published });
    },
  });
}

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProjectPayload }) =>
      updateProject(id, payload),
    onSuccess: (project) => {
      queryClient.setQueryData(projectKeys.admin, (current: Awaited<ReturnType<typeof getProjects>> | undefined) =>
        current?.map((item) => (item.id === project.id ? project : item)) ?? [project],
      );

      queryClient.setQueryData(
        projectKeys.published,
        (current: Awaited<ReturnType<typeof getPublishedProjects>> | undefined) => {
          const publishedList = current ?? [];
          const withoutCurrent = publishedList.filter((item) => item.id !== project.id);

          if (!project.isPublished) {
            return withoutCurrent;
          }

          return [project, ...withoutCurrent];
        },
      );

      queryClient.setQueryData(projectKeys.detail(project.id), project);
      queryClient.invalidateQueries({ queryKey: projectKeys.admin });
      queryClient.invalidateQueries({ queryKey: projectKeys.published });
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: (_data, deletedId) => {
      queryClient.setQueryData(projectKeys.admin, (current: Awaited<ReturnType<typeof getProjects>> | undefined) =>
        current?.filter((item) => item.id !== deletedId) ?? [],
      );

      queryClient.setQueryData(
        projectKeys.published,
        (current: Awaited<ReturnType<typeof getPublishedProjects>> | undefined) =>
          current?.filter((item) => item.id !== deletedId) ?? [],
      );

      queryClient.invalidateQueries({ queryKey: projectKeys.admin });
      queryClient.invalidateQueries({ queryKey: projectKeys.published });
    },
  });
}
