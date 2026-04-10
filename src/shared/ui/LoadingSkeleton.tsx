import { Box, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';

type LoadingSkeletonProps = {
  rows?: number;
};

export function LoadingSkeleton({ rows = 4 }: LoadingSkeletonProps) {
  return (
    <Box
      bg="admin.surface"
      border="1px solid"
      borderColor="admin.border"
      borderRadius="24px"
      boxShadow="adminCard"
      p={{ base: 4, md: 6 }}
    >
      <Stack spacing={4}>
        {Array.from({ length: rows }).map((_, index) => (
          <Stack
            key={index}
            direction="row"
            align="center"
            spacing={4}
            p={3}
            borderRadius="18px"
            bg="rgba(255,255,255,0.02)"
          >
            <SkeletonCircle size="12" startColor="whiteAlpha.100" endColor="whiteAlpha.200" />
            <Stack flex="1" spacing={3}>
              <Skeleton h="16px" borderRadius="full" startColor="whiteAlpha.100" endColor="whiteAlpha.200" />
              <Skeleton h="12px" w="70%" borderRadius="full" startColor="whiteAlpha.100" endColor="whiteAlpha.200" />
            </Stack>
            <Skeleton h="36px" w="130px" borderRadius="16px" startColor="whiteAlpha.100" endColor="whiteAlpha.200" />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

