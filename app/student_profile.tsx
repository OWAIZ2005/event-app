import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing, Radii, Shadows } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function StudentProfileScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const handleChangePassword = () => {
    //router.push("/change-password");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <View style={styles.content}>

        {/* Avatar Circle */}
        <View
          style={[
            styles.avatarCircle,
            {
              backgroundColor: colors.surface,
              borderColor: colors.primary,
            },
          ]}
        />

        {/* Username Field */}
        <View
          style={[
            styles.infoField,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText style={styles.infoText}>Username</ThemedText>
        </View>

        {/* Department Field */}
        <View
          style={[
            styles.infoField,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText style={styles.infoText}>Department</ThemedText>
        </View>

        {/* Year of Study Field */}
        <View
          style={[
            styles.infoField,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText style={styles.infoText}>Year of Study</ThemedText>
        </View>

        {/* Change Password Button */}
        <TouchableOpacity
          style={[
            styles.changePasswordButton,
            { backgroundColor: colors.primary },
            Shadows.medium,
          ]}
          onPress={handleChangePassword}
          activeOpacity={0.8}
        >
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  avatarCircle: {
    width: 186,
    height: 183,
    borderRadius: 93,
    borderWidth: 2,
    marginBottom: Spacing.xxl,
  },
  infoField: {
    width: "100%",
    height: 55,
    borderRadius: Radii.md,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  infoText: {
    fontSize: 17,
    fontWeight: "600",
  },
  changePasswordButton: {
    width: "75%",
    height: 55,
    borderRadius: Radii.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.lg,
  },
  changePasswordText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});