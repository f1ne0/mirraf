import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Crumb = {
  label: string;
  to?: string;
};

type PageTitleProps = {
  title: string;
  description: string;
  breadcrumbs?: Crumb[];
};

export function PageTitle({ title, description, breadcrumbs = [] }: PageTitleProps) {
  return (
    <Stack spacing={3}>
      {breadcrumbs.length > 0 ? (
        <Breadcrumb fontSize="sm" color="admin.textSoft">
          {breadcrumbs.map((crumb) => (
            <BreadcrumbItem key={crumb.label}>
              {crumb.to ? (
                <BreadcrumbLink as={Link} to={crumb.to} _hover={{ color: 'admin.text' }}>
                  {crumb.label}
                </BreadcrumbLink>
              ) : (
                <Box as="span" color="admin.textMuted">
                  {crumb.label}
                </Box>
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      ) : null}
      <Stack spacing={1}>
        <Heading size="lg">{title}</Heading>
        <Text color="admin.textMuted" maxW="3xl" lineHeight={1.8}>
          {description}
        </Text>
      </Stack>
    </Stack>
  );
}

