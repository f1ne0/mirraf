import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const adminTheme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      admin: {
        bg: { default: '#0B1218' },
        sidebar: { default: '#0F1720' },
        surface: { default: '#121C25' },
        surfaceAlt: { default: '#182532' },
        border: { default: 'rgba(255,255,255,0.08)' },
        borderStrong: { default: 'rgba(255,255,255,0.14)' },
        text: { default: '#F5F7FA' },
        textMuted: { default: 'rgba(245,247,250,0.78)' },
        textSoft: { default: 'rgba(245,247,250,0.58)' },
        accent: { default: '#C3A574' },
        accentHover: { default: '#B38F56' },
        success: { default: '#56A67A' },
        error: { default: '#D16969' },
        warning: { default: '#D1A35B' },
      },
    },
  },
  colors: {
    admin: {
      50: '#F5F7FA',
      100: '#E2E8F0',
      200: '#CBD5E1',
      300: '#94A3B8',
      400: '#64748B',
      500: '#475569',
      600: '#334155',
      700: '#1F2937',
      800: '#182532',
      900: '#0B1218',
    },
    accent: {
      50: '#F7F2EA',
      100: '#EBDCC4',
      200: '#DEC39A',
      300: '#D0AA70',
      400: '#C3A574',
      500: '#B38F56',
      600: '#8E6F42',
      700: '#685131',
      800: '#433420',
      900: '#21190F',
    },
    success: {
      500: '#56A67A',
    },
    error: {
      500: '#D16969',
    },
    warning: {
      500: '#D1A35B',
    },
  },
  fonts: {
    heading: "'Manrope', sans-serif",
    body: "'Manrope', sans-serif",
  },
  radii: {
    adminCard: '24px',
  },
  shadows: {
    adminCard: '0 28px 60px rgba(2, 8, 16, 0.34)',
    adminFocus: '0 0 0 1px rgba(195, 165, 116, 0.85), 0 10px 28px rgba(195, 165, 116, 0.12)',
  },
  styles: {
    global: {
      'html, body': {
        bg: 'admin.bg',
        color: 'admin.text',
      },
      body: {
        minHeight: '100vh',
      },
      '#root': {
        minHeight: '100vh',
      },
      '*::selection': {
        bg: 'accent.400',
        color: 'admin.900',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '16px',
        fontWeight: '700',
        letterSpacing: '-0.01em',
      },
      variants: {
        adminSolid: {
          bg: 'accent.400',
          color: 'admin.900',
          boxShadow: '0 14px 36px rgba(195, 165, 116, 0.22)',
          _hover: {
            bg: 'accent.500',
            boxShadow: '0 18px 40px rgba(195, 165, 116, 0.28)',
          },
          _active: {
            bg: 'accent.600',
          },
        },
        adminOutline: {
          bg: 'rgba(255,255,255,0.02)',
          color: 'admin.text',
          border: '1px solid',
          borderColor: 'admin.borderStrong',
          _hover: {
            bg: 'rgba(255,255,255,0.05)',
            borderColor: 'rgba(255,255,255,0.22)',
          },
        },
        adminGhost: {
          color: 'admin.textMuted',
          _hover: {
            bg: 'rgba(255,255,255,0.06)',
            color: 'admin.text',
          },
        },
        dangerOutline: {
          bg: 'rgba(209,105,105,0.04)',
          color: 'error.500',
          border: '1px solid',
          borderColor: 'rgba(209,105,105,0.35)',
          _hover: {
            bg: 'rgba(209,105,105,0.10)',
          },
        },
      },
      defaultProps: {
        variant: 'adminSolid',
      },
    },
    Input: {
      variants: {
        admin: {
          field: {
            bg: 'rgba(255,255,255,0.04)',
            color: 'admin.text',
            border: '1px solid',
            borderColor: 'admin.border',
            borderRadius: '16px',
            _placeholder: {
              color: 'admin.textSoft',
            },
            _hover: {
              borderColor: 'admin.borderStrong',
              bg: 'rgba(255,255,255,0.05)',
            },
            _focusVisible: {
              borderColor: 'accent.400',
              boxShadow: 'adminFocus',
              bg: 'rgba(255,255,255,0.06)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'admin',
      },
    },
    Table: {
      variants: {
        admin: {
          table: {
            borderCollapse: 'separate',
            borderSpacing: '0 14px',
          },
          thead: {
            th: {
              borderBottom: 'none',
              color: 'admin.textMuted',
              fontSize: 'xs',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: '700',
              px: 4,
            },
          },
          tbody: {
            tr: {
              bg: 'rgba(255,255,255,0.02)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
              transition: 'transform 0.2s ease, background 0.2s ease',
              _hover: {
                bg: 'rgba(255,255,255,0.04)',
              },
            },
            td: {
              borderBottom: 'none',
              py: 4,
              px: 4,
            },
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'admin.surface',
          color: 'admin.text',
          border: '1px solid',
          borderColor: 'admin.border',
          borderRadius: '24px',
          boxShadow: 'adminCard',
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'admin.text',
        fontWeight: '700',
        mb: 2,
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'admin.surface',
          border: '1px solid',
          borderColor: 'admin.border',
          borderRadius: '24px',
          boxShadow: 'adminCard',
        },
      },
    },
  },
});

