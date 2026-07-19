import { Radii, Shadows, Spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { apiFetch, setTokens } from "@/utils/apiClient";
import { jwtDecode } from "jwt-decode";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [role, setRole] = useState<"CLUB_ADMIN" | "STUDENT">("STUDENT");

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const data = await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          department: department || undefined, 
          yearOfStudy: yearOfStudy ? parseInt(yearOfStudy, 10) : undefined, 
          role 
        }),
      });

      await setTokens(data.accessToken, data.refreshToken);
      
      const userPayload: any = jwtDecode(data.accessToken);
      if (userPayload.role === "CLUB_ADMIN" || userPayload.role === "SUPER_ADMIN") {
        router.replace("/admin/admin_dashboard" as any);
      } else {
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (field: string) => ({
    ...styles.inputWrap,
    borderColor: focusedField === field ? GREEN : BORDER,
  });

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        {/* Glow blob */}
        <View style={styles.glowTop} pointerEvents="none" />

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Heading */}
            <View style={styles.headingBlock}>
              <Text style={styles.headingSmall}>Join us</Text>
              <Text style={styles.headingBig}>Create{"\n"}account.</Text>
            </View>

            {errorMsg ? (
              <Text style={{ color: "#E53935", marginBottom: Spacing.md, fontSize: 13, fontWeight: "600" }}>{errorMsg}</Text>
            ) : null}

            {/* Full Name */}
            <Text style={styles.label}>FULL NAME *</Text>
            <View style={inputStyle("name")}>
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                placeholderTextColor={SUBTEXT}
                value={name}
                onChangeText={(t) => { setName(t); setErrorMsg(""); }}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                maxLength={50}
              />
            </View>

            {/* Email */}
            <Text style={styles.label}>EMAIL ADDRESS *</Text>
            <View style={inputStyle("email")}>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor={SUBTEXT}
                value={email}
                onChangeText={(t) => { setEmail(t); setErrorMsg(""); }}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={100}
              />
            </View>

            {/* Department */}
            <Text style={styles.label}>DEPARTMENT</Text>
            <View style={inputStyle("department")}>
              <TextInput
                style={styles.input}
                placeholder="e.g. Computer Science"
                placeholderTextColor={SUBTEXT}
                value={department}
                onChangeText={setDepartment}
                onFocus={() => setFocusedField("department")}
                onBlur={() => setFocusedField(null)}
                maxLength={100}
              />
            </View>

            {/* Year of Study */}
            <Text style={styles.label}>YEAR OF STUDY</Text>
            <View style={inputStyle("year")}>
              <TextInput
                style={styles.input}
                placeholder="1 – 4"
                placeholderTextColor={SUBTEXT}
                value={yearOfStudy}
                onChangeText={setYearOfStudy}
                onFocus={() => setFocusedField("year")}
                onBlur={() => setFocusedField(null)}
                keyboardType="numeric"
                maxLength={1}
              />
            </View>

            {/* Password */}
            <Text style={styles.label}>PASSWORD *</Text>
            <View style={inputStyle("password")}>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor={SUBTEXT}
                secureTextEntry
                value={password}
                onChangeText={(t) => { setPassword(t); setErrorMsg(""); }}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                maxLength={100}
              />
            </View>

            {/* Confirm Password */}
            <Text style={styles.label}>CONFIRM PASSWORD *</Text>
            <View style={inputStyle("confirmPassword")}>
              <TextInput
                style={styles.input}
                placeholder="Re-enter password"
                placeholderTextColor={SUBTEXT}
                secureTextEntry
                value={confirmPassword}
                onChangeText={(t) => { setConfirmPassword(t); setErrorMsg(""); }}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                maxLength={100}
              />
            </View>

            {/* Role toggle */}
            <Text style={styles.label}>I AM A</Text>
            <View style={styles.roleRow}>
              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  role === "STUDENT"
                    ? styles.roleBtnActive
                    : styles.roleBtnInactive,
                ]}
                onPress={() => setRole("STUDENT")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.roleBtnText,
                    { color: role === "STUDENT" ? "#fff" : GREEN_DIM },
                  ]}
                >
                  Student
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  role === "CLUB_ADMIN"
                    ? styles.roleBtnActive
                    : styles.roleBtnInactive,
                ]}
                onPress={() => setRole("CLUB_ADMIN")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.roleBtnText,
                    { color: role === "CLUB_ADMIN" ? "#fff" : GREEN_DIM },
                  ]}
                >
                  Club
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign up button */}
            <TouchableOpacity
              style={styles.signupBtn}
              onPress={handleSignUp}
              activeOpacity={0.85}
            >
              <Text style={styles.signupBtnText}>{isLoading ? "Creating..." : "Create Account"}</Text>
              {!isLoading && (
                <View style={styles.arrowBadge}>
                  <Text style={styles.arrowText}>→</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Back to login */}
            <TouchableOpacity
              style={styles.loginRow}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.loginRowText}>
                Already have an account?{" "}
                <Text style={{ color: GREEN_DIM }}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: GREEN,
    opacity: 0.07,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },

  content: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
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

  roleRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  roleBtn: {
    flex: 1,
    height: 50,
    borderRadius: Radii.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  roleBtnActive: {
    backgroundColor: GREEN,
    borderColor: GREEN,
    ...Shadows.medium,
    shadowColor: GREEN,
    shadowOpacity: 0.3,
  },
  roleBtnInactive: {
    backgroundColor: GREEN_SOFT,
    borderColor: "#2E5C34",
  },
  roleBtnText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  signupBtn: {
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
  signupBtnText: {
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

  loginRow: {
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  loginRowText: {
    fontSize: 14,
    color: SUBTEXT,
    fontWeight: "500",
  },
});
