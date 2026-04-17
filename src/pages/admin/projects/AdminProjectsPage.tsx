import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FiFolder, FiSearch } from 'react-icons/fi';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useDeleteProjectMutation,
  useProjectsQuery,
  useSetProjectPublishedMutation,
} from '../../../entities/project/api/projectQueries';
import {
  ALL_PROJECT_CATEGORIES_VALUE,
  getProjectCategoryLabel,
  isProjectCategory,
  PROJECT_CATEGORY_VALUES,
  ProjectCategory,
} from '../../../entities/project/model/categories';
import { Project } from '../../../entities/project/model/types';
import { ProjectPreviewModal } from '../../../features/project-preview/ProjectPreviewModal';
import { ConfirmDialog } from '../../../shared/ui/ConfirmDialog';
import { EmptyState } from '../../../shared/ui/EmptyState';
import { LoadingSkeleton } from '../../../shared/ui/LoadingSkeleton';
import { PageContainer } from '../../../widgets/admin/PageContainer';
import { PageTitle } from '../../../widgets/admin/PageTitle';
import { ProjectTable } from '../../../widgets/admin/ProjectTable';

const PAGE_SIZE_OPTIONS = [5, 10, 20];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'oldest', label: 'Сначала старые' },
  { value: 'price_asc', label: 'Дешевле' },
  { value: 'price_desc', label: 'Дороже' },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  const adjustedStart = Math.max(1, end - 4);
  const pages: number[] = [];

  for (let page = adjustedStart; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
}

