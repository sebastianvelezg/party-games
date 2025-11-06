export const colors = {
  // Primary colors
  primary: '#6C63FF',
  primaryDark: '#5B52D8',
  primaryLight: '#8E87FF',

  // Secondary colors
  secondary: '#FF6584',
  secondaryDark: '#E5486C',
  secondaryLight: '#FF8BA3',

  // Accent colors
  accent: '#4ECDC4',
  accentDark: '#3AB5AD',
  accentLight: '#6FD9D1',

  // Game colors (for different game cards)
  gameColors: {
    purple: '#6C63FF',
    pink: '#FF6584',
    teal: '#4ECDC4',
    orange: '#FFB347',
    green: '#6BCF7F',
    blue: '#4A90E2',
  },

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  background: '#F8F9FA',
  backgroundDark: '#121212',
  surface: '#FFFFFF',
  surfaceDark: '#1E1E1E',

  // Text colors
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textDark: '#FFFFFF',
  textSecondaryDark: '#9CA3AF',

  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // UI elements
  border: '#E5E7EB',
  borderDark: '#374151',
  disabled: '#D1D5DB',
  overlay: 'rgba(0, 0, 0, 0.5)',
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
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
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
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;
