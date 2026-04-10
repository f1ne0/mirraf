import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

type SidebarItemProps = {
  label: string;
  to: string;
  icon: IconType;
  end?: boolean;
};

export function SidebarItem({
  label,
  to,
  icon,
  end = true,
}: SidebarItemProps) {
  return (
    <Box
      as={NavLink}
      to={to}
      end={end}
      display="block"
      px={4}
      py={3}
      borderRadius="18px"
      border="1px solid transparent"
      color="admin.textMuted"
      _hover={{
        textDecor: 'none',
      }}
      sx={{
        '&.active': {
          bg: 'rgba(195,165,116,0.12)',
          color: 'admin.text',
          borderColor: 'rgba(195,165,116,0.35)',
          boxShadow: 'inset 0 0 0 1px rgba(195,165,116,0.08)',
        },
        '&:not(.active):hover': {
          bg: 'rgba(255,255,255,0.04)',
          color: 'admin.text',
        },
      }}
    >
      <Flex align="center" gap={3}>
        <Icon as={icon} boxSize={4.5} color="currentColor" />
        <Text fontWeight="600">{label}</Text>
      </Flex>
    </Box>
  );
}
