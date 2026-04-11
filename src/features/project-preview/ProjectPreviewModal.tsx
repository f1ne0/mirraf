import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { Project } from '../../entities/project/model/types';

type ProjectPreviewModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectPreviewModal({ project, isOpen, onClose }: ProjectPreviewModalProps) {
  if (!project || !project.panoramaUrl) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: 'full', lg: '6xl' }}
      isCentered
      motionPreset="none"
      blockScrollOnMount={false}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent>
        <ModalHeader>
          <HStack justify="space-between" align="center" pr={10} spacing={4}>
            <Text noOfLines={1}>{project.title}</Text>
            <Button
              as="a"
              href={project.panoramaUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              leftIcon={<FiExternalLink />}
              flexShrink={0}
            >
              Открыть отдельно
            </Button>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={{ base: 0, lg: 6 }} px={{ base: 0, lg: 6 }}>
          <iframe
            src={project.panoramaUrl}
            title={`${project.title} preview`}
            width="100%"
            height="100%"
            style={{
              border: 0,
              borderRadius: 18,
              minHeight: 'calc(100dvh - 92px)',
            }}
            loading="eager"
            allowFullScreen
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; magnetometer"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
