import { Badge, BadgeProps } from '@chakra-ui/react';

type ProjectPublishBadgeProps = {
  isPublished: boolean;
} & BadgeProps;

export function ProjectPublishBadge({
  isPublished,
  ...props
}: ProjectPublishBadgeProps) {
  return (
    <Badge
      px={3}
      py={1}
      borderRadius="full"
      fontSize="xs"
      fontWeight="700"
      textTransform="none"
      border="1px solid"
      bg={isPublished ? 'rgba(86,166,122,0.14)' : 'rgba(255,255,255,0.05)'}
      color={isPublished ? 'success.500' : 'admin.textMuted'}
      borderColor={isPublished ? 'rgba(86,166,122,0.28)' : 'admin.borderStrong'}
      {...props}
    >
      {isPublished ? 'Опубликован' : 'Черновик'}
    </Badge>
  );
}
