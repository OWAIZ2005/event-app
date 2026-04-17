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
import { Colors, Radii, Shadows, Spacing } from "../constants/theme";
import { useColorScheme } from "../hooks/use-color-scheme";

export default function EditEvent() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

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
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View
        style={[
          styles.appBar,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.appBarTitle, { color: colors.text }]}>
          Edit Event
        </Text>
        <View
          style={[
            styles.profileIcon,
            { backgroundColor: colors.softGreenTheme },
          ]}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* First Box - Dark Green Header with Event Name & Organizer (compact) */}
        <View
          style={[
            styles.darkGreenBox,
            {
              backgroundColor: colors.tint,
            },
            Shadows.light,
          ]}
        >
          <View style={styles.fieldSection}>
            <Text style={styles.whiteLabel}>Event Name</Text>
            <TextInput
              style={[styles.whiteInput, { color: "#FFFFFF" }]}
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>

          <View style={styles.fieldSection}>
            <Text style={styles.whiteLabel}>Organizer Name</Text>
            <TextInput
              style={[styles.whiteInput, { color: "#FFFFFF" }]}
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={organizer}
              onChangeText={setOrganizer}
            />
          </View>
        </View>

        {/* Second Box - White box with editable fields and icons */}
        <View
          style={[
            styles.whiteBox,
            {
              backgroundColor: "#FFFFFF",
            },
            Shadows.light,
          ]}
        >
          <EditableRow
            icon="calendar"
            label="Date & Time"
            value={dateTime}
            onChangeText={setDateTime}
            colors={colors}
          />
          <EditableRow
            icon="map-marker"
            label="Venue"
            value={venue}
            onChangeText={setVenue}
            colors={colors}
          />
          <EditableRow
            icon="users"
            label="Total Participants"
            value={participants}
            onChangeText={setParticipants}
            colors={colors}
          />
          <EditableRow
            icon="money"
            label="Payment Amount"
            value={payment}
            onChangeText={setPayment}
            colors={colors}
          />
          <EditableRow
            icon="link"
            label="Event Link"
            value={eventLink}
            onChangeText={setEventLink}
            colors={colors}
            isLast
          />
        </View>

        {/* Third Box - About the Event */}
        <View
          style={[
            styles.whiteBox,
            {
              backgroundColor: "#FFFFFF",
            },
            Shadows.light,
          ]}
        >
          <Text style={[styles.aboutTitle, { color: colors.text }]}>
            About the Event
          </Text>
          <TextInput
            style={[
              styles.descriptionInput,
              {
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholderTextColor={colors.subText}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        {/* Spacing for sticky button */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Sticky Save Button */}
      <View
        style={[
          styles.stickyButtonContainer,
          { backgroundColor: colors.background, borderTopColor: colors.border },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: colors.softGreenTheme },
          ]}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Reusable component for editable rows with icons
function EditableRow({
  icon,
  label,
  value,
  onChangeText,
  colors,
  isLast,
}: {
  icon: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  colors: typeof Colors.light;
  isLast?: boolean;
}) {
  return (
    <>
      <View style={styles.editableRow}>
        <FontAwesome
          name={icon}
          size={18}
          color={colors.tint}
          style={styles.rowIcon}
        />
        <View style={styles.rowContent}>
          <Text style={[styles.rowLabel, { color: colors.subText }]}>
            {label}
          </Text>
          <TextInput
            style={[styles.rowInput, { color: colors.text }]}
            placeholderTextColor={colors.subText}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </View>
      {!isLast && (
        <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginTop: 8,
  },

  appBarTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },

  // First box - Dark green with white text
  darkGreenBox: {
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },

  fieldSection: {
    marginVertical: 12,
  },

  whiteLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    opacity: 0.9,
  },

  whiteInput: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 4,
    paddingHorizontal: 0,
    borderBottomWidth: 0,
  },

  lightDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 12,
  },

  // Second box - White with icon rows
  whiteBox: {
    borderRadius: Radii.lg,
    marginBottom: Spacing.md,
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
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  rowInput: {
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 4,
    paddingHorizontal: 0,
  },

  rowDivider: {
    height: 1,
    marginHorizontal: Spacing.md,
  },

  // Third box - About the event
  aboutTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },

  descriptionInput: {
    fontSize: 14,
    lineHeight: 20,
    borderRadius: Radii.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    margin: Spacing.md,
    minHeight: 100,
  },

  // Sticky button container
  stickyButtonContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
  },

  saveButton: {
    paddingVertical: 14,
    borderRadius: Radii.md,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.light,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
