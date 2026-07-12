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
import { Radii, Shadows } from "../../constants/theme";

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#222222";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const GREEN_SOFT = "#1C2E20";
const GREEN_SOFT_BORDER = "#2E5C34";
const TEXT = "#F5F5F5";
const SUBTEXT = "#666666";

export default function AdminLayout() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSignOut = () => {
    setMenuVisible(false);
    router.replace("/login" as any);
  };

  return (
    <>
      {/* ── Shared Header ── */}
      <View style={styles.header}>
        <View style={styles.headerSide} />

        <View style={styles.headerCenter} />

        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.circle}
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

        <View style={[styles.menuCard, Shadows.strong]}>
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
              color={TEXT}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>About Club</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

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
              color={TEXT}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* Sign Out */}
          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <FontAwesome
              name="sign-out"
              size={16}
              color="#E05252"
              style={styles.menuIcon}
            />
            <Text style={styles.signOutText}>Sign Out</Text>
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
    backgroundColor: BLACK,
    borderBottomColor: BORDER,
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
    backgroundColor: GREEN_SOFT,
    borderWidth: 1,
    borderColor: GREEN_SOFT_BORDER,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuCard: {
    position: "absolute",
    top: 110,
    right: 16,
    borderRadius: Radii.lg,
    minWidth: 180,
    overflow: "hidden",
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 10,
    opacity: 0.85,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT,
  },
  menuDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginHorizontal: 12,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E05252",
  },
});
