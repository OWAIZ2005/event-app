import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Colors, Radii, Shadows, Spacing } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";

export default function PastEventScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const { width } = useWindowDimensions();

  const bannerHeight = width * 0.55;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header handled by _layout.tsx */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner */}
        <View
          style={[
            styles.banner,
            { height: bannerHeight, backgroundColor: colors.cardGreenBg },
            Shadows.light,
          ]}
        >
          <FontAwesome
            name="image"
            size={40}
            color={colors.text}
            style={{ opacity: 0.2 }}
          />
        </View>

        {/* Dark Green Header */}
        <View
          style={[
            styles.darkGreenBox,
            { backgroundColor: colors.tint },
            Shadows.light,
          ]}
        >
          <View style={styles.fieldSection}>
            <Text style={styles.whiteLabel}>Event Name</Text>
            <Text style={styles.whiteValue}>Tech Conference 2026</Text>
          </View>
          <View style={styles.dividerLight} />
          <View style={styles.fieldSection}>
            <Text style={styles.whiteLabel}>Organizer</Text>
            <Text style={styles.whiteValue}>John Doe</Text>
          </View>
        </View>

        {/* Info Card */}
        <View
          style={[
            styles.whiteBox,
            { backgroundColor: colors.cardGreenBg },
            Shadows.light,
          ]}
        >
          <InfoRow
            icon="calendar"
            label="Date & Time"
            value="May 15, 2026 • 2:00 PM"
            colors={colors}
          />
          <RowDivider color={colors.border} />
          <InfoRow
            icon="map-marker"
            label="Venue"
            value="Grand Convention Hall, NYC"
            colors={colors}
          />
          <RowDivider color={colors.border} />
          <InfoRow
            icon="users"
            label="Total Participants"
            value="250"
            colors={colors}
          />
          <RowDivider color={colors.border} />
          <InfoRow
            icon="money"
            label="Payment Amount"
            value="$50.00 per ticket"
            colors={colors}
          />
          <RowDivider color={colors.border} />
          <InfoRow
            icon="link"
            label="Event Link"
            value="www.techconf2026.com"
            colors={colors}
            isLast
          />
        </View>

        {/* About Card */}
        <View
          style={[
            styles.whiteBox,
            { backgroundColor: colors.cardGreenBg },
            Shadows.light,
          ]}
        >
          <Text style={[styles.aboutTitle, { color: colors.text }]}>
            About the Event
          </Text>
          <Text style={[styles.aboutBody, { color: colors.text }]}>
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
  colors,
  isLast,
}: {
  icon: string;
  label: string;
  value: string;
  colors: typeof Colors.light;
  isLast?: boolean;
}) {
  return (
    <View style={styles.infoRow}>
      <FontAwesome
        name={icon as any}
        size={17}
        color={colors.tint}
        style={styles.rowIcon}
      />
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, { color: colors.subText }]}>
          {label}
        </Text>
        <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
      </View>
    </View>
  );
}

function RowDivider({ color }: { color: string }) {
  return <View style={[styles.rowDivider, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  banner: {
    width: "100%",
    borderRadius: Radii.lg,
    marginBottom: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  darkGreenBox: {
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  fieldSection: { marginVertical: 8 },
  whiteLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    opacity: 0.8,
  },
  whiteValue: { fontSize: 17, fontWeight: "700", color: "#FFFFFF" },
  dividerLight: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 4,
  },
  whiteBox: {
    borderRadius: Radii.lg,
    marginBottom: Spacing.md,
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
    fontSize: 11,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  rowValue: { fontSize: 15, fontWeight: "600" },
  rowDivider: { height: 1, marginHorizontal: Spacing.md },
  aboutTitle: {
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    marginBottom: 8,
  },
  aboutBody: {
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    opacity: 0.8,
  },
});
