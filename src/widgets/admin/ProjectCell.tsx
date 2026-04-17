import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { ProjectCategoryBadge } from '../../entities/project/ui/ProjectCategoryBadge';
import { ProjectPublishBadge } from '../../entities/project/ui/ProjectPublishBadge';
import { Project } from '../../entities/project/model/types';

type ProjectCellProps = {
  project: Project;
  onImagePreview: (payload: { src: string; alt: string; caption: string }) => void;
};

export function ProjectCell({ project, onImagePreview }: ProjectCellProps) {
  const handlePreviewClick = (
    event: MouseEvent<HTMLImageElement>,
    payload: { src: string; alt: string; caption: string },
  ) => {
    event.stopPropagation();
    onImagePreview(payload);
  };

  return (
    <Flex align="flex-start" gap={4} minW={0}>
      <Flex gap={2} flexShrink={0}>
        <Image
          src={project.designImage}
          alt={`${project.title} design`}
          boxSize="52px"
          minW="52px"
          borderRadius="14px"
          objectFit="cover"
          bg="admin.surfaceAlt"
          border="1px solid"
          borderColor="admin.border"
          cursor="zoom-in"
          transition="transform 0.18s ease, border-color 0.18s ease"
          _hover={{
            transform: 'translateY(-1px)',
            borderColor: 'admin.borderStrong',
          }}
          onClick={(event) =>
            handlePreviewClick(event, {
              src: project.designImage,
              alt: `${project.title} design`,
              caption: '3D Design',
            })
          }
        />
        <Image
          src={project.resultImage}
          alt={`${project.title} result`}
          boxSize="52px"
          minW="52px"
          borderRadius="14px"
          objectFit="cover"
          bg="admin.surfaceAlt"
          border="1px solid"
          borderColor="admin.border"
          cursor="zoom-in"
          transition="transform 0.18s ease, border-color 0.18s ease"
          _hover={{
            transform: 'translateY(-1px)',
            borderColor: 'admin.borderStrong',
          }}
          onClick={(event) =>
            handlePreviewClick(event, {
              src: project.resultImage,
              alt: `${project.title} result`,
              caption: 'Result',
            })
          }
        />
      </Flex>

      <Box minW={0} flex="1">
        <Stack spacing={2} align="flex-start" minW={0}>
          <Text fontWeight="800" noOfLines={2} lineHeight="1.25">
            {project.title}
          </Text>
          <Flex gap={2} wrap="wrap">
            <ProjectCategoryBadge category={project.category} />
            <ProjectPublishBadge isPublished={project.isPublished} />
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
}
