import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import EventCard from "@/components/events/EventCard";
import HighlightCard from "@/components/events/HighlightCard";
import FloatingMenu from "@/components/navigation/FloatingMenu";
import Header from "@/components/navigation/Header";
import Tabs from "@/components/navigation/Tabs";

import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing, Radii } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEventState } from "@/context/EventStateContext";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [myTab, setMyTab] = useState("remind");

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  const { eventsMarkedForReminder, registeredEvents } = useEventState();

  const { width } = useWindowDimensions();

  // slider width = half of container (with padding adjustment)
  const sliderWidth = (width - 32) / 2;

  const slider = useSharedValue(0);

  const handleInnerTab = (tab: string) => {
    setMyTab(tab);
    slider.value = withTiming(tab === "remind" ? 0 : sliderWidth, {
      duration: 250,
    });
  };

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slider.value }],
  }));

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
        <Header />

        {/* TOP TABS */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* ================= EVENTS ================= */}
        {activeTab === "events" && (
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut}>
            <View style={styles.row}>
              <HighlightCard />
              <HighlightCard />
              <HighlightCard />
            </View>

            <View style={styles.titleRow}>
              <ThemedText style={styles.title}>
                Events Coming Up
              </ThemedText>
              <ThemedText style={[styles.filter, { backgroundColor: colors.inactiveBtn }]}>Filter</ThemedText>
            </View>

            <EventCard
              title="Tech Conference 2026"
              date="Aug 14"
              location="San Francisco"
              onPress={() =>
                router.push({
                  pathname: "/event_info",
                  params: {
                    id: "tech-conf-2026",
                    title: "Tech Conference 2026",
                    date: "Aug 14, 2026 · 10:00 AM",
                    location: "Moscone Center, San Francisco",
                    organizer: "Tech Club",
                  },
                } as any)
              }
            />
            <EventCard
              title="Startup Meetup"
              date="Sep 2"
              location="New York"
              onPress={() =>
                router.push({
                  pathname: "/event_info",
                  params: {
                    id: "startup-meetup-2026",
                    title: "Startup Meetup",
                    date: "Sep 2, 2026 · 02:00 PM",
                    location: "New York Hub",
                    organizer: "E-Cell",
                  },
                } as any)
              }
            />
            <EventCard
              title="Design Workshop"
              date="Sep 15"
              location="Remote"
              onPress={() =>
                router.push({
                  pathname: "/event_info",
                  params: {
                    id: "design-workshop-2026",
                    title: "Design Workshop",
                    date: "Sep 15, 2026 · 05:00 PM",
                    location: "Online (Zoom)",
                    organizer: "UI/UX Club",
                  },
                } as any)
              }
            />
          </Animated.View>
        )}

        {/* ================= MY EVENTS ================= */}
        {activeTab === "my" && (
          <Animated.View entering={SlideInRight.duration(300)}>
            
            {/* SEGMENT CONTROL */}
            <View style={[styles.segmentWrapper, { backgroundColor: colors.inactiveBtn }]}>
              <Animated.View
                style={[styles.slider, sliderStyle, { width: sliderWidth, backgroundColor: colors.primary }]}
              />

              <TouchableOpacity
                style={styles.segmentBtn}
                onPress={() => handleInnerTab("remind")}
                activeOpacity={0.8}
              >
                <ThemedText style={[styles.segmentText, { color: myTab === "remind" ? "#FFF" : colors.text }]}>
                  Remind Me
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.segmentBtn}
                onPress={() => handleInnerTab("registered")}
                activeOpacity={0.8}
              >
                <ThemedText style={[styles.segmentText, { color: myTab === "registered" ? "#FFF" : colors.text }]}>
                  Registered
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* CONTENT */}
            {myTab === "remind" && (
              <Animated.View entering={FadeIn.duration(250)}>
                {eventsMarkedForReminder.length === 0 ? (
                  <View style={styles.emptyBox}>
                    <ThemedText style={[styles.emptyText, { color: colors.subText }]}>
                      No reminder events yet
                    </ThemedText>
                  </View>
                ) : (
                  eventsMarkedForReminder.map((event) => (
                    <EventCard
                      key={event.id || event.title}
                      title={event.title}
                      date={event.date}
                      location={event.location}
                      onPress={() =>
                        router.push({
                          pathname: "/event_info",
                          params: {
                            id: event.id,
                            title: event.title,
                            date: event.date,
                            location: event.location,
                            organizer: event.organizer,
                            description: event.description,
                          },
                        } as any)
                      }
                    />
                  ))
                )}
              </Animated.View>
            )}

            {myTab === "registered" && (
              <Animated.View entering={FadeIn.duration(250)}>
                {registeredEvents.length === 0 ? (
                  <View style={styles.emptyBox}>
                    <ThemedText style={[styles.emptyText, { color: colors.subText }]}>
                      No registered events yet
                    </ThemedText>
                  </View>
                ) : (
                  registeredEvents.map((event) => (
                    <EventCard
                      key={event.id || event.title}
                      title={event.title}
                      date={event.date}
                      location={event.location}
                      onPress={() =>
                        router.push({
                          pathname: "/event_info",
                          params: {
                            id: event.id,
                            title: event.title,
                            date: event.date,
                            location: event.location,
                            organizer: event.organizer,
                            description: event.description,
                          },
                        } as any)
                      }
                    />
                  ))
                )}
              </Animated.View>
            )}
          </Animated.View>
        )}
      </ScrollView>

      <FloatingMenu />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.lg,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  filter: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radii.sm,
  },
  /* SEGMENT CONTROL */
  segmentWrapper: {
    flexDirection: "row",
    borderRadius: Radii.md,
    overflow: "hidden",
    marginVertical: Spacing.md,
    position: "relative",
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: "center",
    zIndex: 1,
  },
  segmentText: {
    fontWeight: "600",
  },
  slider: {
    position: "absolute",
    height: "100%",
    borderRadius: Radii.md,
  },
  emptyBox: {
    paddingVertical: Spacing.xl * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "500",
  },
});