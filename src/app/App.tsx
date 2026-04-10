import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminRoutes } from './AdminRoutes';
import { HeroSection } from '../components/HeroSection';
import { ProjectsSection } from '../components/ProjectsSection';

export default function App() {
  useEffect(() => {
    document.title = 'MIRRAF Мебель | Премиум мебель жойбарлары';
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Box as="main">
            <HeroSection />
            <ProjectsSection />
          </Box>
        }
      />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
