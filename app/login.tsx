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
  const colorScheme = useColorScheme();
  const router = useRouter();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const handleLogin = () => {
    router.replace("/(tabs)");
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

            {/* LOGIN Title */}
            <ThemedText type="title" style={[styles.loginTitle, { color: colors.primary }]}>
              LOGIN
            </ThemedText>

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
              placeholder="Username:"
              placeholderTextColor={colors.subText}
              value={username}
              onChangeText={setUsername}
              editable
              maxLength={50}
            />

            {/* Password Input */}
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

            {/* LOGIN Button */}
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

            {/* Sign Up Link */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                { borderColor: colors.primary },
              ]}
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