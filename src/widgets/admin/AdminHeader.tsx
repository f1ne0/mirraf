import { Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

type AdminHeaderProps = {
  onOpenMenu: () => void;
};

export function AdminHeader({ onOpenMenu }: AdminHeaderProps) {
  return (
    <Flex
      align="center"
      justify="flex-start"
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
        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="800">
          Mirraf Admin
        </Text>
      </HStack>
    </Flex>
  );
}
