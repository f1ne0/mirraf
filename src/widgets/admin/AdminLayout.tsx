import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AdminHeader } from './AdminHeader';

export function AdminLayout() {
  const drawer = useDisclosure();

  return (
    <Flex minH="100vh" bg="linear-gradient(180deg, #0B1218 0%, #101922 100%)">
      <Box display={{ base: 'none', lg: 'block' }} w="288px" h="100vh" position="sticky" top={0}>
        <Sidebar />
      </Box>

      <Drawer isOpen={drawer.isOpen} onClose={drawer.onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent maxW="288px" bg="transparent" boxShadow="none">
          <Sidebar />
        </DrawerContent>
      </Drawer>

      <Flex direction="column" flex="1" minW={0}>
        <AdminHeader onOpenMenu={drawer.onOpen} />
        <Box flex="1">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
