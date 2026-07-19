import { Radii, Shadows, Spacing } from "@/constants/theme";
import { EventItem, useEventState } from "@/context/EventStateContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    date?: string;
    location?: string;
    organizer?: string;
    description?: string;
  }>();

  const { toggleReminder, registerEvent, isReminder, isRegistered } =
    useEventState();

  const currentEvent: EventItem = {
    id: params.id || "tech-conf-2026",
    title: params.title || "Tech Conference 2026",
    date: params.date || "Aug 14, 2026 · 10:00 AM",
    location: params.location || "Moscone Center, San Francisco",
    organizer: params.organizer || "Tech Club",
    description:
      params.description ||
      "Join us for an incredible tech conference featuring industry leaders, workshops, and networking opportunities. This event brings together the brightest minds in technology for a full day of learning and collaboration.",
  };

  const inReminder = isReminder(currentEvent.id);
  const inRegistered = isRegistered(currentEvent.id);

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
          <Text style={styles.eventName}>{currentEvent.title}</Text>
          <View style={styles.organizerRow}>
            <Ionicons
              name="person-circle-outline"
              size={15}
              color="#ffffffcc"
            />
            <Text style={styles.organizerText}>
              Organized by: {currentEvent.organizer}
            </Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <DetailRow
            icon="calendar-outline"
            label="Date & Time"
            value={currentEvent.date}
          />
          <View style={styles.divider} />
          <DetailRow
            icon="location-outline"
            label="Venue"
            value={currentEvent.location}
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
          <Text style={styles.descText}>{currentEvent.description}</Text>
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={[
            styles.remindBtn,
            inReminder && styles.remindBtnActive,
            inRegistered && styles.remindBtnInactive,
          ]}
          activeOpacity={inRegistered ? 1 : 0.8}
          onPress={() => {
            if (!inRegistered) {
              toggleReminder(currentEvent);
            }
          }}
          disabled={inRegistered}
        >
          <Ionicons
            name={inReminder ? "notifications" : "notifications-outline"}
            size={17}
            color={inReminder ? "#FFF" : inRegistered ? SUBTEXT : GREEN_DIM}
          />
          <Text
            style={[
              styles.remindText,
              inReminder && styles.remindTextActive,
              inRegistered && styles.remindTextInactive,
            ]}
          >
            {inReminder ? "Reminded" : "Remind Me"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.registerBtn,
            inRegistered && styles.registerBtnDisabled,
          ]}
          activeOpacity={inRegistered ? 1 : 0.85}
          onPress={() => {
            if (!inRegistered) {
              registerEvent(currentEvent);
            }
          }}
          disabled={inRegistered}
        >
          <Text style={styles.registerText}>
            {inRegistered ? "Registered" : "Register Now"}
          </Text>
          <View style={styles.arrowBadge}>
            <Text style={styles.arrowText}>{inRegistered ? "✓" : "→"}</Text>
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
    fontSize: 18,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: 0.5,
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
    borderRadius: 10,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "900",
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
    borderRadius: 10,
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
    borderRadius: 8,
    backgroundColor: "rgba(28,185,68,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: SUBTEXT,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    padding: Spacing.lg,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT,
    marginBottom: Spacing.sm,
  },
  descText: {
    fontSize: 14,
    lineHeight: 22,
    color: SUBTEXT,
    fontWeight: "500",
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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2E5C34",
    backgroundColor: GREEN_SOFT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  remindBtnActive: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  remindBtnInactive: {
    opacity: 0.5,
    borderColor: BORDER,
    backgroundColor: SURFACE,
  },
  remindText: {
    fontSize: 15,
    fontWeight: "700",
    color: GREEN_DIM,
    letterSpacing: 0.3,
  },
  remindTextActive: {
    color: "#FFF",
  },
  remindTextInactive: {
    color: SUBTEXT,
  },
  registerBtn: {
    flex: 2,
    height: 52,
    borderRadius: 10,
    backgroundColor: GREEN,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  registerBtnDisabled: {
    backgroundColor: "#16652B",
    opacity: 0.85,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
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
    fontSize: 16,
    fontWeight: "900",
  },
});

