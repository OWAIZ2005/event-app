import { Radii, Shadows, Spacing } from "@/constants/theme";
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

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#222222";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const GREEN_SOFT = "#1C2E20";
const SUBTEXT = "#666666";
const TEXT = "#F5F5F5";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    const user = username.trim();
    const pass = password.trim();
    if (user === "IEEECS" && pass === "IEEECS123") {
      router.replace("/admin/admin_dashboard" as any);
      return;
    }
    router.replace("/(tabs)");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <View style={styles.flex}>
          {/* Top glow blob */}
          <View style={styles.glowTop} pointerEvents="none" />

          <View style={styles.content}>
            {/* Heading */}
            <View style={styles.headingBlock}>
              <Text style={styles.headingSmall}>Welcome back</Text>
              <Text style={styles.headingBig}>Sign in.</Text>
            </View>

            {/* Username */}
            <Text style={styles.label}>USERNAME</Text>
            <View
              style={[
                styles.inputWrap,
                { borderColor: usernameFocused ? GREEN : BORDER },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter username"
                placeholderTextColor={SUBTEXT}
                value={username}
                onChangeText={setUsername}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
                autoCapitalize="none"
                maxLength={50}
              />
            </View>

            {/* Password */}
            <Text style={styles.label}>PASSWORD</Text>
            <View
              style={[
                styles.inputWrap,
                { borderColor: passwordFocused ? GREEN : BORDER },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor={SUBTEXT}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                maxLength={100}
              />
            </View>

            {/* Forgot */}
            <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text style={styles.loginBtnText}>Login</Text>
              <View style={styles.arrowBadge}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Sign up */}
            <TouchableOpacity
              style={styles.signupBtn}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text style={styles.signupText}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BLACK,
  },
  flex: { flex: 1 },

  glowTop: {
    position: "absolute",
    top: -120,
    left: "50%",
    marginLeft: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#1CB944",
    opacity: 0.08,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },

  headingBlock: {
    marginBottom: Spacing.xxl,
  },
  headingSmall: {
    fontSize: 13,
    fontWeight: "500",
    color: GREEN_DIM,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  headingBig: {
    fontSize: 48,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -1.5,
    lineHeight: 52,
  },

  label: {
    fontSize: 10,
    fontWeight: "700",
    color: SUBTEXT,
    letterSpacing: 2,
    marginBottom: 8,
  },
  inputWrap: {
    height: 54,
    backgroundColor: SURFACE,
    borderRadius: Radii.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  input: {
    fontSize: 15,
    fontWeight: "500",
    color: TEXT,
    height: "100%",
  },

  forgotRow: {
    alignSelf: "flex-end",
    marginTop: -Spacing.sm,
    marginBottom: Spacing.xl,
  },
  forgotText: {
    fontSize: 13,
    color: GREEN_DIM,
    fontWeight: "500",
  },

  loginBtn: {
    height: 56,
    backgroundColor: GREEN,
    borderRadius: Radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    ...Shadows.medium,
    shadowColor: GREEN,
    shadowOpacity: 0.35,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  arrowBadge: {
    position: "absolute",
    right: Spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  dividerText: {
    fontSize: 13,
    color: SUBTEXT,
  },

  signupBtn: {
    height: 52,
    backgroundColor: GREEN_SOFT,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: "#2E5C34",
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 15,
    fontWeight: "600",
    color: GREEN_DIM,
  },
});
