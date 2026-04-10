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
      queryClient.invalidateQueries({ queryKey: projectKeys.admin });
      queryClient.invalidateQueries({ queryKey: projectKeys.published });
      queryClient.setQueryData(projectKeys.detail(project.id), project);
    },
  });
}

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProjectPayload }) =>
      updateProject(id, payload),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.admin });
      queryClient.invalidateQueries({ queryKey: projectKeys.published });
      queryClient.setQueryData(projectKeys.detail(project.id), project);
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.admin });
      queryClient.invalidateQueries({ queryKey: projectKeys.published });
    },
  });
}
