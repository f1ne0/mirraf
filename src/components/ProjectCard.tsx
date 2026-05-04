import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProjectCategoryBadge } from '../entities/project/ui/ProjectCategoryBadge';
import { Project } from '../types/project';
import { ImagePreviewModal } from '../shared/ui/ImagePreviewModal';
import { PanoramaModal } from './PanoramaModal';

const MotionStack = motion(Stack);

const cardReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type ProjectCardProps = {
  project: Project;
};

type ImagePanelProps = {
  src: string;
  alt: string;
  label: string;
  onOpen: () => void;
};

function ImagePanel({ src, alt, label, onOpen }: ImagePanelProps) {
  return (
    <Stack spacing={3}>
      <Badge
        alignSelf="flex-start"
        px={3}
        py={1.5}
        rounded="full"
        bg="brand.100"
        color="brand.700"
        fontSize="xs"
        textTransform="none"
      >
        {label}
      </Badge>
      <AspectRatio ratio={4 / 3}>
        <Box overflow="hidden" rounded="2xl" boxShadow="soft">
          <Image
            src={src}
            alt={alt}
            w="100%"
            h="100%"
            objectFit="cover"
            cursor="zoom-in"
            transition="transform 0.45s ease"
            _hover={{ transform: 'scale(1.04)' }}
            onClick={onOpen}
          />
        </Box>
      </AspectRatio>
    </Stack>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const panorama = useDisclosure();
  const imagePreview = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  return (
    <>
      <MotionStack
        as="article"
        spacing={{ base: 6, md: 8 }}
        bg="rgba(255,255,255,0.92)"
        borderRadius={{ base: '3xl', md: '32px' }}
        p={{ base: 4, sm: 5, md: 8 }}
        boxShadow="soft"
        border="1px solid"
        borderColor="blackAlpha.100"
        backdropFilter="blur(10px)"
        transition="transform 0.25s ease, box-shadow 0.25s ease"
        _hover={{ transform: 'translateY(-4px)', boxShadow: '0 26px 70px rgba(20, 24, 28, 0.16)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={cardReveal}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, md: 6 }}>
          <ImagePanel
            src={project.designImage}
            alt={`${project.title} 3D дизайн`}
            label="3D Дизайн"
            onOpen={() => {
              setSelectedImage({
                src: project.designImage,
                alt: `${project.title} 3D дизайн`,
                caption: '3D Дизайн',
              });
              imagePreview.onOpen();
            }}
          />
          <ImagePanel
            src={project.resultImage}
            alt={`${project.title} әмелде`}
            label="Әмелде"
            onOpen={() => {
              setSelectedImage({
                src: project.resultImage,
                alt: `${project.title} әмелде`,
                caption: 'Әмелде',
              });
              imagePreview.onOpen();
            }}
          />
        </SimpleGrid>

        <Stack spacing={4}>
          <Stack spacing={2}>
            <ProjectCategoryBadge
              category={project.category}
              tone="public"
              alignSelf="flex-start"
            />
            <Heading as="h3" fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }} color="accent.900">
              {project.title}
            </Heading>
            {project.description ? (
              <Text color="accent.700" fontSize={{ base: 'sm', md: 'md' }} lineHeight={1.8}>
                {project.description}
              </Text>
            ) : null}
          </Stack>

          <Stack spacing={1.5} color="accent.800" fontSize={{ base: 'sm', md: 'md' }} fontWeight="500">
            <Text>
              <Box as="span" color="accent.900" fontWeight="700">
                Манзил:
              </Box>{' '}
              {project.address}
            </Text>
            <Text>
              <Box as="span" color="accent.900" fontWeight="700">
                Проект баҳасы:
              </Box>{' '}
              {new Intl.NumberFormat('ru-RU').format(project.price)} сум
            </Text>
          </Stack>

          {project.panoramaUrl ? (
            <Button
              alignSelf={{ base: 'stretch', sm: 'flex-start' }}
              size={{ base: 'md', md: 'lg' }}
              onClick={panorama.onOpen}
              px={6}
              _hover={{ transform: 'translateY(-1px)' }}
              transition="all 0.2s ease"
            >
              Проекты 360 градуста коргыз келсе
            </Button>
          ) : null}
        </Stack>
      </MotionStack>

      <PanoramaModal
        isOpen={panorama.isOpen}
        onClose={panorama.onClose}
        title={project.title}
        panoramaUrl={project.panoramaUrl ?? ''}
      />

      <ImagePreviewModal
        isOpen={imagePreview.isOpen}
        onClose={imagePreview.onClose}
        title={project.title}
        imageSrc={selectedImage?.src ?? null}
        imageAlt={selectedImage?.alt ?? ''}
        caption={selectedImage?.caption}
      />
    </>
  );
}
