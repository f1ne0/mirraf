import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

type EmptyStateProps = {
  icon: ReactElement;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Box
      bg="admin.surface"
      border="1px solid"
      borderColor="admin.border"
      borderRadius="24px"
      boxShadow="adminCard"
      p={{ base: 8, md: 12 }}
      textAlign="center"
    >
      <Stack spacing={4} align="center" maxW="lg" mx="auto">
        <Box color="accent.400" fontSize="40px" lineHeight="1">
          {icon}
        </Box>
        <Heading size="md">{title}</Heading>
        <Text color="admin.textMuted" lineHeight={1.8}>
          {description}
        </Text>
        {actionLabel && onAction ? (
          <Button onClick={onAction}>{actionLabel}</Button>
        ) : null}
      </Stack>
    </Box>
  );
}
