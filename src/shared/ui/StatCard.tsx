import { Box, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type StatCardProps = {
  icon: IconType;
  label: string;
  value: string | number;
};

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Box
      bg="admin.surface"
      border="1px solid"
      borderColor="admin.border"
      borderRadius="24px"
      boxShadow="adminCard"
      p={5}
    >
      <Stack spacing={3}>
        <Icon as={icon} boxSize={6} color="accent.400" />
        <Text color="admin.textMuted">{label}</Text>
        <Heading size="lg">{value}</Heading>
      </Stack>
    </Box>
  );
}

