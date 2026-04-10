import { Container, ContainerProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type PageContainerProps = ContainerProps & {
  children: ReactNode;
};

export function PageContainer({ children, ...props }: PageContainerProps) {
  return (
    <Container maxW="7xl" px={{ base: 4, md: 6 }} py={{ base: 5, md: 7 }} {...props}>
      {children}
    </Container>
  );
}

