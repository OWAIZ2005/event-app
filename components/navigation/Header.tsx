import { useRouter } from "expo-router";  // add this
import { StyleSheet, TouchableOpacity, View } from "react-native";  // add TouchableOpacity
import { ThemedView } from "../themed-view";
import { ThemedText } from "../themed-text";
import { Colors, Spacing, Radii, Shadows } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons"; // add this import

export default function Header() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();  // add this

  return (
    <View style={styles.container}>

      {/* Tap avatar → Student Profile */}
      <TouchableOpacity onPress={() => router.push("/student_profile")} activeOpacity={0.8}>
        <ThemedView style={[styles.profile, { backgroundColor: "transparent", borderColor: colors.successGreen }, Shadows.light]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
  <View>
    <Ionicons name="notifications-outline" size={28} color={colors.text} />
    {/* Red dot badge */}
    <View style={styles.badge} />
  </View>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
  },
  profile: {
    width: 48,
    height: 48,
    borderRadius: Radii.round,
    borderWidth: 2,
  },

  badge: {
  position: "absolute",
  top: 0,
  right: 0,
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "red",
},
  
});