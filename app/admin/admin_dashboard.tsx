import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Radii, Shadows } from "../../constants/theme";

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#1E1E1E";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const SUBTEXT = "#555555";
const TEXT = "#F5F5F5";

export default function AdminDashboard() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const smallCardSize = width * 0.32;
  const largeCardHeight = width * 0.45;

  return (
    <View style={styles.screen}>
      {/* Glow blob */}
      <View style={styles.glowTop} pointerEvents="none" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Past Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Past Events</Text>
          <Text style={styles.sectionSub}>See all →</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.75}
              onPress={() => router.push("/admin/past_event" as any)}
            >
              <View
                style={[
                  styles.smallCard,
                  { width: smallCardSize, height: smallCardSize },
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* My Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Events</Text>
        </View>

        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.cardBlock}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.push("/admin/edit_event" as any)}
            >
              <View style={[styles.largeCard, { height: largeCardHeight }]}>
                {/* Edit badge */}
                <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        {/* Bottom padding for FAB */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* FAB — navigates to the Create Event page */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => router.push("/admin/create_event" as any)}
      >
        <FontAwesome name="plus" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

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
    justifyContent: "flex-end",
    padding: 12,
  },
  editBtn: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(28,185,68,0.12)",
    borderWidth: 1,
    borderColor: "rgba(28,185,68,0.3)",
    borderRadius: Radii.sm,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  editText: {
    color: GREEN_DIM,
    fontSize: 12,
    fontWeight: "600",
  },

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