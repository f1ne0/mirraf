import { Badge, BadgeProps } from '@chakra-ui/react';
import { getProjectCategoryLabel, ProjectCategory } from '../model/categories';

type ProjectCategoryBadgeProps = {
  category: ProjectCategory;
  tone?: 'admin' | 'public';
} & BadgeProps;

export function ProjectCategoryBadge({
  category,
  tone = 'admin',
  ...props
}: ProjectCategoryBadgeProps) {
  return (
    <Badge
      px={3}
      py={1}
      borderRadius="full"
      bg={tone === 'public' ? 'brand.100' : 'rgba(176, 123, 59, 0.12)'}
      color={tone === 'public' ? 'brand.700' : 'accent.200'}
      border="1px solid"
      borderColor={tone === 'public' ? 'transparent' : 'rgba(176, 123, 59, 0.22)'}
      fontSize="xs"
      fontWeight="700"
      textTransform="none"
      letterSpacing="0.01em"
      {...props}
    >
      {getProjectCategoryLabel(category)}
    </Badge>
  );
}
