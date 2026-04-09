import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import EventCard from "@/components/EventCard";
import FloatingMenu from "@/components/FloatingMenu";
import Header from "@/components/Header";
import HighlightCard from "@/components/HighlightCard";
import Tabs from "@/components/Tabs";
import { ThemedText } from "@/components/themed-text";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [myTab, setMyTab] = useState("remind");

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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
              <ThemedText style={styles.filter}>Filter</ThemedText>
            </View>

            <EventCard />
            <EventCard />
            <EventCard />
          </Animated.View>
        )}

        {/* ================= MY EVENTS ================= */}
        {activeTab === "my" && (
          <Animated.View entering={SlideInRight.duration(300)}>
            
            {/* SEGMENT CONTROL */}
            <View style={styles.segmentWrapper}>
              <Animated.View
                style={[styles.slider, sliderStyle, { width: sliderWidth }]}
              />

              <TouchableOpacity
                style={styles.segmentBtn}
                onPress={() => handleInnerTab("remind")}
              >
                <ThemedText style={styles.segmentText}>
                  Remind Me
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.segmentBtn}
                onPress={() => handleInnerTab("registered")}
              >
                <ThemedText style={styles.segmentText}>
                  Registered
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* CONTENT */}
            {myTab === "remind" && (
              <Animated.View entering={FadeIn.duration(250)}>
                <EventCard />
                <EventCard />
              </Animated.View>
            )}

            {myTab === "registered" && (
              <Animated.View entering={FadeIn.duration(250)}>
                <EventCard />
                <EventCard />
                <EventCard />
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
    padding: 16,
    backgroundColor: "#F5F5F5",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  filter: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  /* SEGMENT CONTROL */
  segmentWrapper: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
    position: "relative",
  },

  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 1,
  },

  segmentText: {
    fontWeight: "600",
  },

  slider: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#A8D5BA",
    borderRadius: 10,
  },
});