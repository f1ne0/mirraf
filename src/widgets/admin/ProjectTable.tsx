import {
  Box,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { FiCompass, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../entities/project/model/types';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { ProjectCell } from './ProjectCell';
import { ProjectImageModal } from './ProjectImageModal';

type ProjectTableProps = {
  projects: Project[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  onPreview: (project: Project) => void;
};

export function ProjectTable({
  projects,
  onDelete,
  isDeleting = false,
  onPreview,
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
        <TableContainer px={{ base: 2, md: 4 }} py={3}>
          <Table variant="admin">
            <Thead>
              <Tr>
                <Th>Project</Th>
                <Th>Address</Th>
                <Th>Price</Th>
                <Th>Created</Th>
                <Th textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project) => (
                <Tr key={project.id}>
                  <Td maxW={{ base: '240px', md: '320px', xl: '380px' }}>
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
                    <Text color="admin.textMuted" noOfLines={2}>
                      {project.address}
                    </Text>
                  </Td>
                  <Td>
                    <Text>{new Intl.NumberFormat('ru-RU').format(project.price)} сум</Text>
                  </Td>
                  <Td>
                    <Text color="admin.textMuted">
                      {new Intl.DateTimeFormat('ru-RU', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(project.createdAt))}
                    </Text>
                  </Td>
                  <Td>
                    <HStack justify="flex-end" spacing={2}>
                      {project.panoramaUrl ? (
                        <IconButton
                          aria-label="Open panorama"
                          icon={<FiCompass />}
                          variant="adminOutline"
                          onClick={() => onPreview(project)}
                        />
                      ) : null}
                      <IconButton
                        as={Link}
                        to={`/admin/projects/${project.id}/edit`}
                        aria-label="Edit project"
                        icon={<FiEdit2 />}
                        variant="adminOutline"
                      />
                      <IconButton
                        aria-label="Delete project"
                        icon={<FiTrash2 />}
                        variant="dangerOutline"
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
        description="Проект и связанные изображения будут удалены из Supabase."
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
