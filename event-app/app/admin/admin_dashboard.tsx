import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Image
} from "react-native";
import { Radii, Shadows } from "../../constants/theme";
import { useQuery } from "@tanstack/react-query";
import { apiFetch, clearTokens } from "../../utils/apiClient";
import { format } from "date-fns";

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

  const { data: club, isLoading: clubLoading } = useQuery({
    queryKey: ["myClub"],
    queryFn: () => apiFetch("/clubs/my"),
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["myAnalytics"],
    queryFn: () => apiFetch("/clubs/my/analytics"),
  });

  const events = club?.events || [];
  const pastEvents = events.filter((e: any) => new Date(e.date) < new Date());
  const upcomingEvents = events.filter((e: any) => new Date(e.date) >= new Date());

  if (clubLoading || analyticsLoading) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.glowTop} pointerEvents="none" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Stats / Profile info */}
        <View style={{ padding: 20, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ color: TEXT, fontSize: 24, fontWeight: 'bold' }}>{club?.name || 'My Club'}</Text>
            <Text style={{ color: SUBTEXT }}>Manage your events and profile</Text>
          </View>
          <TouchableOpacity 
            style={{ paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(229,57,53,0.1)', borderRadius: Radii.sm, borderWidth: 1, borderColor: 'rgba(229,57,53,0.3)' }}
            onPress={async () => {
              await clearTokens();
              router.replace("/login");
            }}
          >
            <Text style={{ color: '#E53935', fontSize: 12, fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Analytics Grid */}
        <View style={styles.analyticsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{analytics?.totalViews || 0}</Text>
            <Text style={styles.statLabel}>Total Views</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{analytics?.totalFavorites || 0}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{analytics?.totalShares || 0}</Text>
            <Text style={styles.statLabel}>Shares</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{analytics?.totalRegisterClicks || 0}</Text>
            <Text style={styles.statLabel}>Reg. Clicks</Text>
          </View>
        </View>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Past Events</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hRow}
            >
              {pastEvents.map((event: any) => (
                <TouchableOpacity
                  key={event.id}
                  activeOpacity={0.75}
                  onPress={() => router.push(`/admin/edit_event?id=${event.id}` as any)}
                >
                  <View
                    style={[
                      styles.smallCard,
                      { width: smallCardSize, height: smallCardSize, padding: 8, justifyContent: 'flex-end' },
                    ]}
                  >
                     {event.posterUrl && (
                        <Image source={{ uri: event.posterUrl }} style={{...StyleSheet.absoluteFillObject, borderRadius: Radii.lg, opacity: 0.5}} />
                     )}
                     <Text style={{ color: TEXT, fontSize: 12, fontWeight: 'bold' }} numberOfLines={2}>{event.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
        </View>

        {upcomingEvents.length === 0 && (
          <Text style={{ color: SUBTEXT, marginLeft: 20 }}>No upcoming events.</Text>
        )}

        {upcomingEvents.map((event: any) => (
          <View key={event.id} style={styles.cardBlock}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => router.push(`/admin/edit_event?id=${event.id}` as any)}
            >
              <View style={[styles.largeCard, { height: largeCardHeight, padding: 16 }]}>
                 {event.posterUrl && (
                    <Image source={{ uri: event.posterUrl }} style={{...StyleSheet.absoluteFillObject, borderRadius: Radii.lg, opacity: 0.4}} />
                 )}
                <View style={{ flex: 1 }}>
                  <Text style={{ color: TEXT, fontSize: 18, fontWeight: 'bold' }}>{event.title}</Text>
                  <Text style={{ color: GREEN_DIM }}>{format(new Date(event.date), "MMM d, yyyy")}</Text>
                  <Text style={{ color: SUBTEXT, marginTop: 4 }}>{event.isPublished ? "Published" : "Draft"}</Text>
                </View>
                {/* Edit badge */}
                <TouchableOpacity style={styles.editBtn} activeOpacity={0.8} onPress={() => router.push(`/admin/edit_event?id=${event.id}` as any)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        {/* Bottom padding for FAB */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* FAB to Create New Event */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => router.push("/admin/edit_event" as any)}>
        <FontAwesome name="plus" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BLACK },
  glowTop: { position: "absolute", top: -100, right: -80, width: 260, height: 260, borderRadius: 130, backgroundColor: GREEN, opacity: 0.06 },
  
  analyticsGrid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: 20, marginTop: 10, justifyContent: "space-between" },
  statBox: { width: "48%", backgroundColor: SURFACE, borderRadius: Radii.md, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: BORDER },
  statNumber: { fontSize: 24, fontWeight: "bold", color: TEXT, marginBottom: 4 },
  statLabel: { fontSize: 12, color: SUBTEXT, textTransform: "uppercase", letterSpacing: 1 },

  sectionHeader: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginHorizontal: 20, marginTop: 24, marginBottom: 14 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: TEXT, letterSpacing: -0.5 },
  sectionSub: { fontSize: 12, fontWeight: "500", color: GREEN_DIM },
  hRow: { paddingLeft: 20, paddingRight: 8 },
  smallCard: { borderRadius: Radii.lg, backgroundColor: SURFACE, borderWidth: 1, borderColor: "rgba(28,185,68,0.3)", marginRight: 12, overflow: "hidden" },
  cardBlock: { marginHorizontal: 20, marginBottom: 14 },
  largeCard: { width: "100%", borderRadius: Radii.lg, backgroundColor: SURFACE, borderWidth: 1, borderColor: "rgba(28,185,68,0.3)", justifyContent: "flex-end", padding: 12, overflow: "hidden" },
  editBtn: { alignSelf: "flex-end", backgroundColor: "rgba(28,185,68,0.12)", borderWidth: 1, borderColor: "rgba(28,185,68,0.3)", borderRadius: Radii.sm, paddingHorizontal: 14, paddingVertical: 6 },
  editText: { color: GREEN_DIM, fontSize: 12, fontWeight: "600" },
  fab: { position: "absolute", bottom: 24, right: 20, width: 54, height: 54, borderRadius: 27, backgroundColor: GREEN, alignItems: "center", justifyContent: "center", ...Shadows.strong, shadowColor: GREEN, shadowOpacity: 0.4 },
});
