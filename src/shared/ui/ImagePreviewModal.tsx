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
      <ModalOverlay bg="blackAlpha.760" backdropFilter="blur(6px)" />
      <ModalContent>
        <ModalHeader>
          <Box>
            <Text fontWeight="800">{title}</Text>
            {caption ? (
              <Text mt={1} fontSize="sm" color="gray.500">
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
            borderColor="blackAlpha.200"
            bg="gray.50"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              w="100%"
              maxH={{ base: '70vh', md: '78vh' }}
              objectFit="contain"
              bg="gray.50"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
