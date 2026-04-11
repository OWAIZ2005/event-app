import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing, Radii, Shadows } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"club" | "student">("club");

  const colorScheme = useColorScheme();
  const router = useRouter();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const handleSignIn = () => {
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedView style={styles.container}>
        <View style={styles.content}>

          {/* Avatar */}
          <View style={[styles.avatarCircle, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {/* Placeholder avatar icon */}
            
          </View>

          {/* Username Input */}
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Username"
            placeholderTextColor={colors.subText}
            value={username}
            onChangeText={setUsername}
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
            maxLength={100}
          />

          {/* Year of Study Input */}
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Year of Study"
            placeholderTextColor={colors.subText}
            value={yearOfStudy}
            onChangeText={setYearOfStudy}
            keyboardType="numeric"
            maxLength={1}
          />

          {/* New Password Input */}
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="New Password"
            placeholderTextColor={colors.subText}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            maxLength={100}
          />

          {/* Role Toggle: Club / Student */}
          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "club"
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: "transparent", borderColor: colors.primary, borderWidth: 2 },
              ]}
              onPress={() => setRole("club")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  { color: role === "club" ? "#fff" : colors.primary },
                ]}
              >
                Club
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "student"
                  ? { backgroundColor: colors.primary }
                  : { backgroundColor: "transparent", borderColor: colors.primary, borderWidth: 2 },
              ]}
              onPress={() => setRole("student")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  { color: role === "student" ? "#fff" : colors.primary },
                ]}
              >
                Student
              </Text>
            </TouchableOpacity>
          </View>

          {/* SIGN IN Button */}
          <TouchableOpacity
            style={[
              styles.signInButton,
              { backgroundColor: colors.primary },
              Shadows.medium,
            ]}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </TouchableOpacity>

        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  avatarCircle: {
  width: 186,
  height: 183,
  borderRadius: 93,   // half of width for a circle
  borderWidth: 1.5,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: Spacing.xxl,
  overflow: "hidden",
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
  roleRow: {
    flexDirection: "row",
    width: "100%",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  roleButton: {
    flex: 1,
    height: 50,
    borderRadius: Radii.md,
    justifyContent: "center",
    alignItems: "center",
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  signInButton: {
    width: "75%",
    height: 55,
    borderRadius: Radii.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xl,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});