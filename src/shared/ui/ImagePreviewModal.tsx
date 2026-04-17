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

type ImagePreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageSrc: string | null;
  imageAlt: string;
  caption?: string;
};

export function ImagePreviewModal({
  isOpen,
  onClose,
  title,
  imageSrc,
  imageAlt,
  caption,
}: ImagePreviewModalProps) {
  if (!imageSrc) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="rgba(33, 26, 18, 0.42)" backdropFilter="blur(6px)" />
      <ModalContent
        bg="rgba(255, 250, 244, 0.98)"
        color="accent.900"
        border="1px solid"
        borderColor="blackAlpha.100"
        boxShadow="0 24px 80px rgba(31, 24, 16, 0.18)"
      >
        <ModalHeader>
          <Box>
            <Text fontWeight="800">{title}</Text>
            {caption ? (
              <Text mt={1} fontSize="sm" color="accent.700">
                {caption}
              </Text>
            ) : null}
          </Box>
        </ModalHeader>
        <ModalCloseButton color="accent.900" _hover={{ bg: 'blackAlpha.50' }} />
        <ModalBody pb={6}>
          <Box
            overflow="hidden"
            borderRadius="20px"
            border="1px solid"
            borderColor="blackAlpha.100"
            bg="rgba(245, 238, 229, 0.92)"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              w="100%"
              maxH={{ base: '70vh', md: '78vh' }}
              objectFit="contain"
              bg="rgba(245, 238, 229, 0.92)"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
