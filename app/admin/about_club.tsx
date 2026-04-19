import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Radii, Shadows, Spacing } from "../../constants/theme";

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#222222";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const GREEN_SOFT = "#1C2E20";
const GREEN_SOFT_BORDER = "#2E5C34";
const SUBTEXT = "#666666";
const TEXT = "#F5F5F5";

export default function AboutClubScreen() {
  const { width } = useWindowDimensions();
  const bannerHeight = width * 0.55;

  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [clubName, setClubName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");

  const pickImage = async (
    setter: (uri: string) => void,
    aspect: [number, number],
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 0.85,
    });
    if (!result.canceled) setter(result.assets[0].uri);
  };

  const handleSave = () => {
    Alert.alert("Saved!", "Club info updated successfully.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.glowTop} pointerEvents="none" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Text style={styles.heading}>Club Banner</Text>
        <TouchableOpacity
          onPress={() => pickImage(setBannerImage, [16, 9])}
          style={[styles.bannerContainer, { height: bannerHeight }]}
        >
          {bannerImage ? (
            <Image
              source={{ uri: bannerImage }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderContent}>
              <Ionicons
                name="image-outline"
                size={36}
                color={TEXT}
                style={{ opacity: 0.3 }}
              />
              <Text style={styles.placeholderText}>Tap to upload banner</Text>
            </View>
          )}
          <View style={styles.editBadge}>
            <FontAwesome name="pencil" size={12} color={BLACK} />
          </View>
        </TouchableOpacity>

        {/* Logo + Name */}
        <View style={styles.logoRow}>
          <TouchableOpacity
            onPress={() => pickImage(setLogoImage, [1, 1])}
            style={styles.logoContainer}
          >
            {logoImage ? (
              <Image source={{ uri: logoImage }} style={styles.logoImage} />
            ) : (
              <Ionicons
                name="camera-outline"
                size={26}
                color={TEXT}
                style={{ opacity: 0.3 }}
              />
            )}
            <View style={styles.logoBadge}>
              <FontAwesome name="pencil" size={10} color={BLACK} />
            </View>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <TextInput
              value={clubName}
              onChangeText={setClubName}
              placeholder="Club Name"
              placeholderTextColor={SUBTEXT}
              style={[styles.inlineInput, styles.clubNameInput]}
            />
            <TextInput
              value={tagline}
              onChangeText={setTagline}
              placeholder="Short tagline…"
              placeholderTextColor={SUBTEXT}
              style={[styles.inlineInput, styles.taglineInput]}
            />
          </View>
        </View>

        {/* About */}
        <Text style={styles.heading}>About</Text>
        <View style={styles.darkCard}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Write a description about the club…"
            placeholderTextColor={SUBTEXT}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={styles.textArea}
          />
          <Text style={styles.charCount}>{description.length} / 500</Text>
        </View>

        {/* Contact */}
        <Text style={styles.heading}>Contact & Links</Text>
        <View style={styles.darkCard}>
          <FieldRow
            icon="envelope-o"
            placeholder="Contact email"
            value={contactEmail}
            onChangeText={setContactEmail}
            keyboardType="email-address"
          />
          <Divider />
          <FieldRow
            icon="instagram"
            placeholder="Instagram handle (@...)"
            value={instagram}
            onChangeText={setInstagram}
          />
          <Divider />
          <FieldRow
            icon="globe"
            placeholder="Website URL"
            value={website}
            onChangeText={setWebsite}
            keyboardType="url"
          />
        </View>

        {/* Save */}
        <TouchableOpacity
          onPress={handleSave}
          style={styles.saveBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>Save Changes</Text>
          <View style={styles.arrowBadge}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FieldRow({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: any) {
  return (
    <View style={styles.fieldRow}>
      <FontAwesome
        name={icon}
        size={16}
        color={SUBTEXT}
        style={{ width: 22 }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={SUBTEXT}
        keyboardType={keyboardType}
        autoCapitalize="none"
        style={styles.fieldInput}
      />
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BLACK },
  glowTop: {
    position: "absolute",
    top: -120,
    left: "50%",
    marginLeft: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: GREEN,
    opacity: 0.07,
    zIndex: 0,
  },
  heading: {
    fontSize: 13,
    fontWeight: "700",
    color: GREEN_DIM,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginLeft: Spacing.md,
    marginTop: Spacing.xl,
    marginBottom: 10,
  },
  bannerContainer: {
    marginHorizontal: Spacing.md,
    borderRadius: Radii.lg,
    overflow: "hidden",
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: { width: "100%", height: "100%" },
  placeholderContent: { alignItems: "center", gap: 8 },
  placeholderText: { fontSize: 13, color: SUBTEXT },
  editBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    gap: 14,
  },
  logoContainer: {
    width: 76,
    height: 76,
    borderRadius: Radii.lg,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  logoImage: { width: "100%", height: "100%", borderRadius: Radii.lg },
  logoBadge: {
    position: "absolute",
    bottom: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  inlineInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: GREEN_SOFT_BORDER,
    paddingVertical: 6,
    marginBottom: 4,
    color: TEXT,
  },
  clubNameInput: { fontSize: 18, fontWeight: "600" },
  taglineInput: { fontSize: 13, opacity: 0.75 },
  darkCard: {
    marginHorizontal: Spacing.md,
    borderRadius: Radii.lg,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    padding: Spacing.md,
  },
  textArea: { fontSize: 14, lineHeight: 22, minHeight: 130, color: TEXT },
  charCount: {
    alignSelf: "flex-end",
    fontSize: 11,
    color: SUBTEXT,
    marginTop: 6,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },
  fieldInput: { flex: 1, fontSize: 14, color: TEXT },
  divider: { height: 1, backgroundColor: BORDER, marginLeft: 32 },
  saveBtn: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.xl,
    height: 56,
    backgroundColor: GREEN,
    borderRadius: Radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.medium,
    shadowColor: GREEN,
    shadowOpacity: 0.35,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  arrowBadge: {
    position: "absolute",
    right: Spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
