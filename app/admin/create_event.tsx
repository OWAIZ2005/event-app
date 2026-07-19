import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
    Image,
    ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { apiFetch, getAccessToken, API_BASE_URL } from "@/utils/apiClient";
import { useClubEvents } from "@/context/ClubEventContext";

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
  const params = useLocalSearchParams<{ id?: string }>();
  const { width } = useWindowDimensions();
  const { clubEvents, addClubEvent, updateClubEvent } = useClubEvents();

  const existingEvent = params.id
    ? clubEvents.find((evt) => evt.id === params.id)
    : undefined;

  const isEditMode = Boolean(params.id && existingEvent);

  // Dimensions that mirror AdminDashboard's card sizing
  const bannerHeight = width * 0.45;   // same as largeCardHeight
  const thumbSize   = width * 0.32;   // same as smallCardSize

  const [title, setTitle]       = useState(existingEvent ? existingEvent.title : "");
  const [date, setDate]         = useState(existingEvent ? existingEvent.date : "");
  const [location, setLocation] = useState(existingEvent ? existingEvent.venue : "");
  const [details, setDetails]   = useState(existingEvent ? existingEvent.description : "");
  const [bannerImage, setBannerImage] = useState<string | null>(
    existingEvent?.bannerImage || null
  );
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (existingEvent) {
      setTitle(existingEvent.title);
      setDate(existingEvent.date);
      setLocation(existingEvent.venue);
      setDetails(existingEvent.description);
      setBannerImage(existingEvent.bannerImage || null);
    }
  }, [existingEvent]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access library is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setBannerImage(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    if (!title.trim() || !location.trim() || !details.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsCreating(true);

    try {
      if (isEditMode && existingEvent) {
        updateClubEvent({
          ...existingEvent,
          title: title.trim(),
          date: date.trim() || existingEvent.date,
          venue: location.trim(),
          description: details.trim(),
          bannerImage: bannerImage || null,
        });
        alert("Event updated successfully!");
      } else {
        addClubEvent({
          title: title.trim(),
          date:
            date.trim() ||
            new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          venue: location.trim(),
          description: details.trim(),
          category: "General",
          organizer: "Tech Club",
          bannerImage: bannerImage || null,
        });
        alert("Event created successfully!");
      }

      router.back();
    } catch (e: any) {
      alert(e.message || "An error occurred");
    } finally {
      setIsCreating(false);
    }
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
        <Text style={styles.headerTitle}>
          {isEditMode ? "Edit Event" : "Add New Event"}
        </Text>
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
          <TouchableOpacity activeOpacity={0.75} onPress={pickImage}>
            <View style={[styles.largeCard, { height: bannerHeight }]}>
              {bannerImage ? (
                <Image source={{ uri: bannerImage }} style={{ width: "100%", height: "100%", borderRadius: Radii.lg }} resizeMode="cover" />
              ) : (
                <View style={styles.uploadHint}>
                  <FontAwesome name="pencil-square-o" size={28} color={GREEN_DIM} />
                  <Text style={styles.uploadText}>Tap to add banner</Text>
                </View>
              )}
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
        disabled={isCreating}
      >
        {isCreating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <FontAwesome name="check" size={22} color="#fff" />
        )}
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