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
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent
        bg="accent.900"
        color="white"
        mx={{ base: 0, lg: 4 }}
        my={{ base: 0, lg: 6 }}
        borderRadius={{ base: '0', lg: '3xl' }}
        overflow="hidden"
      >
        <ModalHeader fontSize={{ base: 'xl', md: '2xl' }}>
          <HStack justify="space-between" align="center" pr={10} spacing={4}>
            <Text noOfLines={1}>{title}</Text>
            <Button
              as="a"
              href={panoramaUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              color="whiteAlpha.900"
              leftIcon={<FiExternalLink />}
              flexShrink={0}
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              Открыть отдельно
            </Button>
          </HStack>
        </ModalHeader>
        <ModalCloseButton top={5} right={5} />
        <ModalBody pb={{ base: 0, lg: 6 }} px={{ base: 0, lg: 6 }}>
          <Box
            overflow="hidden"
            borderRadius={{ base: '0', lg: '2xl' }}
            bg="blackAlpha.400"
            border="1px solid"
            borderColor="whiteAlpha.200"
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
