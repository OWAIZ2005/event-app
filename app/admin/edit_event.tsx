import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Radii, Shadows, Spacing } from "../../constants/theme";

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#222222";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const GREEN_SOFT = "#1C2E20";
const GREEN_SOFT_BORDER = "#2E5C34";
const SUBTEXT = "#666666";
const TEXT = "#F5F5F5";

export default function EditEvent() {
  const router = useRouter();

  const [eventName, setEventName] = useState("Tech Conference 2026");
  const [organizer, setOrganizer] = useState("John Doe");
  const [dateTime, setDateTime] = useState("May 15, 2026 • 2:00 PM");
  const [venue, setVenue] = useState("Grand Convention Hall, NYC");
  const [participants, setParticipants] = useState("250");
  const [payment, setPayment] = useState("$50.00 per ticket");
  const [eventLink, setEventLink] = useState("www.techconf2026.com");
  const [description, setDescription] = useState(
    "Join us for an exciting tech conference where industry leaders share insights on emerging technologies, AI, and digital transformation.",
  );

  return (
    <View style={styles.screen}>
      {/* Glow blob — same as Login */}
      <View style={styles.glowTop} pointerEvents="none" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Green box — Event Name + Organizer */}
        <View style={styles.greenBox}>
          <View style={styles.fieldSection}>
            <Text style={styles.greenLabel}>Event Name</Text>
            <TextInput
              style={styles.greenInput}
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>
          <View style={styles.fieldSection}>
            <Text style={styles.greenLabel}>Organizer Name</Text>
            <TextInput
              style={styles.greenInput}
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={organizer}
              onChangeText={setOrganizer}
            />
          </View>
        </View>

        {/* Dark surface box — detail rows */}
        <View style={styles.darkBox}>
          <EditableRow
            icon="calendar"
            label="Date & Time"
            value={dateTime}
            onChangeText={setDateTime}
          />
          <EditableRow
            icon="map-marker"
            label="Venue"
            value={venue}
            onChangeText={setVenue}
          />
          <EditableRow
            icon="users"
            label="Total Participants"
            value={participants}
            onChangeText={setParticipants}
          />
          <EditableRow
            icon="money"
            label="Payment Amount"
            value={payment}
            onChangeText={setPayment}
          />
          <EditableRow
            icon="link"
            label="Event Link"
            value={eventLink}
            onChangeText={setEventLink}
            isLast
          />
        </View>

        {/* About box */}
        <View style={styles.darkBox}>
          <Text style={styles.aboutTitle}>About the Event</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholderTextColor={SUBTEXT}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Sticky Save button — mirrors Login button */}
      <View style={styles.saveBar}>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save</Text>
          <View style={styles.arrowBadge}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function EditableRow({
  icon,
  label,
  value,
  onChangeText,
  isLast,
}: {
  icon: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  isLast?: boolean;
}) {
  return (
    <>
      <View style={styles.editableRow}>
        <FontAwesome
          name={icon as any}
          size={18}
          color={GREEN}
          style={styles.rowIcon}
        />
        <View style={styles.rowContent}>
          <Text style={styles.rowLabel}>{label}</Text>
          <TextInput
            style={styles.rowInput}
            placeholderTextColor={SUBTEXT}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </View>
      {!isLast && <View style={styles.rowDivider} />}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BLACK,
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

  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
  },

  // Green soft card (top box)
  greenBox: {
    backgroundColor: GREEN_SOFT,
    borderWidth: 1,
    borderColor: GREEN_SOFT_BORDER,
    borderRadius: Radii.lg,
    padding: Spacing.md,
  },
  fieldSection: {
    marginVertical: 10,
  },
  greenLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: GREEN_DIM,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  greenInput: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT,
    borderBottomWidth: 1,
    borderBottomColor: GREEN_SOFT_BORDER,
    paddingBottom: 6,
  },

  // Dark surface card
  darkBox: {
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: Radii.lg,
    overflow: "hidden",
  },

  editableRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
  },
  rowIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: SUBTEXT,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  rowInput: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT,
  },
  rowDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginHorizontal: Spacing.md,
  },

  aboutTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: SUBTEXT,
    letterSpacing: 2,
    textTransform: "uppercase",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    marginBottom: 10,
  },
  descriptionInput: {
    fontSize: 14,
    lineHeight: 20,
    color: TEXT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    margin: Spacing.md,
    minHeight: 100,
    backgroundColor: BLACK,
  },

  // Save bar — mirrors Login button
  saveBar: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    backgroundColor: BLACK,
  },
  saveBtn: {
    height: 56,
    backgroundColor: GREEN,
    borderRadius: Radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.medium,
    shadowColor: GREEN,
    shadowOpacity: 0.35,
  },
  saveBtnText: {
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
});
