import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Colors, Radii, Shadows } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";

export default function AdminLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      {/* ── Shared Header ── */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerSide}
        >
          <FontAwesome name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerCenter} />

        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={[styles.circle, { backgroundColor: colors.softGreenTheme }]}
        />
      </View>

      {/* ── All admin screens render here ── */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* ── Dropdown Menu ── */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.menuCard,
            { backgroundColor: colors.background },
            Shadows.strong,
          ]}
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push("/admin/about_club" as any);
            }}
          >
            <FontAwesome
              name="info-circle"
              size={16}
              color={colors.text}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuText, { color: colors.text }]}>
              About Club
            </Text>
          </TouchableOpacity>

          <View
            style={[
              styles.menuDivider,
              { backgroundColor: colors.text + "18" },
            ]}
          />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push("/admin/edit_profile" as any);
            }}
          >
            <FontAwesome
              name="user-circle"
              size={16}
              color={colors.text}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuText, { color: colors.text }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerSide: {
    width: 36,
  },
  headerCenter: {
    flex: 1,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  menuCard: {
    position: "absolute",
    top: 110,
    right: 16,
    borderRadius: Radii.lg,
    minWidth: 170,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 10,
    opacity: 0.75,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "600",
  },
  menuDivider: {
    height: 1,
    marginHorizontal: 12,
  },
});
