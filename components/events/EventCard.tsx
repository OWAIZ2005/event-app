import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Radii, Shadows, Spacing } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  onPress?: () => void;
  showAdminAction?: boolean;
  adminActionText?: string;
  onAdminActionPress?: () => void;
}

export default function EventCard({
  title,
  date,
  location,
  onPress,
  showAdminAction = false,
  adminActionText = "Edit",
  onAdminActionPress,
}: EventCardProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ThemedView
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.successGreen,
          },
          Shadows.light,
        ]}
      >
        <ThemedText
          style={[styles.title, { color: colors.text }]}
          type="defaultSemiBold"
        >
          {title}
        </ThemedText>
        <ThemedText style={[styles.sub, { color: colors.subText }]}>
          {date} • {location}
        </ThemedText>
        {showAdminAction ? (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.successGreen }]}
            onPress={onAdminActionPress}
            activeOpacity={0.8}
          >
            <ThemedText style={{ fontSize: 12, textAlign: "center" }}>
              {adminActionText}
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <ThemedView
            style={[styles.btn, { backgroundColor: colors.successGreen }]}
          />
        )}
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 120,
    borderRadius: Radii.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    justifyContent: "space-between",
  },
  title: { fontSize: 18, marginBottom: Spacing.xs },
  sub: { fontSize: 13 },
  btn: {
    width: 70,
    height: 24,
    borderRadius: Radii.sm,
    alignSelf: "flex-end",
  },
});
