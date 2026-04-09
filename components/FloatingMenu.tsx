import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { ThemedText } from "./themed-text";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);

  // animation values
  const anim1 = new Animated.Value(0);
  const anim2 = new Animated.Value(0);
  const anim3 = new Animated.Value(0);
 
  const toggleMenu = () => {
    setOpen(!open);

    Animated.stagger(50, [
      Animated.timing(anim1, { toValue: open ? 0 : 1, duration: 200, useNativeDriver: true }),
      Animated.timing(anim2, { toValue: open ? 0 : 1, duration: 200, useNativeDriver: true }),
      Animated.timing(anim3, { toValue: open ? 0 : 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>

      {/* Small buttons */}
      <Animated.View
        style={[
          styles.smallBtn,
          {
            transform: [
              { scale: anim1 },
              { translateY: anim1.interpolate({ inputRange: [0, 1], outputRange: [0, -80] }) }
            ]
          }
        ]}
      />

      <Animated.View
        style={[
          styles.smallBtn,
          {
            transform: [
              { scale: anim2 },
              { translateX: anim2.interpolate({ inputRange: [0, 1], outputRange: [0, -60] }) },
              { translateY: anim2.interpolate({ inputRange: [0, 1], outputRange: [0, -60] }) }
            ]
          }
        ]}
      />

      <Animated.View
        style={[
          styles.smallBtn,
          {
            transform: [
              { scale: anim3 },
              { translateX: anim3.interpolate({ inputRange: [0, 1], outputRange: [0, -80] }) }
            ]
          }
        ]}
      />

      {/* Main FAB */}
      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <ThemedText style={{ fontSize: 20 }}>≡</ThemedText>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
  },
  fab: {
    width: 67,
    height: 67,
    borderRadius: 30,
    backgroundColor: "#A8D5BA",
    justifyContent: "center",
    alignItems: "center",
  },
  smallBtn: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A8D5BA",
  },
});