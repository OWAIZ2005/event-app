import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
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
import { Colors, Radii, Shadows } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";

export default function AboutClubScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
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
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header handled by _layout.tsx */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Text style={[styles.heading, { color: colors.text }]}>
          Club Banner
        </Text>
        <TouchableOpacity
          onPress={() => pickImage(setBannerImage, [16, 9])}
          style={[
            styles.bannerContainer,
            { height: bannerHeight, backgroundColor: colors.cardGreenBg },
            Shadows.light,
          ]}
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
                color={colors.text}
                style={{ opacity: 0.4 }}
              />
              <Text style={[styles.placeholderText, { color: colors.text }]}>
                Tap to upload banner
              </Text>
            </View>
          )}
          <View
            style={[
              styles.editBadge,
              { backgroundColor: colors.softGreenTheme },
            ]}
          >
            <FontAwesome name="pencil" size={12} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Logo + Name */}
        <View style={styles.logoRow}>
          <TouchableOpacity
            onPress={() => pickImage(setLogoImage, [1, 1])}
            style={[
              styles.logoContainer,
              { backgroundColor: colors.cardGreenBg },
              Shadows.light,
            ]}
          >
            {logoImage ? (
              <Image source={{ uri: logoImage }} style={styles.logoImage} />
            ) : (
              <Ionicons
                name="camera-outline"
                size={26}
                color={colors.text}
                style={{ opacity: 0.4 }}
              />
            )}
            <View
              style={[
                styles.logoBadge,
                { backgroundColor: colors.softGreenTheme },
              ]}
            >
              <FontAwesome name="pencil" size={10} color="#000" />
            </View>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <TextInput
              value={clubName}
              onChangeText={setClubName}
              placeholder="Club Name"
              placeholderTextColor={colors.text + "55"}
              style={[
                styles.inlineInput,
                styles.clubNameInput,
                {
                  color: colors.text,
                  borderBottomColor: colors.softGreenTheme,
                },
              ]}
            />
            <TextInput
              value={tagline}
              onChangeText={setTagline}
              placeholder="Short tagline…"
              placeholderTextColor={colors.text + "55"}
              style={[
                styles.inlineInput,
                styles.taglineInput,
                {
                  color: colors.text,
                  borderBottomColor: colors.softGreenTheme + "66",
                },
              ]}
            />
          </View>
        </View>

        {/* About */}
        <Text style={[styles.heading, { color: colors.text }]}>About</Text>
        <View
          style={[
            styles.textAreaCard,
            { backgroundColor: colors.cardGreenBg },
            Shadows.light,
          ]}
        >
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Write a description about the club…"
            placeholderTextColor={colors.text + "55"}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={[styles.textArea, { color: colors.text }]}
          />
          <Text style={[styles.charCount, { color: colors.text + "55" }]}>
            {description.length} / 500
          </Text>
        </View>

        {/* Contact */}
        <Text style={[styles.heading, { color: colors.text }]}>
          Contact & Links
        </Text>
        <View
          style={[
            styles.fieldCard,
            { backgroundColor: colors.cardGreenBg },
            Shadows.light,
          ]}
        >
          <FieldRow
            icon="envelope-o"
            placeholder="Contact email"
            value={contactEmail}
            onChangeText={setContactEmail}
            colors={colors}
            keyboardType="email-address"
          />
          <Divider color={colors.text} />
          <FieldRow
            icon="instagram"
            placeholder="Instagram handle (@...)"
            value={instagram}
            onChangeText={setInstagram}
            colors={colors}
          />
          <Divider color={colors.text} />
          <FieldRow
            icon="globe"
            placeholder="Website URL"
            value={website}
            onChangeText={setWebsite}
            colors={colors}
            keyboardType="url"
          />
        </View>

        {/* Save */}
        <TouchableOpacity
          onPress={handleSave}
          style={[
            styles.saveBtn,
            { backgroundColor: colors.softGreenTheme },
            Shadows.strong,
          ]}
        >
          <Text style={styles.saveBtnText}>Save Changes</Text>
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
  colors,
  keyboardType = "default",
}: any) {
  return (
    <View style={styles.fieldRow}>
      <FontAwesome
        name={icon}
        size={16}
        color={colors.text}
        style={{ opacity: 0.5, width: 22 }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text + "55"}
        keyboardType={keyboardType}
        autoCapitalize="none"
        style={[styles.fieldInput, { color: colors.text }]}
      />
    </View>
  );
}

function Divider({ color }: { color: string }) {
  return <View style={[styles.divider, { backgroundColor: color + "18" }]} />;
}

const styles = StyleSheet.create({
  heading: { fontSize: 22, marginLeft: 16, marginTop: 20, marginBottom: 12 },
  bannerContainer: {
    marginHorizontal: 16,
    borderRadius: Radii.lg,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: { width: "100%", height: "100%" },
  placeholderContent: { alignItems: "center", gap: 8 },
  placeholderText: { fontSize: 13, opacity: 0.45 },
  editBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 20,
    gap: 14,
  },
  logoContainer: {
    width: 76,
    height: 76,
    borderRadius: Radii.lg,
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
    alignItems: "center",
    justifyContent: "center",
  },
  inlineInput: { borderBottomWidth: 1.5, paddingVertical: 6, marginBottom: 4 },
  clubNameInput: { fontSize: 18, fontWeight: "600" },
  taglineInput: { fontSize: 13, opacity: 0.75 },
  textAreaCard: { marginHorizontal: 16, borderRadius: Radii.lg, padding: 14 },
  textArea: { fontSize: 14, lineHeight: 22, minHeight: 130 },
  charCount: { alignSelf: "flex-end", fontSize: 11, marginTop: 6 },
  fieldCard: {
    marginHorizontal: 16,
    borderRadius: Radii.lg,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },
  fieldInput: { flex: 1, fontSize: 14 },
  divider: { height: 1, marginLeft: 32 },
  saveBtn: {
    marginHorizontal: 16,
    marginTop: 28,
    borderRadius: Radii.lg,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    letterSpacing: 0.3,
  },
});
