import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [myTab, setMyTab] = useState("remind");

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

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
    <>
      {/* Fills status bar area with same background color */}
      <SafeAreaView
  style={{ flex: 1, backgroundColor: colors.background }}
  edges={["top"]}
>
     
        <ScrollView
          style={[styles.container, { backgroundColor: colors.background }]}
          showsVerticalScrollIndicator={false}
        >
          <Header />

          {/* TOP TABS */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* ================= EVENTS ================= */}
          {activeTab === "events" && (
            <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut}>

              {/* Horizontally scrollable highlight cards */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.row}
              >
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
              </ScrollView>

              <View style={styles.titleRow}>
                <ThemedText style={styles.title}>Events Coming Up</ThemedText>
                <ThemedText style={[styles.filter, { backgroundColor: colors.inactiveBtn }]}>
                  Filter
                </ThemedText>
              </View>

              <EventCard title="Tech Conference 2026" date="Aug 14" location="San Francisco" />
              <EventCard title="Startup Meetup" date="Sep 2" location="New York" />
              <EventCard title="Design Workshop" date="Sep 15" location="Remote" />
            </Animated.View>
          )}

          {/* ================= MY EVENTS ================= */}
          {activeTab === "my" && (
            <Animated.View entering={SlideInRight.duration(300)}>

              {/* SEGMENT CONTROL */}
              <View style={[styles.segmentWrapper, { backgroundColor: colors.inactiveBtn }]}>
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
                    style={[styles.segmentText, { color: myTab === "remind" ? "#FFF" : colors.text }]}
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
                    style={[styles.segmentText, { color: myTab === "registered" ? "#FFF" : colors.text }]}
                  >
                    Registered
                  </ThemedText>
                </TouchableOpacity>
              </View>

              {/* CONTENT */}
              {myTab === "remind" && (
                <Animated.View entering={FadeIn.duration(250)}>
                  <EventCard title="UX Research Sync" date="Tomorrow" location="Zoom" />
                  <EventCard title="Investors Dinner" date="Friday" location="Downtown" />
                </Animated.View>
              )}

              {myTab === "registered" && (
                <Animated.View entering={FadeIn.duration(250)}>
                  <EventCard title="Hackathon 2026" date="Oct 20-22" location="London" />
                  <EventCard title="DevRel Conference" date="Nov 5" location="Berlin" />
                  <EventCard title="AI Summit" date="Dec 10" location="Remote" />
                </Animated.View>
              )}
            </Animated.View>
          )}
        </ScrollView>

        <FloatingMenu />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: Spacing.lg,
    paddingRight: Spacing.md,
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
});