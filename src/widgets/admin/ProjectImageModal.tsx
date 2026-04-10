import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

type ProjectImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  imageAlt: string;
  title: string;
  caption?: string;
};

export function ProjectImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  caption,
}: ProjectImageModalProps) {
  if (!imageSrc) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.760" backdropFilter="blur(6px)" />
      <ModalContent>
        <ModalHeader>
          <Box>
            <Text fontWeight="800">{title}</Text>
            {caption ? (
              <Text mt={1} fontSize="sm" color="admin.textMuted">
                {caption}
              </Text>
            ) : null}
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box
            overflow="hidden"
            borderRadius="20px"
            border="1px solid"
            borderColor="admin.border"
            bg="admin.surfaceAlt"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              w="100%"
              maxH={{ base: '70vh', md: '78vh' }}
              objectFit="contain"
              bg="admin.surfaceAlt"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
