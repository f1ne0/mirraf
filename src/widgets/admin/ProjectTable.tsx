import {
  Box,
  Checkbox,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FiCompass, FiEdit2, FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../entities/project/model/types';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { ProjectCell } from './ProjectCell';
import { ProjectImageModal } from './ProjectImageModal';

type ProjectTableProps = {
  projects: Project[];
  selectedIds: string[];
  onToggleSelect: (id: string, checked: boolean) => void;
  onToggleSelectAll: (ids: string[], checked: boolean) => void;
  onRowClick: (project: Project) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  onPreview: (project: Project) => void;
  onTogglePublish: (project: Project) => void;
  isTogglingPublish?: boolean;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export function ProjectTable({
  projects,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
  onDelete,
  isDeleting = false,
  onPreview,
  onTogglePublish,
  isTogglingPublish = false,
}: ProjectTableProps) {
  const confirm = useDisclosure();
  const imagePreview = useDisclosure();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    caption: string;
  } | null>(null);

  const allSelected = projects.length > 0 && projects.every((project) => selectedIds.includes(project.id));
  const someSelected = projects.some((project) => selectedIds.includes(project.id));

  const stopRowClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const toggleSelection = (project: Project) => {
    onToggleSelect(project.id, !selectedIds.includes(project.id));
  };

  return (
    <>
      <Box
        bg="admin.surface"
        border="1px solid"
        borderColor="admin.border"
        borderRadius="24px"
        boxShadow="adminCard"
        overflow="hidden"
      >
        <TableContainer
          px={{ base: 2, md: 4 }}
          pt={0}
          pb={3}
          maxH="calc(100vh - 310px)"
          overflowY="auto"
        >
          <Table variant="admin" tableLayout="fixed">
            <Thead>
              <Tr>
                <Th w="60px">
                  <Tooltip label="Выбрать все на странице" hasArrow>
                    <Box>
                      <Checkbox
                        size="lg"
                        isChecked={allSelected}
                        isIndeterminate={!allSelected && someSelected}
                        onChange={(event) =>
                          onToggleSelectAll(
                            projects.map((project) => project.id),
                            event.target.checked,
                          )
                        }
                      />
                    </Box>
                  </Tooltip>
                </Th>
                <Th w={{ base: '36%', xl: '40%' }}>Project</Th>
                <Th w={{ base: '22%', xl: '24%' }}>Address</Th>
                <Th w={{ base: '12%', xl: '11%' }}>Price</Th>
                <Th w={{ base: '18%', xl: '15%' }}>Created</Th>
                <Th w={{ base: '120px', xl: '144px' }} textAlign="right">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project) => (
                <Tr
                  key={project.id}
                  cursor="pointer"
                  onClick={() => onRowClick(project)}
                  _hover={{
                    '& td': {
                      bg: 'rgba(255,255,255,0.05)',
                    },
                  }}
                >
                  <Td
                    cursor="pointer"
                    onClick={(event) => {
                      stopRowClick(event);
                      toggleSelection(project);
                    }}
                  >
                    <Checkbox
                      pointerEvents="none"
                      size="lg"
                      isChecked={selectedIds.includes(project.id)}
                    />
                  </Td>
                  <Td>
                    <ProjectCell
                      project={project}
                      onImagePreview={({ src, alt, caption }) => {
                        setSelectedImage({
                          src,
                          alt,
                          caption,
                          title: project.title,
                        });
                        imagePreview.onOpen();
                      }}
                    />
                  </Td>
                  <Td>
                    <Text color="admin.textMuted" noOfLines={3} lineHeight="1.5">
                      {project.address}
                    </Text>
                  </Td>
                  <Td>
                    <VStack align="flex-start" spacing={0}>
                      <Text fontSize="lg" fontWeight="800" lineHeight="1.1">
                        {formatPrice(project.price)}
                      </Text>
                      <Text color="admin.textSoft" fontSize="xs" textTransform="uppercase" letterSpacing="0.08em">
                        сум
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text color="admin.textMuted" fontSize="sm" lineHeight="1.5">
                      {new Intl.DateTimeFormat('ru-RU', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(project.createdAt))}
                    </Text>
                  </Td>
                  <Td onClick={stopRowClick}>
                    <HStack justify="flex-end" spacing={1.5} wrap="nowrap">
                      {project.panoramaUrl ? (
                        <IconButton
                          aria-label="Open panorama"
                          icon={<FiCompass />}
                          variant="adminOutline"
                          size="sm"
                          minW="32px"
                          h="32px"
                          onClick={() => onPreview(project)}
                        />
                      ) : null}
                      <IconButton
                        as={Link}
                        to={`/admin/projects/${project.id}/edit`}
                        aria-label="Edit project"
                        icon={<FiEdit2 />}
                        variant="adminOutline"
                        size="sm"
                        minW="32px"
                        h="32px"
                      />
                      <Tooltip
                        label={project.isPublished ? 'Снять с публикации' : 'Опубликовать'}
                        hasArrow
                      >
                        <IconButton
                          aria-label={project.isPublished ? 'Unpublish project' : 'Publish project'}
                          icon={project.isPublished ? <FiEyeOff /> : <FiEye />}
                          variant="adminOutline"
                          size="sm"
                          minW="32px"
                          h="32px"
                          isLoading={isTogglingPublish}
                          onClick={() => onTogglePublish(project)}
                        />
                      </Tooltip>
                      <IconButton
                        aria-label="Delete project"
                        icon={<FiTrash2 />}
                        variant="dangerOutline"
                        size="sm"
                        minW="32px"
                        h="32px"
                        onClick={() => {
                          setSelectedId(project.id);
                          confirm.onOpen();
                        }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <ConfirmDialog
        isOpen={confirm.isOpen}
        onClose={confirm.onClose}
        isLoading={isDeleting}
        title="Удалить проект?"
        description="Проект и связанные изображения будут удалены."
        onConfirm={() => {
          if (selectedId) {
            onDelete(selectedId);
          }
          confirm.onClose();
        }}
      />

      <ProjectImageModal
        isOpen={imagePreview.isOpen}
        onClose={imagePreview.onClose}
        imageSrc={selectedImage?.src ?? null}
        imageAlt={selectedImage?.alt ?? ''}
        title={selectedImage?.title ?? ''}
        caption={selectedImage?.caption}
      />
    </>
  );
}
