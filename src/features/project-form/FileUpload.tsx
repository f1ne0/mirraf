import { Box, HStack, Icon, Image, Input, Stack, Text } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

type FileUploadProps = {
  label: string;
  preview?: string;
  accept?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function FileUpload({
  label,
  preview,
  accept = 'image/png,image/jpeg,image/jpg,image/webp',
  onChange,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Stack spacing={3}>
      <Text fontWeight="700">{label}</Text>
      <Box
        onClick={() => inputRef.current?.click()}
        border="1px dashed"
        borderColor="admin.borderStrong"
        borderRadius="22px"
        bg="rgba(255,255,255,0.04)"
        px={5}
        py={5}
        cursor="pointer"
        transition="all 0.2s ease"
        _hover={{
          borderColor: 'accent.400',
          bg: 'rgba(255,255,255,0.06)',
        }}
      >
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onChange}
          display="none"
        />
        <HStack spacing={4} align="flex-start">
          <Icon as={FiUploadCloud} boxSize={6} color="accent.400" mt={1} />
          <Stack spacing={1}>
            <Text fontWeight="700">Загрузите изображение</Text>
            <Text color="admin.textMuted" fontSize="sm">
              Поддерживаются JPG, PNG и WEBP. Максимум 5MB.
            </Text>
          </Stack>
        </HStack>
      </Box>

      {preview ? (
        <Image
          src={preview}
          alt={`${label} preview`}
          h="180px"
          w="100%"
          objectFit="cover"
          borderRadius="20px"
          border="1px solid"
          borderColor="admin.border"
        />
      ) : null}
    </Stack>
  );
}

