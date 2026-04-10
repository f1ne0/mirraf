import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Project } from '../../entities/project/model/types';

type ProjectCellProps = {
  project: Project;
  onImagePreview: (payload: { src: string; alt: string; caption: string }) => void;
};

export function ProjectCell({ project, onImagePreview }: ProjectCellProps) {
  return (
    <Flex align="center" gap={4} minW={0}>
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
          onClick={() =>
            onImagePreview({
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
          onClick={() =>
            onImagePreview({
              src: project.resultImage,
              alt: `${project.title} result`,
              caption: 'Result',
            })
          }
        />
      </Flex>

      <Box minW={0} flex="1">
        <Text fontWeight="800" noOfLines={1}>
          {project.title}
        </Text>
        <Text fontSize="sm" color="admin.textMuted" noOfLines={1}>
          ID: {project.id}
        </Text>
      </Box>
    </Flex>
  );
}
