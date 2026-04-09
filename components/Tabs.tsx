import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function Tabs({ activeTab, setActiveTab }: any) {
  return (
    <ThemedView style={styles.container}>
      
      <TouchableOpacity
        onPress={() => setActiveTab("events")}
        style={activeTab === "events" ? styles.active : styles.inactive}
      >
        <ThemedText style={styles.text}>Events</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab("my")}
        style={activeTab === "my" ? styles.active : styles.inactive}
      >
        <ThemedText style={styles.text}>My Events</ThemedText>
      </TouchableOpacity>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },

  active: {
    backgroundColor: "#A8D5BA",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  inactive: {
    backgroundColor: "#ddd",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  text: {
    fontWeight: "500",
  },
});