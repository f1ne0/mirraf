import { Button, Center } from '@chakra-ui/react';

type LoadMoreButtonProps = {
  onClick: () => void;
};

export function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <Center pt={{ base: 2, md: 4 }}>
      <Button
        onClick={onClick}
        size="lg"
        px={8}
        py={6}
        boxShadow="soft"
        _hover={{ transform: 'translateY(-2px)', boxShadow: '0 22px 55px rgba(20, 24, 28, 0.18)' }}
        transition="all 0.25s ease"
      >
        Және жойбарларды көриў
      </Button>
    </Center>
  );
}
