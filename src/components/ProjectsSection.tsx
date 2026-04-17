import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePublishedProjectsQuery } from '../entities/project/api/projectQueries';
import {
  ALL_PROJECT_CATEGORIES_VALUE,
  getProjectCategoryLabel,
  isProjectCategory,
  PROJECT_CATEGORY_VALUES,
  ProjectCategory,
} from '../entities/project/model/categories';
import { LoadMoreButton } from './LoadMoreButton';
import { ProjectCard } from './ProjectCard';
import { SectionTitle } from './SectionTitle';

const PROJECTS_PER_BATCH = 3;
const MotionBox = motion(Box);
const MotionStack = motion(Stack);

function ProjectCardSkeleton() {
  return (
    <Stack
      spacing={{ base: 6, md: 8 }}
      bg="rgba(255,255,255,0.76)"
      borderRadius={{ base: '3xl', md: '32px' }}
      p={{ base: 4, sm: 5, md: 8 }}
      border="1px solid"
      borderColor="blackAlpha.100"
      boxShadow="soft"
    >
      <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 5, md: 6 }}>
        <Skeleton h={{ base: '220px', md: '260px' }} borderRadius="2xl" fadeDuration={0.2} />
        <Skeleton h={{ base: '220px', md: '260px' }} borderRadius="2xl" fadeDuration={0.2} />
      </Stack>
      <Stack spacing={4}>
        <Skeleton h="28px" w="140px" borderRadius="full" />
        <Skeleton h="42px" w={{ base: '75%', md: '45%' }} borderRadius="lg" />
        <Skeleton h="16px" w="100%" borderRadius="full" />
        <Skeleton h="16px" w="82%" borderRadius="full" />
        <Skeleton h="18px" w="55%" borderRadius="full" />
      </Stack>
    </Stack>
  );
}

export function ProjectsSection() {
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_BATCH);
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionRef = useRef<HTMLElement | null>(null);
  const categoryParam = searchParams.get('category');
  const selectedCategory =
    categoryParam && isProjectCategory(categoryParam)
      ? categoryParam
      : ALL_PROJECT_CATEGORIES_VALUE;
  const projectsQuery = usePublishedProjectsQuery();

  const categoryCounts = useMemo(
    () =>
      (projectsQuery.data ?? []).reduce(
        (acc, project) => {
          acc[project.category] += 1;
          return acc;
        },
        {
          kitchen: 0,
          bedroom: 0,
          children: 0,
          living_room: 0,
          hallway: 0,
          office: 0,
          other: 0,
        } as Record<ProjectCategory, number>,
      ),
    [projectsQuery.data],
  );

  const filteredProjects = useMemo(
    () =>
      (projectsQuery.data ?? []).filter((project) =>
        selectedCategory === ALL_PROJECT_CATEGORIES_VALUE
          ? true
          : project.category === selectedCategory,
      ),
    [projectsQuery.data, selectedCategory],
  );

  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount],
  );

  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + PROJECTS_PER_BATCH, filteredProjects.length),
    );
  };

  const handleCategoryChange = (
    nextCategory: typeof ALL_PROJECT_CATEGORIES_VALUE | ProjectCategory,
  ) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextCategory === ALL_PROJECT_CATEGORIES_VALUE) {
      nextParams.delete('category');
    } else {
      nextParams.set('category', nextCategory);
    }

    setSearchParams(nextParams, { replace: true });
    setVisibleCount(PROJECTS_PER_BATCH);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <MotionBox
      as="section"
      id="projects"
      ref={sectionRef}
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

          <ButtonGroup spacing={3} flexWrap="wrap">
            <Button
              size="sm"
              bg={
                selectedCategory === ALL_PROJECT_CATEGORIES_VALUE
                  ? 'accent.900'
                  : 'rgba(255,255,255,0.66)'
              }
              color={
                selectedCategory === ALL_PROJECT_CATEGORIES_VALUE ? 'white' : 'accent.900'
              }
              border="1px solid"
              borderColor={
                selectedCategory === ALL_PROJECT_CATEGORIES_VALUE
                  ? 'accent.900'
                  : 'rgba(33, 25, 15, 0.12)'
              }
              boxShadow={
                selectedCategory === ALL_PROJECT_CATEGORIES_VALUE
                  ? '0 16px 36px rgba(33, 25, 15, 0.18)'
                  : 'none'
              }
              _hover={{
                bg:
                  selectedCategory === ALL_PROJECT_CATEGORIES_VALUE
                    ? 'accent.800'
                    : 'rgba(255,255,255,0.92)',
              }}
              onClick={() => handleCategoryChange(ALL_PROJECT_CATEGORIES_VALUE)}
            >
              Все ({projectsQuery.data?.length ?? 0})
            </Button>
            {PROJECT_CATEGORY_VALUES.map((category) => (
              <Button
                key={category}
                size="sm"
                bg={selectedCategory === category ? 'accent.900' : 'rgba(255,255,255,0.66)'}
                color={selectedCategory === category ? 'white' : 'accent.900'}
                border="1px solid"
                borderColor={
                  selectedCategory === category ? 'accent.900' : 'rgba(33, 25, 15, 0.12)'
                }
                boxShadow={
                  selectedCategory === category
                    ? '0 16px 36px rgba(33, 25, 15, 0.18)'
                    : 'none'
                }
                _hover={{
                  bg:
                    selectedCategory === category ? 'accent.800' : 'rgba(255,255,255,0.92)',
                }}
                onClick={() => handleCategoryChange(category)}
              >
                {getProjectCategoryLabel(category)} ({categoryCounts[category]})
              </Button>
            ))}
          </ButtonGroup>

          {projectsQuery.isLoading ? (
            <Stack spacing={{ base: 6, md: 10 }}>
              {Array.from({ length: 2 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </Stack>
          ) : (
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
          )}

          {!projectsQuery.isLoading && !projectsQuery.isError && filteredProjects.length === 0 ? (
            <Stack spacing={4} align={{ base: 'stretch', sm: 'center' }}>
              <Text color="accent.700">
                По выбранной категории пока нет опубликованных проектов.
              </Text>
              <Button
                alignSelf={{ base: 'stretch', sm: 'center' }}
                variant="outline"
                onClick={() => handleCategoryChange(ALL_PROJECT_CATEGORIES_VALUE)}
              >
                Показать все проекты
              </Button>
            </Stack>
          ) : null}

          {hasMore ? <LoadMoreButton onClick={handleLoadMore} /> : null}
        </Stack>
      </Container>
    </MotionBox>
  );
}
