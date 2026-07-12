import { Platform } from "react-native";

const tintColorLight = "#2E7D32"; // Deep, sophisticated green
const tintColorDark = "#A5D6A7";
const successGreen = "#1CB944"; // Keeping original success for buttons
const lightGreenBg = "#E8F5E9"; // Much cleaner, subtle light green
const primaryGreen = "#4CAF50";
const cardGreenBg = "#C8E6C9";
const softGreenTheme = "#81C784";

export const Colors = {
  light: {
    text: "#1C2826", // Deep forest/charcoal tint
    subText: "#687076",
    background: "#F9FAFB", // Cool light gray
    surface: "#FFFFFF", // Card background
    border: "#E0E0E0",
    primary: primaryGreen,
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    successGreen,
    lightGreenBg,
    cardGreenBg,
    softGreenTheme,
    inactiveBtn: "#E2E8F0",
  },
  dark: {
    text: "#ECEDEE",
    subText: "#A1A1AA",
    background: "#121212",
    surface: "#1E1E1E",
    border: "#333333",
    primary: tintColorDark,
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    successGreen: "#1CB944",
    lightGreenBg: "#1C2E20", // Dark subtle green
    cardGreenBg: "#2E4C34",
    softGreenTheme: "#66BB6A",
    inactiveBtn: "#27272A",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const Shadows = {
  light: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  strong: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
