import { useState, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import EventCard from "@/components/EventCard";
import HighlightCard from "@/components/events/HighlightCard";
import FloatingMenu from "@/components/navigation/FloatingMenu";
import Header from "@/components/navigation/Header";
import Tabs from "@/components/navigation/Tabs";

import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing, Radii } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { useEvents, useMyFavorites } from "@/hooks/useEvents";

const CATEGORIES = ["All", "Tech", "Cultural", "Sports", "Workshop", "Seminars"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  // Fetch Events
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching
  } = useEvents({ 
    upcoming: true, 
    ...(searchQuery && { search: searchQuery }),
    ...(selectedCategory !== "All" && { category: selectedCategory })
  });

  const { data: favorites, isLoading: isFavLoading, refetch: refetchFavs } = useMyFavorites();

  const events = data?.pages.flatMap((page) => page.events) || [];
  const featuredEvents = events.slice(0, 3);
  const todayEvents = events.filter((e: any) => new Date(e.date).toDateString() === new Date().toDateString());

  // My Schedule sorting (chronological)
  const mySchedule = useMemo(() => {
    if (!favorites) return [];
    return [...favorites].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [favorites]);

  const onRefresh = async () => {
    if (activeTab === "events") {
      await refetch();
    } else {
      await refetchFavs();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor={colors.primary} />}
        onScroll={({ nativeEvent }) => {
          if (
            nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 50
          ) {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }
        }}
        scrollEventThrottle={400}
      >
        <Header />

        {/* TOP TABS */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* ================= EVENTS ================= */}
        {activeTab === "events" && (
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut}>
            
            {/* Search Bar */}
            <View style={[styles.searchBar, { backgroundColor: colors.inactiveBtn }]}>
              <Ionicons name="search" size={20} color={colors.text} style={{ opacity: 0.5 }} />
              <TextInput 
                placeholder="Search events, clubs..." 
                placeholderTextColor={colors.text + "80"}
                style={[styles.searchInput, { color: colors.text }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Categories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity 
                  key={cat} 
                  onPress={() => setSelectedCategory(cat)}
                  style={[styles.categoryPill, { backgroundColor: selectedCategory === cat ? colors.primary : colors.inactiveBtn }]}
                >
                  <Text style={{ color: selectedCategory === cat ? "#fff" : colors.text, fontWeight: "600" }}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Featured Events */}
            {featuredEvents.length > 0 && !searchQuery && selectedCategory === "All" && (
              <>
                <ThemedText style={styles.title}>Featured Events</ThemedText>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
                  {featuredEvents.map((event: any) => (
                    <TouchableOpacity key={event.id} onPress={() => router.push(`/event_info?id=${event.id}` as any)} style={{ width: 280, marginRight: 15 }}>
                      <EventCard
                        event={{
                          id: event.id,
                          title: event.title,
                          clubName: event.club.name,
                          date: event.date,
                          venue: event.venue,
                          posterUrl: event.posterUrl,
                        }}
                        onPress={() => router.push(`/event_info?id=${event.id}` as any)}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            {/* Today's Events */}
            {todayEvents.length > 0 && !searchQuery && selectedCategory === "All" && (
              <>
                <ThemedText style={styles.title}>Happening Today</ThemedText>
                {todayEvents.map((event: any) => (
                  <EventCard
                    key={`today-${event.id}`}
                    event={{
                      id: event.id,
                      title: event.title,
                      clubName: event.club.name,
                      date: event.date,
                      venue: event.venue,
                      posterUrl: event.posterUrl,
                    }}
                    onPress={() => router.push(`/event_info?id=${event.id}` as any)}
                  />
                ))}
              </>
            )}

            <View style={styles.titleRow}>
              <ThemedText style={styles.title}>{searchQuery ? "Search Results" : "Explore Events"}</ThemedText>
            </View>

            {isLoading && <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />}
            
            {!isLoading && events.length === 0 && (
              <View style={styles.emptyState}>
                 <Ionicons name="calendar-outline" size={48} color={colors.primary} style={{ opacity: 0.5, marginBottom: 10 }} />
                 <Text style={{ color: colors.text, fontSize: 16 }}>No events found.</Text>
                 <Text style={{ color: colors.text, opacity: 0.5, marginTop: 4 }}>Try adjusting your filters or search.</Text>
              </View>
            )}

            {events.map((event: any) => (
              <EventCard
                key={event.id}
                event={{
                  id: event.id,
                  title: event.title,
                  clubName: event.club.name,
                  date: event.date,
                  venue: event.venue,
                  posterUrl: event.posterUrl,
                }}
                onPress={() => router.push(`/event_info?id=${event.id}` as any)}
              />
            ))}

            {isFetchingNextPage && <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 20 }} />}
            <View style={{ height: 100 }} />
          </Animated.View>
        )}

        {/* ================= MY SCHEDULE ================= */}
        {activeTab === "my" && (
          <Animated.View entering={SlideInRight.duration(300)}>
            <View style={styles.titleRow}>
              <ThemedText style={styles.title}>My Schedule</ThemedText>
            </View>

            {isFavLoading ? (
              <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
            ) : mySchedule?.length ? (
              mySchedule.map((fav: any) => (
                <EventCard
                  key={fav.id}
                  event={{
                    id: fav.id,
                    title: fav.title,
                    clubName: fav.club?.name,
                    date: fav.date,
                    venue: fav.venue,
                    posterUrl: fav.posterUrl,
                  }}
                  onPress={() => router.push(`/event_info?id=${fav.id}` as any)}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                 <Ionicons name="bookmark-outline" size={48} color={colors.primary} style={{ opacity: 0.5, marginBottom: 10 }} />
                 <Text style={{ color: colors.text, fontSize: 16 }}>Your schedule is empty.</Text>
                 <Text style={{ color: colors.text, opacity: 0.5, marginTop: 4 }}>Events you favorite or register for will appear here.</Text>
              </View>
            )}
            
            <View style={{ height: 100 }} />
          </Animated.View>
        )}
      </ScrollView>

      <FloatingMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md },
  searchBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, height: 48, borderRadius: Radii.md, marginBottom: 16 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, fontWeight: "500" },
  categoryRow: { paddingBottom: 16 },
  categoryPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  row: { flexDirection: "row", gap: 12, paddingBottom: Spacing.lg },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.sm, marginTop: Spacing.md },
  title: { fontSize: 20, fontWeight: "700" },
  filter: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: Radii.sm },
  emptyState: { alignItems: "center", justifyContent: "center", paddingVertical: 60 },
});