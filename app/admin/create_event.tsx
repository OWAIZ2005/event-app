import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

// ── Theme tokens (mirrored from AdminDashboard) ──────────────────────────────
const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#1E1E1E";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const SUBTEXT = "#555555";
const TEXT = "#F5F5F5";

const Radii = { sm: 8, md: 12, lg: 16 };
const Shadows = {
  strong: {
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 10,
  },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function CreateEvent() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Dimensions that mirror AdminDashboard's card sizing
  const bannerHeight = width * 0.45;   // same as largeCardHeight
  const thumbSize   = width * 0.32;   // same as smallCardSize

  const [title, setTitle]       = useState("");
  const [date, setDate]         = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails]   = useState("");

  const handleCreate = () => {
    // TODO: wire up your actual create logic / API call here
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Glow blob — same position & size as AdminDashboard */}
      <View style={styles.glowTop} pointerEvents="none" />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <FontAwesome name="chevron-left" size={16} color={GREEN_DIM} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Event</Text>
        {/* spacer keeps title centred */}
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Banner image placeholder (large card) ────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Event Banner</Text>
        </View>

        <View style={styles.cardBlock}>
          <TouchableOpacity activeOpacity={0.75}>
            <View style={[styles.largeCard, { height: bannerHeight }]}>
              <View style={styles.uploadHint}>
                <FontAwesome name="pencil-square-o" size={28} color={GREEN_DIM} />
                <Text style={styles.uploadText}>Tap to add banner</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Thumbnail strip (small cards) ────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <Text style={styles.sectionSub}>Add photos →</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.75}
              style={[
                styles.smallCard,
                { width: thumbSize, height: thumbSize },
              ]}
            >
              <FontAwesome name="plus" size={20} color={GREEN_DIM} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Form fields ──────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Details</Text>
        </View>

        <View style={styles.cardBlock}>
          <View style={styles.formCard}>
            <Field
              label="Event Title"
              value={title}
              onChange={setTitle}
              placeholder="e.g. Summer Hackathon 2025"
            />
            <Divider />
            <Field
              label="Date & Time"
              value={date}
              onChange={setDate}
              placeholder="e.g. 12 Aug 2025 · 10:00 AM"
            />
            <Divider />
            <Field
              label="Location"
              value={location}
              onChange={setLocation}
              placeholder="Venue or online link"
            />
            <Divider />
            <Field
              label="About"
              value={details}
              onChange={setDetails}
              placeholder="Describe the event…"
              multiline
              inputStyle={{ minHeight: 88, textAlignVertical: "top" }}
            />
          </View>
        </View>

        {/* Bottom padding so FAB doesn't overlap last field */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* ── FAB — Create (mirrors AdminDashboard's FAB style) ────────────── */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={handleCreate}
      >
        <FontAwesome name="check" size={22} color="#fff" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────
function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  inputStyle = {},
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  multiline?: boolean;
  inputStyle?: object;
}) {
  return (
    <View style={fieldStyles.wrap}>
      <Text style={fieldStyles.label}>{label}</Text>
      <TextInput
        style={[fieldStyles.input, inputStyle]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={SUBTEXT}
        multiline={multiline}
        selectionColor={GREEN}
      />
    </View>
  );
}

function Divider() {
  return <View style={{ height: 1, backgroundColor: BORDER, marginVertical: 4 }} />;
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
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
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 4,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.sm,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: "rgba(28,185,68,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.5,
  },

  // Section headers — identical to AdminDashboard
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.5,
  },
  sectionSub: {
    fontSize: 12,
    fontWeight: "500",
    color: GREEN_DIM,
  },

  // Cards — identical dimensions/borders to AdminDashboard
  hRow: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  smallCard: {
    borderRadius: Radii.lg,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: "rgba(28,185,68,0.3)",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBlock: {
    marginHorizontal: 20,
    marginBottom: 14,
  },
  largeCard: {
    width: "100%",
    borderRadius: Radii.lg,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: "rgba(28,185,68,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadHint: {
    alignItems: "center",
    gap: 8,
  },
  uploadText: {
    color: SUBTEXT,
    fontSize: 13,
    fontWeight: "500",
    marginTop: 8,
  },

  // Form card
  formCard: {
    backgroundColor: SURFACE,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(28,185,68,0.3)",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  // FAB — identical to AdminDashboard
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.strong,
    shadowColor: GREEN,
    shadowOpacity: 0.4,
  },
});

const fieldStyles = StyleSheet.create({
  wrap: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: SUBTEXT,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  input: {
    fontSize: 15,
    fontWeight: "500",
    color: TEXT,
  },
});