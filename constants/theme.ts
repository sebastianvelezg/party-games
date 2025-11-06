/**
 * Modern Theme System for Party Games App
 * A comprehensive design system with colors, typography, spacing, and shadows
 */

import { Dimensions, Platform } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// ========================================
// COLOR PALETTE
// ========================================

// Brand Colors - Rich, vibrant palette
const brand = {
  primary: "#8B5CF6", // Electric Purple
  primaryLight: "#A78BFA", // Light Purple
  primaryDark: "#7C3AED", // Deep Purple
  secondary: "#EC4899", // Hot Pink
  secondaryLight: "#F472B6",
  secondaryDark: "#DB2777",
  accent: "#14B8A6", // Teal
  accentLight: "#2DD4BF",
  accentDark: "#0F766E",
};

// Semantic Colors
const semantic = {
  success: "#10B981", // Emerald
  successLight: "#34D399",
  successDark: "#059669",
  warning: "#F59E0B", // Amber
  warningLight: "#FCD34D",
  warningDark: "#D97706",
  error: "#EF4444", // Red
  errorLight: "#F87171",
  errorDark: "#DC2626",
  info: "#3B82F6", // Blue
  infoLight: "#60A5FA",
  infoDark: "#2563EB",
};

// Neutral Colors - Modern grayscale
const neutral = {
  white: "#FFFFFF",
  gray50: "#FAFAFA",
  gray100: "#F4F4F5",
  gray200: "#E4E4E7",
  gray300: "#D4D4D8",
  gray400: "#A1A1AA",
  gray500: "#71717A",
  gray600: "#52525B",
  gray700: "#3F3F46",
  gray800: "#27272A",
  gray900: "#18181B",
  black: "#000000",
};

// Background Colors - Dark theme focused
const backgrounds = {
  primary: "#0A0A0F", // Rich Black
  secondary: "#14141B", // Slightly lighter
  tertiary: "#1C1C27", // Card backgrounds
  elevated: "#252533", // Elevated surfaces
  overlay: "rgba(0,0,0,0.7)", // Modal overlays
};

// ========================================
// TYPOGRAPHY
// ========================================

// Font Families - default values
const defaultFontFamilies = {
  regular: "System",
  medium: "System",
  semiBold: "System",
  bold: "System",
  black: "System",
  mono: "Courier",
};

export const fontFamilies =
  Platform.select({
    ios: {
      regular: "SF Pro Display",
      medium: "SF Pro Display",
      semiBold: "SF Pro Display",
      bold: "SF Pro Display",
      black: "SF Pro Display",
      mono: "SF Mono",
    },
    android: {
      regular: "Roboto",
      medium: "Roboto-Medium",
      semiBold: "Roboto-Medium",
      bold: "Roboto-Bold",
      black: "Roboto-Black",
      mono: "RobotoMono-Regular",
    },
    default: defaultFontFamilies,
  }) || defaultFontFamilies;

// Font Sizes - Using a modular scale
export const fontSize = {
  "3xs": 10,
  "2xs": 11,
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
};

// Font Weights
export const fontWeight = {
  thin: "100" as const,
  extraLight: "200" as const,
  light: "300" as const,
  regular: "400" as const,
  medium: "500" as const,
  semiBold: "600" as const,
  bold: "700" as const,
  extraBold: "800" as const,
  black: "900" as const,
};

// Line Heights
export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// Letter Spacing
export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
};

// ========================================
// SPACING SYSTEM
// ========================================

export const spacing = {
  "0": 0,
  px: 1,
  "0.5": 2,
  "1": 4,
  "1.5": 6,
  "2": 8,
  "2.5": 10,
  "3": 12,
  "3.5": 14,
  "4": 16,
  "5": 20,
  "6": 24,
  "7": 28,
  "8": 32,
  "9": 36,
  "10": 40,
  "11": 44,
  "12": 48,
  "14": 56,
  "16": 64,
  "20": 80,
  "24": 96,
  "28": 112,
  "32": 128,
  "36": 144,
  "40": 160,
  "44": 176,
  "48": 192,
  "52": 208,
  "56": 224,
  "60": 240,
  "64": 256,
  "72": 288,
  "80": 320,
  "96": 384,
};

