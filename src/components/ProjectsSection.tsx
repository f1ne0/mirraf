import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { usePublishedProjectsQuery } from '../entities/project/api/projectQueries';
import { LoadMoreButton } from './LoadMoreButton';
import { ProjectCard } from './ProjectCard';
import { SectionTitle } from './SectionTitle';

const PROJECTS_PER_BATCH = 3;
const MotionBox = motion(Box);
const MotionStack = motion(Stack);

export function ProjectsSection() {
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_BATCH);
  const projectsQuery = usePublishedProjectsQuery();

  const visibleProjects = useMemo(
    () => (projectsQuery.data ?? []).slice(0, visibleCount),
    [projectsQuery.data, visibleCount],
  );

  const hasMore = visibleCount < (projectsQuery.data?.length ?? 0);

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + PROJECTS_PER_BATCH, projectsQuery.data?.length ?? current),
    );
  };

  return (
    <MotionBox
      as="section"
      id="projects"
      py={{ base: 12, md: 20, lg: 24 }}
      bg="linear-gradient(180deg, #f6f2ec 0%, #f1ebe2 100%)"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl" px={{ base: 5, sm: 6, md: 8 }}>
        <Stack spacing={{ base: 8, md: 10 }}>
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionTitle
              eyebrow="Жойбарлар"
              title="Алдын ыслеген проектлерымыз"
              description="Ҳәр бир жойбар 3D дизайн менен басланып, сапалы орнатыў менен жуўмақланады. Төмендеги жумыслар бизиң усылымыз ҳәм нәтийжелеримизди көрсетеди."
            />
          </MotionBox>

          {projectsQuery.isError ? (
            <Text color="red.500">Проектлерди жүклеўде қәте болды.</Text>
          ) : null}

          <MotionStack
            spacing={{ base: 6, md: 10 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </MotionStack>

          {hasMore ? <LoadMoreButton onClick={handleLoadMore} /> : null}
        </Stack>
      </Container>
    </MotionBox>
  );
}
