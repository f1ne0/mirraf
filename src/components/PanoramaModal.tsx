import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type PanoramaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  panoramaUrl: string;
};

export function PanoramaModal({
  isOpen,
  onClose,
  title,
  panoramaUrl,
}: PanoramaModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(6px)" />
      <ModalContent bg="accent.900" color="white" mx={4} borderRadius="3xl" overflow="hidden">
        <ModalHeader fontSize={{ base: 'xl', md: '2xl' }}>{title}</ModalHeader>
        <ModalCloseButton top={5} right={5} />
        <ModalBody pb={6}>
          <Box
            overflow="hidden"
            borderRadius="2xl"
            bg="blackAlpha.400"
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            {isOpen ? (
              <Box
                as="iframe"
                src={panoramaUrl}
                title={`${title} panorama`}
                width="100%"
                minH={{ base: '320px', md: '520px' }}
                border="0"
                loading="lazy"
                allowFullScreen
              />
            ) : null}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

