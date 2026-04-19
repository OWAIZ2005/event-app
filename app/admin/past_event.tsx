import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Radii, Spacing } from "../../constants/theme";

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#222222";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const GREEN_SOFT = "#1C2E20";
const GREEN_SOFT_BORDER = "#2E5C34";
const SUBTEXT = "#666666";
const TEXT = "#F5F5F5";

export default function PastEventScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const bannerHeight = width * 0.55;

  return (
    <View style={styles.screen}>
      <View style={styles.glowTop} pointerEvents="none" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner */}
        <View style={[styles.banner, { height: bannerHeight }]}>
          <FontAwesome
            name="image"
            size={40}
            color={TEXT}
            style={{ opacity: 0.15 }}
          />
        </View>

        {/* Green soft header box */}
        <View style={styles.greenBox}>
          <View style={styles.fieldSection}>
            <Text style={styles.greenLabel}>Event Name</Text>
            <Text style={styles.greenValue}>Tech Conference 2026</Text>
          </View>
          <View style={styles.dividerLight} />
          <View style={styles.fieldSection}>
            <Text style={styles.greenLabel}>Organizer</Text>
            <Text style={styles.greenValue}>John Doe</Text>
          </View>
        </View>

        {/* Info card */}
        <View style={styles.darkBox}>
          <InfoRow
            icon="calendar"
            label="Date & Time"
            value="May 15, 2026 • 2:00 PM"
          />
          <RowDivider />
          <InfoRow
            icon="map-marker"
            label="Venue"
            value="Grand Convention Hall, NYC"
          />
          <RowDivider />
          <InfoRow icon="users" label="Total Participants" value="250" />
          <RowDivider />
          <InfoRow
            icon="money"
            label="Payment Amount"
            value="$50.00 per ticket"
          />
          <RowDivider />
          <InfoRow
            icon="link"
            label="Event Link"
            value="www.techconf2026.com"
            isLast
          />
        </View>

        {/* About card */}
        <View style={styles.darkBox}>
          <Text style={styles.aboutTitle}>About the Event</Text>
          <Text style={styles.aboutBody}>
            Join us for an exciting tech conference where industry leaders share
            insights on emerging technologies, AI, and digital transformation.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
  isLast,
}: {
  icon: string;
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <View style={styles.infoRow}>
      <FontAwesome
        name={icon as any}
        size={17}
        color={GREEN}
        style={styles.rowIcon}
      />
      <View style={styles.rowContent}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

function RowDivider() {
  return <View style={styles.rowDivider} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BLACK },
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
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
  },
  banner: {
    width: "100%",
    borderRadius: Radii.lg,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  greenBox: {
    backgroundColor: GREEN_SOFT,
    borderWidth: 1,
    borderColor: GREEN_SOFT_BORDER,
    borderRadius: Radii.lg,
    padding: Spacing.md,
  },
  fieldSection: { marginVertical: 8 },
  greenLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: GREEN_DIM,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
    opacity: 0.8,
  },
  greenValue: { fontSize: 17, fontWeight: "700", color: TEXT },
  dividerLight: {
    height: 1,
    backgroundColor: GREEN_SOFT_BORDER,
    marginVertical: 4,
  },
  darkBox: {
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: Radii.lg,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
  },
  rowIcon: { marginRight: 12, marginTop: 3 },
  rowContent: { flex: 1 },
  rowLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: SUBTEXT,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  rowValue: { fontSize: 15, fontWeight: "600", color: TEXT },
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
    marginBottom: 8,
  },
  aboutBody: {
    fontSize: 14,
    lineHeight: 22,
    color: TEXT,
    opacity: 0.75,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
});
