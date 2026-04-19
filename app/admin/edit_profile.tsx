import { Radii, Shadows, Spacing } from "@/constants/theme";
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
const SUBTEXT = "#666666";
const TEXT = "#F5F5F5";

export default function AdminProfileScreen() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [deptFocused, setDeptFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <View style={styles.flex}>
          <View style={styles.glowTop} pointerEvents="none" />

          <View style={styles.content}>
            <Text style={styles.headingSmall}>Settings</Text>
            <Text style={styles.headingBig}>Admin Profile</Text>

            <Text style={styles.label}>NAME</Text>
            <View
              style={[
                styles.inputWrap,
                { borderColor: nameFocused ? GREEN : BORDER },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                placeholderTextColor={SUBTEXT}
                value={name}
                onChangeText={setName}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                maxLength={50}
              />
            </View>

            <Text style={styles.label}>DEPARTMENT</Text>
            <View
              style={[
                styles.inputWrap,
                { borderColor: deptFocused ? GREEN : BORDER },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter department"
                placeholderTextColor={SUBTEXT}
                value={department}
                onChangeText={setDepartment}
                onFocus={() => setDeptFocused(true)}
                onBlur={() => setDeptFocused(false)}
                maxLength={50}
              />
            </View>

            <Text style={styles.label}>EMAIL ID</Text>
            <View
              style={[
                styles.inputWrap,
                { borderColor: emailFocused ? GREEN : BORDER },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                placeholderTextColor={SUBTEXT}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={100}
              />
            </View>

            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}>
              <Text style={styles.actionBtnText}>Change Password</Text>
              <View style={styles.arrowBadge}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BLACK },
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
    opacity: 0.08,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
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
    fontSize: 42,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -1.5,
    lineHeight: 48,
    marginBottom: Spacing.xxl,
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
  actionBtn: {
    height: 56,
    backgroundColor: GREEN,
    borderRadius: Radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.lg,
    ...Shadows.medium,
    shadowColor: GREEN,
    shadowOpacity: 0.35,
  },
  actionBtnText: {
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
  arrowText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
