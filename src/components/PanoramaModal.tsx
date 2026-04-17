import {
  Box,
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: 'full', lg: '6xl' }}
      isCentered
      motionPreset="none"
      blockScrollOnMount={false}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="rgba(33, 26, 18, 0.42)" backdropFilter="blur(6px)" />
      <ModalContent
        bg="rgba(255, 250, 244, 0.98)"
        color="accent.900"
        mx={{ base: 0, lg: 4 }}
        my={{ base: 0, lg: 6 }}
        borderRadius={{ base: '0', lg: '3xl' }}
        overflow="hidden"
        border="1px solid"
        borderColor="blackAlpha.100"
        boxShadow="0 28px 90px rgba(31, 24, 16, 0.18)"
      >
        <ModalHeader fontSize={{ base: 'xl', md: '2xl' }}>
          <HStack justify="space-between" align="center" pr={10} spacing={4}>
            <Text noOfLines={1}>{title}</Text>
            <Button
              as="a"
              href={panoramaUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              color="accent.900"
              borderColor="blackAlpha.200"
              leftIcon={<FiExternalLink />}
              flexShrink={0}
              _hover={{ bg: 'blackAlpha.50', borderColor: 'blackAlpha.300' }}
            >
              Открыть отдельно
            </Button>
          </HStack>
        </ModalHeader>
        <ModalCloseButton
          top={5}
          right={5}
          color="accent.900"
          _hover={{ bg: 'blackAlpha.50' }}
        />
        <ModalBody pb={{ base: 0, lg: 6 }} px={{ base: 0, lg: 6 }}>
          <Box
            overflow="hidden"
            borderRadius={{ base: '0', lg: '2xl' }}
            bg="rgba(245, 238, 229, 0.92)"
            border="1px solid"
            borderColor="blackAlpha.100"
            h={{ base: 'calc(100dvh - 92px)', lg: 'min(78dvh, 760px)' }}
          >
            {isOpen ? (
              <Box
                as="iframe"
                src={panoramaUrl}
                title={`${title} panorama`}
                width="100%"
                h="100%"
                border="0"
                loading="eager"
                allowFullScreen
                allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer; magnetometer"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : null}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
