import { Avatar, Box, Button, Flex, Icon, Stack, Text, useToast } from '@chakra-ui/react';
import { FiFolder, FiGrid, FiLogOut, FiPlusCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../features/admin-auth/authService';
import { useAdminAuth } from '../../features/admin-auth/AuthProvider';
import { SidebarItem } from './SidebarItem';

const items = [
  { label: 'Панель', to: '/admin', icon: FiGrid, end: true },
  { label: 'Проекты', to: '/admin/projects', icon: FiFolder, end: true },
  { label: 'Добавить проект', to: '/admin/projects/create', icon: FiPlusCircle, end: true },
];

export function Sidebar() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAdminAuth();

  return (
    <Flex
      direction="column"
      h="full"
      bg="admin.sidebar"
      borderRight="1px solid"
      borderColor="admin.border"
      px={4}
      py={5}
    >
      <Stack spacing={8} flex="1" minH={0}>
        <Box px={2}>
          <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.3em" color="accent.300">
            Mirraf
          </Text>
          <Text fontSize="2xl" fontWeight="800">
            Панель проектов
          </Text>
        </Box>

        <Stack spacing={2}>
          {items.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
        </Stack>
      </Stack>

      <Stack
        spacing={4}
        pt={5}
        mt={5}
        borderTop="1px solid"
        borderColor="admin.border"
      >
        <Flex
          align="center"
          gap={3}
          px={3}
          py={3}
          borderRadius="20px"
          border="1px solid"
          borderColor="admin.border"
          bg="rgba(255,255,255,0.03)"
        >
          <Avatar size="sm" name="Admin User" bg="accent.400" color="admin.900" />
          <Box minW={0} flex="1">
            <Text fontSize="sm" fontWeight="700" noOfLines={1}>
              {user?.user_metadata?.full_name || user?.email || 'Admin User'}
            </Text>
            <Text fontSize="xs" color="admin.textMuted" noOfLines={1}>
              {user?.email || 'No email'}
            </Text>
          </Box>
        </Flex>

        <Button
          variant="adminGhost"
          justifyContent="flex-start"
          leftIcon={<Icon as={FiLogOut} color="admin.textMuted" />}
          onClick={async () => {
            try {
              await logoutAdmin();
              navigate('/admin/login', { replace: true });
            } catch (error) {
              toast({
                title: error instanceof Error ? error.message : 'Не удалось выйти.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          Logout
        </Button>
      </Stack>
    </Flex>
  );
}
