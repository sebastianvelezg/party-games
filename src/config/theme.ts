export const colors = {
  // Primary colors - Futuristic Blue
  primary: '#00D9FF',
  primaryDark: '#0099CC',
  primaryLight: '#33E0FF',

  // Secondary colors - Neon Purple
  secondary: '#B026FF',
  secondaryDark: '#8A1FCC',
  secondaryLight: '#C554FF',

  // Accent colors - Electric Green
  accent: '#00FF88',
  accentDark: '#00CC6E',
  accentLight: '#33FFA0',

  // Additional accent colors
  accentRed: '#FF3366',
  accentRedDark: '#CC2952',

  // Game colors (vibrant neon for cards)
  gameColors: {
    purple: '#B026FF',
    pink: '#FF3366',
    teal: '#00D9FF',
    orange: '#FF8C00',
    green: '#00FF88',
    blue: '#4D7CFF',
  },

  // Neutral colors - Dark futuristic theme
  white: '#FFFFFF',
  black: '#000000',
  background: '#0A0E14',        // Very dark blue-black
  backgroundSecondary: '#111827', // Slightly lighter dark
  surface: '#1A1F2E',            // Dark surface
  surfaceLight: '#252B3B',       // Lighter surface for cards
  surfaceDark: '#0F1419',        // Darker surface
  card: '#1A1F2E',               // Card background (same as surface)

  // Text colors
  text: '#E5E7EB',              // Light grey for primary text
  textSecondary: '#9CA3AF',     // Medium grey for secondary text
  textMuted: '#6B7280',         // Darker grey for muted text
  textDark: '#FFFFFF',

  // Status colors - Neon/cyberpunk tones
  success: '#00FF88',
  error: '#FF3366',
  warning: '#FFA500',
  info: '#00D9FF',

  // UI elements
  border: '#252B3B',
  borderLight: '#303744',
  borderDark: '#1A1F2E',
  disabled: '#4B5563',
  overlay: 'rgba(0, 0, 0, 0.7)',
  divider: '#1E2433',            // Divider line color

  // Glass effect colors
  glass: 'rgba(26, 31, 46, 0.8)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 1,
    wider: 2,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Layout spacing (same as spacing but with numeric keys for easier access)
export const layout = {
  spacing: {
    '0': 0,
    '1': 4,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '8': 32,
    '10': 40,
    '12': 48,
    '16': 64,
    '20': 80,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
    full: 9999,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },
  // Neon glow effects
  glow: {
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  glowPurple: {
    shadowColor: '#B026FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  glowGreen: {
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
};

// Effects (shadows and opacity)
export const effects = {
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 12,
    },
  },
  opacity: {
    '0': 0,
    '10': 0.1,
    '20': 0.2,
    '30': 0.3,
    '40': 0.4,
    '50': 0.5,
    '60': 0.6,
    '70': 0.7,
    '80': 0.8,
    '90': 0.9,
    '100': 1,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  effects,
};

export type Theme = typeof theme;
