import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Project } from '../../entities/project/model/types';

type ProjectPreviewModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectPreviewModal({ project, isOpen, onClose }: ProjectPreviewModalProps) {
  if (!project || !project.panoramaUrl) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>{project.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <iframe
            src={project.panoramaUrl}
            title={`${project.title} preview`}
            width="100%"
            height="560"
            style={{ border: 0, borderRadius: 18 }}
            loading="lazy"
            allowFullScreen
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
