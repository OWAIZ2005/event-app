import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MyEventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Events</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "IrishGrover",
    color: "#333",
  },
});
