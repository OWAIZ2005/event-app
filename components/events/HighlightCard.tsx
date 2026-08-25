import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
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
      <ImageBackground
        source={require("../../assets/images/highlight_card.jpg")}
        style={[styles.card, Shadows.medium]}
        imageStyle={[styles.image, { borderColor: colors.successGreen }]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    borderRadius: Radii.md,
    overflow: "hidden",
  },
  image: {
    borderRadius: Radii.md,
    borderWidth: 1.5,
  },
});