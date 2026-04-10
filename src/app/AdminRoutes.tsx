import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { adminTheme } from './adminTheme';
import { AdminLoginPage } from '../pages/admin/login/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/dashboard/AdminDashboardPage';
import { AdminProjectsPage } from '../pages/admin/projects/AdminProjectsPage';
import { AdminProjectCreatePage } from '../pages/admin/projects/AdminProjectCreatePage';
import { AdminProjectEditPage } from '../pages/admin/projects/AdminProjectEditPage';
import { AdminLayout } from '../widgets/admin/AdminLayout';
import { PrivateRoute } from '../features/admin-auth/PrivateRoute';

export function AdminRoutes() {
  return (
    <ChakraProvider theme={adminTheme} resetCSS={false}>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="projects/create" element={<AdminProjectCreatePage />} />
          <Route path="projects/:id/edit" element={<AdminProjectEditPage />} />
          {/* <Route path="settings" element={<AdminSettingsPage />} /> */}
        </Route>
      </Routes>
    </ChakraProvider>
  );
}
