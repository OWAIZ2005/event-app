import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors, Spacing, Radii, Shadows } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { clearTokens } from "@/utils/apiClient";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive",
        onPress: async () => {
          await clearTokens();
          router.replace("/login");
        }
      }
    ]);
  };

  const renderSettingItem = (title: string, onPress: () => void, isDestructive = false) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        { backgroundColor: colors.surface, borderBottomColor: colors.border }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.settingText, isDestructive && { color: "#E53935" }]}>
        {title}
      </Text>
      {!isDestructive && <Text style={[styles.chevron, { color: colors.border }]}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.primary }]}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, Shadows.small]}>
          {renderSettingItem("Change Password", () => { Alert.alert("Change Password", "Feature coming soon") })}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Legal & Support</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, Shadows.small]}>
          {renderSettingItem("Privacy Policy", () => { Alert.alert("Privacy", "Opening Privacy Policy...") })}
          {renderSettingItem("Terms & Conditions", () => { Alert.alert("Terms", "Opening Terms & Conditions...") })}
          {renderSettingItem("About App", () => { Alert.alert("About", "College Event App v1.0.0") })}
          {renderSettingItem("Contact Support", () => { Alert.alert("Support", "support@collegeapp.edu") })}
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, marginTop: Spacing.xl }, Shadows.small]}>
          {renderSettingItem("Logout", handleLogout, true)}
        </View>

        <Text style={[styles.versionText, { color: colors.text }]}>App Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 60,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
    opacity: 0.7,
  },
  card: {
    borderRadius: Radii.md,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 20,
    fontWeight: "300",
  },
  versionText: {
    textAlign: "center",
    marginTop: Spacing.xxl,
    opacity: 0.5,
    fontSize: 12,
  }
});
