import { Radii, Shadows, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
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

interface DetailRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color={GREEN} />
      </View>
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function EventInfoScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Glow blob */}
      <View style={styles.glowTop} pointerEvents="none" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={22} color={TEXT} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Event Details</Text>

        <TouchableOpacity
          onPress={() => router.push("/student_profile" as any)}
          activeOpacity={0.8}
        >
          <View style={styles.profileCircle} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Event Image */}
        <View style={styles.imageBox}>
          <Ionicons
            name="image-outline"
            size={48}
            color={GREEN}
            style={{ opacity: 0.3 }}
          />
        </View>

        {/* Name Card */}
        <View style={styles.nameCard}>
          <Text style={styles.eventName}>Tech Conference 2026</Text>
          <View style={styles.organizerRow}>
            <Ionicons
              name="person-circle-outline"
              size={15}
              color="#ffffffcc"
            />
            <Text style={styles.organizerText}>Organized by: Tech Club</Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <DetailRow
            icon="calendar-outline"
            label="Date & Time"
            value="Aug 14, 2026 · 10:00 AM"
          />
          <View style={styles.divider} />
          <DetailRow
            icon="location-outline"
            label="Venue"
            value="Moscone Center, San Francisco"
          />
          <View style={styles.divider} />
          <DetailRow
            icon="people-outline"
            label="Participants"
            value="500 seats available"
          />
          <View style={styles.divider} />
          <DetailRow icon="card-outline" label="Payment" value="Free Entry" />
        </View>

        {/* Description Card */}
        <View style={styles.descCard}>
          <Text style={styles.descTitle}>About this Event</Text>
          <Text style={styles.descText}>
            Join us for an incredible tech conference featuring industry
            leaders, workshops, and networking opportunities. This event brings
            together the brightest minds in technology for a full day of
            learning and collaboration.
          </Text>
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.remindBtn} activeOpacity={0.8}>
          <Ionicons name="notifications-outline" size={17} color={GREEN_DIM} />
          <Text style={styles.remindText}>Remind Me</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerBtn} activeOpacity={0.85}>
          <Text style={styles.registerText}>Register Now</Text>
          <View style={styles.arrowBadge}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  glowTop: {
    position: "absolute",
    top: -100,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: GREEN,
    opacity: 0.06,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT,
  },
  profileCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: SURFACE,
    borderWidth: 2,
    borderColor: GREEN,
  },

  // Image
  imageBox: {
    width: "100%",
    height: 200,
    backgroundColor: SURFACE,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER,
    justifyContent: "center",
    alignItems: "center",
  },

  // Name card
  nameCard: {
    marginHorizontal: Spacing.lg,
    marginTop: 12,
    backgroundColor: GREEN,
    borderRadius: Radii.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.medium,
    shadowColor: GREEN,
    shadowOpacity: 0.3,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  organizerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  organizerText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    fontWeight: "500",
  },

  // Details card
  detailsCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: SURFACE,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 4,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: Radii.sm,
    backgroundColor: "rgba(28,185,68,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: SUBTEXT,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginLeft: 68,
  },

  // Desc card
  descCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: SURFACE,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: BORDER,
    padding: Spacing.lg,
  },
  descTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: TEXT,
    marginBottom: Spacing.sm,
  },
  descText: {
    fontSize: 14,
    lineHeight: 22,
    color: SUBTEXT,
    fontWeight: "400",
  },

  // Bottom
  bottomRow: {
    flexDirection: "row",
    gap: Spacing.md,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    backgroundColor: BLACK,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  remindBtn: {
    flex: 1,
    height: 52,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: "#2E5C34",
    backgroundColor: GREEN_SOFT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  remindText: {
    fontSize: 14,
    fontWeight: "600",
    color: GREEN_DIM,
  },
  registerBtn: {
    flex: 2,
    height: 52,
    borderRadius: Radii.md,
    backgroundColor: GREEN,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    ...Shadows.medium,
    shadowColor: GREEN,
    shadowOpacity: 0.35,
  },
  registerText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  arrowBadge: {
    position: "absolute",
    right: Spacing.md,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
