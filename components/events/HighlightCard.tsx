import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../themed-view";
import { Colors, Radii, Shadows } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";

interface HighlightCardProps {
  onPress?: () => void;
}

export default function HighlightCard({ onPress }: HighlightCardProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ThemedView style={[styles.card, { backgroundColor: colors.softGreenTheme }, Shadows.medium]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100, 
    height: 100,
    borderRadius: Radii.md,
  },
});
