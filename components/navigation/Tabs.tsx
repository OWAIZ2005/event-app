import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
import { Colors, Spacing, Radii } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import React from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        onPress={() => setActiveTab("events")}
        style={[
          styles.tab, 
          { backgroundColor: activeTab === "events" ? colors.successGreen : colors.inactiveBtn }
        ]}
        activeOpacity={0.7}
      >
        <ThemedText style={[styles.text, { color: activeTab === "events" ? "#FFF" : colors.text }]}>
          Events
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab("my")}
        style={[
          styles.tab, 
          { backgroundColor: activeTab === "my" ? colors.successGreen : colors.inactiveBtn }
        ]}
        activeOpacity={0.7}
      >
        <ThemedText style={[styles.text, { color: activeTab === "my" ? "#FFF" : colors.text }]}>
          My Events
        </ThemedText>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radii.sm,
  },
  text: {
    fontWeight: "600",
  },
});
