import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Login */}
        <Stack.Screen name="login" />

        {/* Signup */}
        <Stack.Screen name="signup" />

        {/* Student Profile — swipe back to dashboard */}
        <Stack.Screen
          name="student_profile"
          options={{ gestureEnabled: true }}
        />

        {/* Admin screens (nested under app/admin/) */}
        <Stack.Screen name="admin" />

        {/* Main tabs (dashboard, explore, my-events) */}
        <Stack.Screen name="(tabs)" />

        {/* Modal */}
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", headerShown: true, title: "Modal" }}
        />

        <Stack.Screen name="event_info" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}