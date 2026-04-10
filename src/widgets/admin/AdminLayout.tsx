import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, useDisclosure } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AdminHeader } from './AdminHeader';

const meta: Record<string, { title: string; description: string }> = {
  '/admin': {
    title: 'Dashboard',
    description: 'Обзор состояния панели, основных действий и текущих данных.',
  },
  '/admin/projects': {
    title: 'Projects',
    description: 'Управление мебельными проектами, превью изображений и 360-ссылками.',
  },
  '/admin/projects/create': {
    title: 'Add Project',
    description: 'Создание нового проекта с файлами, ценой и ссылкой на панораму.',
  },
  '/admin/settings': {
    title: 'Settings',
    description: 'Настройки админ-панели и подготовка к будущей интеграции backend.',
  },
};

export function AdminLayout() {
  const drawer = useDisclosure();
  const location = useLocation();

  const current = meta[location.pathname] ?? {
    title: 'Edit Project',
    description: 'Редактирование существующего проекта и обновление медиафайлов.',
  };

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
        <AdminHeader
          title={current.title}
          description={current.description}
          onOpenMenu={drawer.onOpen}
        />
        <Box flex="1">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}

