import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import mirrafLogo from "../assets/mirraf-logo.png";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionStack = motion(Stack);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

const heroContainer = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 90]);
  const glowY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 130]);
  const contentY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : -36]);
  const contentOpacity = useTransform(scrollY, [0, 320], [1, shouldReduceMotion ? 1 : 0.78]);

  const handleScroll = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      as="section"
      position="relative"
      minH={{ base: "100svh", md: "95vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgImage="url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80')"
      bgSize="cover"
      bgPosition="center"
      isolation="isolate"
      overflow="hidden"
    >
      <MotionBox
        position="absolute"
        inset={0}
        bg="linear-gradient(180deg, rgba(7, 10, 13, 0.46) 0%, rgba(7, 10, 13, 0.7) 42%, rgba(7, 10, 13, 0.88) 100%)"
        zIndex={-1}
        style={{ y: backgroundY }}
      />
      <MotionBox
        position="absolute"
        insetX={{ base: "-20%", md: "auto" }}
        top={{ base: "14%", md: "12%" }}
        right={{ md: "8%" }}
        w={{ base: "280px", md: "420px" }}
        h={{ base: "280px", md: "420px" }}
        bg="radial-gradient(circle, rgba(184, 139, 70, 0.26) 0%, rgba(184, 139, 70, 0) 68%)"
        filter="blur(10px)"
        zIndex={-1}
        style={{ y: glowY }}
      />

      <Container maxW="container.xl" px={{ base: 5, sm: 6, md: 8 }} py={{ base: 10, sm: 12, md: 20 }}>
        <MotionFlex
          minH={{ base: "100svh", md: "auto" }}
          align="center"
          justify="center"
          initial="hidden"
          animate="visible"
          variants={heroContainer}
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <MotionStack
            spacing={{ base: 5, sm: 6, md: 8 }}
            textAlign="center"
            align="center"
            maxW={{ base: "100%", sm: "2xl", lg: "4xl" }}
            mx="auto"
            py={{ base: 8, md: 0 }}
          >
            <MotionFlex
              align="center"
              justify="center"
              px={{ base: 4, md: 5 }}
              py={{ base: 4, md: 5 }}
              rounded="32px"
              border="1px solid"
              borderColor="whiteAlpha.300"
              bg="linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%)"
              backdropFilter="blur(14px)"
              boxShadow="0 18px 48px rgba(0, 0, 0, 0.22)"
              variants={heroItem}
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <Image
                src={mirrafLogo}
                alt="Mirraf logo"
                h={{ base: "56px", sm: "64px", md: "84px" }}
                objectFit="contain"
                filter="drop-shadow(0 8px 20px rgba(0,0,0,0.16))"
              />
            </MotionFlex>

            <MotionStack spacing={{ base: 3, md: 4 }} align="center" variants={heroItem}>
              <MotionText
                color="brand.100"
                letterSpacing={{ base: "0.28em", md: "0.42em" }}
                textTransform="uppercase"
                fontSize={{ base: "10px", sm: "xs", md: "sm" }}
                fontWeight="800"
                pl={{ base: "0.28em", md: "0.42em" }}
              >
                Mirraf Mebel
              </MotionText>

              <MotionHeading
                as="h1"
                color="white"
                fontSize={{ base: "3xl", sm: "4xl", md: "6xl", lg: "7xl" }}
                lineHeight={{ base: 1.02, md: 0.95 }}
                letterSpacing="-0.02em"
                maxW={{ base: "12ch", sm: "13ch", md: "4xl" }}
              >
                Неге бизди танлауынгыз керек?
              </MotionHeading>

              <MotionText
                color="rgba(255, 248, 238, 0.92)"
                fontSize={{ base: "sm", sm: "md", md: "xl" }}
                maxW={{ base: "34ch", md: "2xl" }}
                lineHeight={{ base: 1.75, md: 1.8 }}
              >
                Сыпатлы материал, нәзик детал ҳәм узақ мүддетке хызмет ететуғын мебель
                шешимлери менен үйиңизге исеним ҳәм қымбат көринис беремиз.
              </MotionText>
            </MotionStack>

            <MotionButton
              size={{ base: "md", sm: "lg" }}
              w={{ base: "100%", sm: "auto" }}
              minW={{ sm: "240px" }}
              px={{ base: 6, md: 8 }}
              py={{ base: 6, md: 7 }}
              onClick={handleScroll}
              boxShadow="0 16px 36px rgba(184, 139, 70, 0.35)"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 20px 44px rgba(184, 139, 70, 0.42)",
              }}
              transition="all 0.25s ease"
              variants={heroItem}
              whileTap={{ scale: 0.98 }}
            >
              Проектлерди көриў
            </MotionButton>
          </MotionStack>
        </MotionFlex>
      </Container>
    </Box>
  );
}
