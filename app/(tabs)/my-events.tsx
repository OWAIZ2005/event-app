import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import EventCard from "@/components/events/EventCard";
import FloatingMenu from "@/components/navigation/FloatingMenu";
import Header from "@/components/navigation/Header";

import { ThemedText } from "@/components/themed-text";
import { Colors, Radii, Spacing } from "@/constants/theme";
import { useEventState } from "@/context/EventStateContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function MyEventsScreen() {
  const [myTab, setMyTab] = useState("remind");

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  const { eventsMarkedForReminder, registeredEvents } = useEventState();

  const { width } = useWindowDimensions();
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <ThemedText style={styles.headerTitle}>My Events</ThemedText>

        {/* SEGMENT CONTROL */}
        <View
          style={[
            styles.segmentWrapper,
            { backgroundColor: colors.inactiveBtn },
          ]}
        >
          <Animated.View
            style={[
              styles.slider,
              sliderStyle,
              { width: sliderWidth, backgroundColor: colors.primary },
            ]}
          />

          <TouchableOpacity
            style={styles.segmentBtn}
            onPress={() => handleInnerTab("remind")}
            activeOpacity={0.8}
          >
            <ThemedText
              style={[
                styles.segmentText,
                { color: myTab === "remind" ? "#FFF" : colors.text },
              ]}
            >
              Remind Me
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.segmentBtn}
            onPress={() => handleInnerTab("registered")}
            activeOpacity={0.8}
          >
            <ThemedText
              style={[
                styles.segmentText,
                { color: myTab === "registered" ? "#FFF" : colors.text },
              ]}
            >
              Registered
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        {myTab === "remind" && (
          <Animated.View entering={FadeIn.duration(250)}>
            {eventsMarkedForReminder.length === 0 ? (
              <View style={styles.emptyBox}>
                <ThemedText
                  style={[styles.emptyText, { color: colors.subText }]}
                >
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
                <ThemedText
                  style={[styles.emptyText, { color: colors.subText }]}
                >
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
      </ScrollView>

      <FloatingMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: Spacing.xs,
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