// ========================================
// BORDER RADIUS
// ========================================

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 9999,
};

// ========================================
// SHADOWS
// ========================================

export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  "2xl": {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 12,
  },
  glow: {
    shadowColor: brand.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 0,
  },
};

// ========================================
// ANIMATION TIMINGS
// ========================================

export const animation = {
  timing: {
    instant: 0,
    fast: 150,
    base: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
  },
  easing: {
    linear: [0, 0, 1, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    spring: { tension: 170, friction: 26 },
  },
};

// ========================================
// MAIN THEME EXPORT
// ========================================

export const Theme = {
  // Color modes
  colors: {
    light: {
      // Text colors
      text: neutral.gray900,
      textSecondary: neutral.gray600,
      textMuted: neutral.gray400,
      textInverse: neutral.white,

      // Background colors
      background: neutral.white,
      backgroundSecondary: neutral.gray50,
      backgroundTertiary: neutral.gray100,
      backgroundElevated: neutral.white,

      // Brand colors
      primary: brand.primary,
      primaryLight: brand.primaryLight,
      primaryDark: brand.primaryDark,
      secondary: brand.secondary,
      accent: brand.accent,

      // UI elements
      border: neutral.gray200,
      borderFocus: brand.primary,
      divider: neutral.gray100,
      icon: neutral.gray600,

      // Semantic colors
      ...semantic,

      // Components
      card: neutral.white,
      cardHover: neutral.gray50,

      // Overlays
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    dark: {
      // Text colors
      text: neutral.gray50,
      textSecondary: neutral.gray400,
      textMuted: neutral.gray500,
      textInverse: neutral.gray900,

      // Background colors
      background: backgrounds.primary,
      backgroundSecondary: backgrounds.secondary,
      backgroundTertiary: backgrounds.tertiary,
      backgroundElevated: backgrounds.elevated,

      // Brand colors
      primary: brand.primary,
      primaryLight: brand.primaryLight,
      primaryDark: brand.primaryDark,
      secondary: brand.secondary,
      accent: brand.accent,

      // UI elements
      border: neutral.gray800,
      borderFocus: brand.primary,
      divider: neutral.gray800,
      icon: neutral.gray400,

      // Semantic colors
      ...semantic,

      // Components
      card: backgrounds.tertiary,
      cardHover: backgrounds.elevated,

      // Overlays
      overlay: "rgba(0, 0, 0, 0.7)",
    },
  },

  // Typography
  typography: {
    fontFamilies,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
  },

  // Layout
  layout: {
    spacing,
    borderRadius,
    screenWidth,
    screenHeight,
    containerMaxWidth: 1200,
    contentMaxWidth: 800,
  },

  // Effects
  effects: {
    shadows,
    animation,
    blur: {
      none: 0,
      sm: 4,
      base: 8,
      md: 12,
      lg: 16,
      xl: 24,
    },
    opacity: {
      transparent: 0,
      5: 0.05,
      10: 0.1,
      20: 0.2,
      30: 0.3,
      40: 0.4,
      50: 0.5,
      60: 0.6,
      70: 0.7,
      80: 0.8,
      90: 0.9,
      opaque: 1,
    },
  },

  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
    notification: 80,
    loading: 90,
  },
};

// ========================================
// HELPER FUNCTIONS
// ========================================

// Get current theme based on color scheme
export const getTheme = (colorScheme: "light" | "dark" = "dark") => {
  return {
    colors: Theme.colors[colorScheme],
    ...Theme.typography,
    ...Theme.layout,
    ...Theme.effects,
    zIndex: Theme.zIndex,
  };
};

// Responsive font size
export const responsiveFontSize = (size: number) => {
  const scale = screenWidth / 375; // Base iPhone width
  const newSize = size * scale;
  return Math.round(newSize);
};

// ========================================
// LEGACY EXPORTS (for compatibility)
// ========================================

export const Colors = Theme.colors;
export const Fonts = fontFamilies;

// Export individual items for easier imports
export const colors = Theme.colors.dark; // Default to dark mode
export const typography = Theme.typography;
export const layout = Theme.layout;
export const effects = Theme.effects;
export const zIndex = Theme.zIndex;

export default Theme;
