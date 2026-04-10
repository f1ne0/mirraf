import { Heading, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: 'left' | 'center';
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionTitleProps) {
  return (
    <Stack spacing={3} textAlign={align} maxW="3xl">
      {eyebrow ? (
        <Text
          textTransform="uppercase"
          letterSpacing="0.28em"
          fontSize="xs"
          fontWeight="800"
          color="brand.600"
        >
          {eyebrow}
        </Text>
      ) : null}
      <Heading
        as="h2"
        fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
        lineHeight={0.95}
        color="accent.900"
      >
        {title}
      </Heading>
      {description ? (
        <Text fontSize={{ base: 'sm', md: 'md' }} color="accent.600" maxW="2xl">
          {description}
        </Text>
      ) : null}
    </Stack>
  );
}

