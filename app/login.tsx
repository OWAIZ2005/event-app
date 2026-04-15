import { useRouter } from "expo-router";
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
import { Colors, Spacing, Radii, Shadows } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "club">("student");
  const colorScheme = useColorScheme();
  const router = useRouter();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const handleLogin = () => {
    if (role === "club") {
      router.replace("/admin-dashboard");
    } else {
      router.replace("/(tabs)");
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ThemedView style={styles.container}>
          <View style={styles.content}>
            <ThemedText type="title" style={[styles.loginTitle, { color: colors.primary }]}>
              LOGIN
            </ThemedText>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Username:"
              placeholderTextColor={colors.subText}
              value={username}
              onChangeText={setUsername}
              maxLength={50}
            />

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Password:"
              placeholderTextColor={colors.subText}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              maxLength={100}
            />

            {/* Role selection (Student / Club) */}
            <View style={styles.roleRow}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  {
                    backgroundColor: role === "club" ? colors.primary : "#E0E0E0",
                  },
                ]}
                onPress={() => setRole("club")}
                activeOpacity={0.8}
              >
                <Text style={[styles.roleText, { color: role === "club" ? "#fff" : "#000" }]}>
                  Club
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  {
                    backgroundColor: role === "student" ? colors.primary : "#E0E0E0",
                  },
                ]}
                onPress={() => setRole("student")}
                activeOpacity={0.8}
              >
                <Text style={[styles.roleText, { color: role === "student" ? "#fff" : "#000" }]}>
                  Student
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: colors.primary },
                Shadows.medium,
              ]}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signUpButton, { borderColor: colors.primary }]}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <ThemedText style={[styles.signUpText, { color: colors.primary }]}>
                Sign Up
              </ThemedText>
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
  loginTitle: {
    fontSize: 42,
    fontWeight: "900",
    marginBottom: Spacing.xxl,
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
  roleRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  roleText: {
    fontSize: 16,
    fontWeight: "700",
  },
  loginButton: {
    width: "55%",
    height: 55,
    borderRadius: Radii.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  signUpButton: {
    width: "55%",
    height: 50,
    borderRadius: Radii.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  signUpText: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
});