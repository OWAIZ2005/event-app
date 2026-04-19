import { useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, Shadows, Spacing } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { ThemedText } from "../themed-text";
interface FloatingMenuProps {
  onMainPress?: () => void;
}

export default function FloatingMenu({ onMainPress }: FloatingMenuProps) {
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  // animation values
  const anim1 = new Animated.Value(0);
  const anim2 = new Animated.Value(0);
  const anim3 = new Animated.Value(0);

  const toggleMenu = () => {
    setOpen(!open);

    Animated.stagger(50, [
      Animated.timing(anim1, {
        toValue: open ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(anim2, {
        toValue: open ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(anim3, {
        toValue: open ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const btnColor = { backgroundColor: colors.softGreenTheme };

  return (
    <View style={styles.container}>
      {/* Small buttons */}
      <Animated.View
        style={[
          styles.smallBtn,
          btnColor,
          Shadows.medium,
          {
            transform: [
              { scale: anim1 },
              {
                translateY: anim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -80],
                }),
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.smallBtn,
          btnColor,
          Shadows.medium,
          {
            transform: [
              { scale: anim2 },
              {
                translateX: anim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -60],
                }),
              },
              {
                translateY: anim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -60],
                }),
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.smallBtn,
          btnColor,
          Shadows.medium,
          {
            transform: [
              { scale: anim3 },
              {
                translateX: anim3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -80],
                }),
              },
            ],
          },
        ]}
      />

      {/* Main FAB */}
      <TouchableOpacity
        style={[
          styles.fab,
          { backgroundColor: "rgba(76, 175, 80, 0.95)" },
          Shadows.strong,
        ]}
        onPress={onMainPress ? onMainPress : toggleMenu}
        activeOpacity={0.8}
      >
        <ThemedText style={{ fontSize: 24, color: "#FFF" }}>≡</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Spacing.xl,
    right: Spacing.xl,
    alignItems: "center",
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  smallBtn: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});
