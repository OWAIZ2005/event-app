import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Radii, Shadows, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function AdminProfileScreen() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ThemedView style={styles.container}>
          <View style={styles.content}>
            {/* ADMIN PROFILE Title */}
            <ThemedText
              type="title"
              style={[styles.profileTitle, { color: colors.primary }]}
            >
              ADMIN PROFILE
            </ThemedText>

            {/* Name Input */}
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Name"
              placeholderTextColor={colors.subText}
              value={name}
              onChangeText={setName}
              editable
              maxLength={50}
            />

            {/* Department Input */}
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Department"
              placeholderTextColor={colors.subText}
              value={department}
              onChangeText={setDepartment}
              maxLength={50}
            />

            {/* Email Input */}
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Email ID"
              placeholderTextColor={colors.subText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={100}
            />

            {/* Change Password Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.primary },
                Shadows.medium,
              ]}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    width: "100%",
  },
  profileTitle: {
    fontSize: 42,
    fontWeight: "900",
    marginBottom: Spacing.xxl,
    fontStyle: "normal",
    textAlign: "center",
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    height: 55,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    fontSize: 17,
    fontWeight: "600",
    borderWidth: 1,
  },
  actionButton: {
    width: "100%",
    height: 55,
    borderRadius: Radii.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.lg,
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
