import { Radii, Shadows, Spacing } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#222222";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const GREEN_SOFT = "#1C2E20";
const SUBTEXT = "#666666";
const TEXT = "#F5F5F5";

export default function StudentProfileScreen() {
  const handleChangePassword = () => {
    // router.push("/change-password");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.flex}>
        <View style={styles.glowTop} pointerEvents="none" />

        <View style={styles.content}>
          <View style={styles.headingBlock}>
            <Text style={styles.headingSmall}>Student profile</Text>
            <Text style={styles.headingBig}>My details.</Text>
          </View>

          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>S</Text>
            </View>
          </View>

          <Text style={styles.label}>USERNAME</Text>
          <View style={styles.infoField}>
            <Text style={styles.infoText}>Username</Text>
          </View>

          <Text style={styles.label}>DEPARTMENT</Text>
          <View style={styles.infoField}>
            <Text style={styles.infoText}>Department</Text>
          </View>

          <Text style={styles.label}>YEAR OF STUDY</Text>
          <View style={styles.infoField}>
            <Text style={styles.infoText}>Year of Study</Text>
          </View>

          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={handleChangePassword}
            activeOpacity={0.85}
          >
            <Text style={styles.changePasswordText}>Change Password</Text>
            <View style={styles.arrowBadge}>
              <Text style={styles.arrowText}>{">"}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>profile</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.statusPill}>
            <Text style={styles.statusText}>IEEE CS member</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BLACK,
  },
  flex: {
    flex: 1,
  },
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
    paddingVertical: Spacing.xxl,
  },
  headingBlock: {
    marginBottom: Spacing.xl,
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
    letterSpacing: 0,
    lineHeight: 52,
  },
  avatarWrap: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  avatarCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: GREEN_SOFT,
    borderWidth: 1,
    borderColor: "#2E5C34",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: GREEN_DIM,
    fontSize: 42,
    fontWeight: "800",
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: SUBTEXT,
    letterSpacing: 2,
    marginBottom: 8,
  },
  infoField: {
    width: "100%",
    height: 54,
    backgroundColor: SURFACE,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoText: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "500",
  },
  changePasswordButton: {
    height: 56,
    backgroundColor: GREEN,
    borderRadius: Radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
    shadowColor: GREEN,
    shadowOpacity: 0.35,
  },
  changePasswordText: {
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
  statusPill: {
    height: 52,
    backgroundColor: GREEN_SOFT,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: "#2E5C34",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "600",
    color: GREEN_DIM,
  },
});
