import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

type AdminHeaderProps = {
  title: string;
  description: string;
  onOpenMenu: () => void;
};

export function AdminHeader({ title, description, onOpenMenu }: AdminHeaderProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      px={{ base: 4, md: 6 }}
      py={4}
      borderBottom="1px solid"
      borderColor="admin.border"
      bg="rgba(11,18,24,0.86)"
      position="sticky"
      top={0}
      zIndex={10}
      backdropFilter="blur(10px)"
    >
      <HStack spacing={3} align="center">
        <IconButton
          aria-label="Open menu"
          icon={<FiMenu />}
          display={{ base: 'inline-flex', lg: 'none' }}
          variant="adminGhost"
          color="admin.text"
          onClick={onOpenMenu}
        />
        <Box>
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="800">
            {title}
          </Text>
          <Text fontSize="sm" color="admin.textMuted">
            {description}
          </Text>
        </Box>
      </HStack>

      <Box
        display={{ base: 'none', md: 'block' }}
        px={3}
        py={2}
        borderRadius="16px"
        bg="rgba(255,255,255,0.03)"
        border="1px solid"
        borderColor="admin.border"
      >
        <Text fontSize="sm" color="admin.textMuted">
          Furniture Projects Admin
        </Text>
      </Box>
    </Flex>
  );
}