function isSortValue(value: string | null): value is SortValue {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export function AdminProjectsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const preview = useDisclosure();
  const bulkDeleteConfirm = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const projectsQuery = useProjectsQuery();
  const deleteMutation = useDeleteProjectMutation();
  const setPublishedMutation = useSetProjectPublishedMutation();

  const selectedCategoryParam = searchParams.get('category');
  const selectedCategory =
    selectedCategoryParam && isProjectCategory(selectedCategoryParam)
      ? selectedCategoryParam
      : ALL_PROJECT_CATEGORIES_VALUE;
  const searchQuery = searchParams.get('q') ?? '';
  const deferredSearchQuery = useDeferredValue(searchQuery.trim().toLowerCase());
  const pageSizeParam = parsePositiveInteger(searchParams.get('pageSize'), 10);
  const pageSize = PAGE_SIZE_OPTIONS.includes(pageSizeParam) ? pageSizeParam : 10;
  const sort = isSortValue(searchParams.get('sort')) ? searchParams.get('sort') : 'newest';

  const filteredProjects = useMemo(() => {
    const filtered = (projectsQuery.data ?? []).filter((project) => {
      const matchesCategory =
        selectedCategory === ALL_PROJECT_CATEGORIES_VALUE
          ? true
          : project.category === selectedCategory;

      const searchTarget = `${project.title} ${project.address}`.toLowerCase();
      const matchesSearch =
        deferredSearchQuery.length === 0 ? true : searchTarget.includes(deferredSearchQuery);

      return matchesCategory && matchesSearch;
    });

    return [...filtered].sort((left, right) => {
      switch (sort) {
        case 'oldest':
          return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
        case 'price_asc':
          return left.price - right.price;
        case 'price_desc':
          return right.price - left.price;
        case 'newest':
        default:
          return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
      }
    });
  }, [deferredSearchQuery, projectsQuery.data, selectedCategory, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const currentPage = Math.min(parsePositiveInteger(searchParams.get('page'), 1), totalPages);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [currentPage, filteredProjects, pageSize]);
  const visiblePages = getVisiblePages(currentPage, totalPages);

  useEffect(() => {
    const existingIds = new Set((projectsQuery.data ?? []).map((project) => project.id));
    setSelectedIds((current) => current.filter((id) => existingIds.has(id)));
  }, [projectsQuery.data]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      setSelectedIds((current) => current.filter((item) => item !== id));
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

  const handleTogglePublish = async (project: Project) => {
    try {
      await setPublishedMutation.mutateAsync({
        id: project.id,
        isPublished: !project.isPublished,
      });
      toast({
        title: !project.isPublished ? 'Проект опубликован' : 'Проект снят с публикации',
        status: 'success',
        duration: 2400,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'Не удалось обновить статус публикации.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBulkPublish = async (isPublished: boolean) => {
    const selectedProjects = (projectsQuery.data ?? []).filter((project) =>
      selectedIds.includes(project.id),
    );

    try {
      await Promise.all(
        selectedProjects
          .filter((project) => project.isPublished !== isPublished)
          .map((project) => setPublishedMutation.mutateAsync({ id: project.id, isPublished })),
      );

      setSelectedIds([]);
      toast({
        title: isPublished
          ? 'Выбранные проекты опубликованы'
          : 'Выбранные проекты сняты с публикации',
        status: 'success',
        duration: 2600,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'Не удалось обновить выбранные проекты.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedIds.map((id) => deleteMutation.mutateAsync(id)));
      setSelectedIds([]);
      bulkDeleteConfirm.onClose();
      toast({
        title: 'Выбранные проекты удалены',
        status: 'success',
        duration: 2600,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'Не удалось удалить выбранные проекты.',
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
            title="Проекты"
            description="Список проектов с фотографиями, стоимостью и действиями редактирования."
            breadcrumbs={[{ label: 'Главная', to: '/admin' }, { label: 'Проекты' }]}
          />
          <Button onClick={() => navigate('/admin/projects/create')}>Добавить проект</Button>
        </HStack>

        {!projectsQuery.isLoading && !projectsQuery.isError && (projectsQuery.data?.length ?? 0) > 0 ? (
          <Stack
            spacing={4}
            bg="admin.surface"
            border="1px solid"
            borderColor="admin.border"
            borderRadius="20px"
            px={{ base: 4, md: 5 }}
            py={4}
          >
            <HStack
              justify="space-between"
              align={{ base: 'stretch', md: 'center' }}
              flexDir={{ base: 'column', md: 'row' }}
              gap={4}
            >
              <Stack spacing={1}>
                <Text fontWeight="700">Поиск, фильтры и сортировка</Text>
                <Text color="admin.textMuted" fontSize="sm">
                  Найдено: {filteredProjects.length} из {projectsQuery.data?.length ?? 0}
                </Text>
              </Stack>
              <HStack
                w={{ base: '100%', md: 'auto' }}
                flexDir={{ base: 'column', md: 'row' }}
                align={{ base: 'stretch', md: 'center' }}
                spacing={3}
              >
                <Select
                  value={selectedCategory}
                  onChange={(event) =>
                    updateSearchParams({
                      category:
                        event.target.value === ALL_PROJECT_CATEGORIES_VALUE
                          ? null
                          : event.target.value,
                      page: null,
                    })
                  }
                  w={{ base: '100%', md: '240px' }}
                  minW={{ md: '240px' }}
                >
                  <option value={ALL_PROJECT_CATEGORIES_VALUE}>Все категории</option>
                  {PROJECT_CATEGORY_VALUES.map((category) => (
                    <option key={category} value={category}>
                      {getProjectCategoryLabel(category)}
                    </option>
                  ))}
                </Select>
                <Select
                  value={sort}
                  onChange={(event) =>
                    updateSearchParams({
                      sort: event.target.value === 'newest' ? null : event.target.value,
                      page: null,
                    })
                  }
                  w={{ base: '100%', md: '220px' }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <Select
                  value={String(pageSize)}
                  onChange={(event) =>
                    updateSearchParams({
                      pageSize: event.target.value === '10' ? null : event.target.value,
                      page: null,
                    })
                  }
                  w={{ base: '100%', md: '140px' }}
                  minW={{ md: '140px' }}
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size} / page
                    </option>
                  ))}
                </Select>
              </HStack>
            </HStack>

            <InputGroup>
              <InputLeftElement pointerEvents="none" color="admin.textSoft">
                <FiSearch />
              </InputLeftElement>
              <Input
                value={searchQuery}
                onChange={(event) =>
                  updateSearchParams({
                    q: event.target.value.trim() ? event.target.value : null,
                    page: null,
                  })
                }
                placeholder="Поиск по названию или адресу"
              />
            </InputGroup>

            {selectedIds.length > 0 ? (
              <HStack
                justify="space-between"
                align={{ base: 'stretch', md: 'center' }}
                flexDir={{ base: 'column', md: 'row' }}
                gap={3}
                bg="rgba(255,255,255,0.03)"
                border="1px solid"
                borderColor="admin.borderStrong"
                borderRadius="18px"
                px={4}
                py={3}
              >
                <Text fontWeight="700">
                  Выбрано проектов: {selectedIds.length}
                </Text>
                <ButtonGroup flexWrap="wrap" gap={3}>
                  <Button
                    variant="adminOutline"
                    onClick={() => handleBulkPublish(true)}
                    isLoading={setPublishedMutation.isPending}
                  >
                    Опубликовать
                  </Button>
                  <Button
                    variant="adminOutline"
                    onClick={() => handleBulkPublish(false)}
                    isLoading={setPublishedMutation.isPending}
                  >
                    Снять с публикации
                  </Button>
                  <Button variant="dangerOutline" onClick={bulkDeleteConfirm.onOpen}>
                    Удалить
                  </Button>
                  <Button variant="adminGhost" onClick={() => setSelectedIds([])}>
                    Сбросить выбор
                  </Button>
                </ButtonGroup>
              </HStack>
            ) : null}
          </Stack>
        ) : null}

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

        {!projectsQuery.isLoading &&
        !projectsQuery.isError &&
        (projectsQuery.data?.length ?? 0) > 0 &&
        filteredProjects.length === 0 ? (
          <EmptyState
            icon={<FiFolder />}
            title="Ничего не найдено"
            description="Измените поисковый запрос, сортировку или сбросьте фильтры."
            actionLabel="Сбросить фильтры"
            onAction={() => setSearchParams({}, { replace: true })}
          />
        ) : null}

        {!projectsQuery.isLoading && !projectsQuery.isError && filteredProjects.length > 0 ? (
          <Stack spacing={4}>
            <ProjectTable
              projects={paginatedProjects}
              selectedIds={selectedIds}
              onToggleSelect={(id, checked) =>
                setSelectedIds((current) =>
                  checked ? Array.from(new Set([...current, id])) : current.filter((item) => item !== id),
                )
              }
              onToggleSelectAll={(ids, checked) =>
                setSelectedIds((current) => {
                  if (checked) {
                    return Array.from(new Set([...current, ...ids]));
                  }

                  return current.filter((id) => !ids.includes(id));
                })
              }
              onRowClick={(project) => navigate(`/admin/projects/${project.id}/edit`)}
              isDeleting={deleteMutation.isPending}
              isTogglingPublish={setPublishedMutation.isPending}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
              onPreview={(project) => {
                setSelectedProject(project);
                preview.onOpen();
              }}
            />

            <HStack
              justify="space-between"
              align={{ base: 'stretch', md: 'center' }}
              flexDir={{ base: 'column', md: 'row' }}
              gap={3}
              bg="admin.surface"
              border="1px solid"
              borderColor="admin.border"
              borderRadius="20px"
              px={{ base: 4, md: 5 }}
              py={4}
            >
              <Text color="admin.textMuted" fontSize="sm">
                Страница {currentPage} из {totalPages}
              </Text>
              <Text color="admin.textMuted" fontSize="sm">
                Показаны {paginatedProjects.length} из {filteredProjects.length}
              </Text>
              <ButtonGroup gap={2} flexWrap="wrap" justifyContent="center">
                <Button
                  variant="adminOutline"
                  onClick={() =>
                    updateSearchParams({ page: currentPage > 1 ? String(currentPage - 1) : null })
                  }
                  isDisabled={currentPage === 1}
                >
                  Назад
                </Button>
                {visiblePages.map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'adminSolid' : 'adminOutline'}
                    onClick={() => updateSearchParams({ page: page === 1 ? null : String(page) })}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="adminOutline"
                  onClick={() =>
                    updateSearchParams({
                      page:
                        currentPage < totalPages ? String(currentPage + 1) : String(totalPages),
                    })
                  }
                  isDisabled={currentPage === totalPages}
                >
                  Вперед
                </Button>
              </ButtonGroup>
            </HStack>
          </Stack>
        ) : null}
      </Stack>

      <ProjectPreviewModal
        project={selectedProject}
        isOpen={preview.isOpen}
        onClose={preview.onClose}
      />

      <ConfirmDialog
        isOpen={bulkDeleteConfirm.isOpen}
        onClose={bulkDeleteConfirm.onClose}
        onConfirm={handleBulkDelete}
        isLoading={deleteMutation.isPending}
        title="Удалить выбранные проекты?"
        description="Все выбранные проекты и связанные изображения будут удалены без возможности восстановления."
        confirmText="Удалить выбранные"
      />
    </PageContainer>
  );
}
