import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#f8f4ee",
      100: "#efe4d4",
      200: "#e4d0b0",
      300: "#d7bb8c",
      400: "#c7a266",
      500: "#b88b46",
      600: "#926b34",
      700: "#6c4d23",
      800: "#473116",
      900: "#26190a",
    },
    accent: {
      50: "#f5f7f8",
      100: "#d9e0e3",
      200: "#bcc8cd",
      300: "#9eafb6",
      400: "#8196a0",
      500: "#667c87",
      600: "#4f6169",
      700: "#39484d",
      800: "#232e31",
      900: "#0f1416",
    },
    surface: {
      50: "#f5f7fa",
      100: "#dbe2eb",
      200: "#bdc8d6",
      300: "#9caaba",
      400: "#7a8a9c",
      500: "#607184",
      600: "#47586a",
      700: "#313e4d",
      800: "#1b2430",
      900: "#0c1117",
    },
  },
  fonts: {
    heading: "'Cormorant Garamond', serif",
    body: "'Manrope', sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        bg: "#f6f2ec",
        color: "accent.800",
        scrollBehavior: "smooth",
      },
      body: {
        minHeight: "100vh",
      },
      "*::selection": {
        bg: "brand.200",
        color: "accent.900",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "xl",
        fontWeight: "700",
        letterSpacing: "-0.01em",
      },
      variants: {
        solid: {
          bg: "brand.400",
          color: "white",
          boxShadow: "0 12px 30px rgba(199, 162, 102, 0.18)",
          _hover: {
            bg: "brand.500",
            boxShadow: "0 16px 34px rgba(199, 162, 102, 0.24)",
          },
          _active: {
            bg: "brand.600",
          },
        },
        outline: {
          bg: "rgba(255,255,255,0.02)",
          borderColor: "whiteAlpha.280",
          color: "whiteAlpha.960",
          _hover: {
            bg: "rgba(255,255,255,0.08)",
            borderColor: "whiteAlpha.380",
          },
        },
        ghost: {
          color: "whiteAlpha.960",
          _hover: {
            bg: "rgba(255,255,255,0.08)",
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'rgba(255, 255, 255, 0.06)',
            color: 'whiteAlpha.960',
            border: '1px solid',
            borderColor: 'whiteAlpha.160',
            _placeholder: {
              color: 'rgba(226, 232, 240, 0.72)',
            },
            _hover: {
              bg: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'whiteAlpha.220',
            },
            _focusVisible: {
              borderColor: 'brand.400',
              bg: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-400), 0 10px 30px rgba(199, 162, 102, 0.08)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
  shadows: {
    outline: "0 0 0 3px rgba(184, 139, 70, 0.35)",
    soft: "0 18px 50px rgba(20, 24, 28, 0.12)",
    panel: "0 24px 80px rgba(3, 8, 14, 0.35)",
  },
});

export default theme;
