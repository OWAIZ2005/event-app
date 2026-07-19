import { Radii, Shadows, Spacing } from "@/constants/theme";
import { useState, useEffect } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Image,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, getAccessToken, API_BASE_URL } from "../../utils/apiClient";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#222222";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const GREEN_SOFT = "#1C2E20";
const SUBTEXT = "#666666";
const TEXT = "#F5F5F5";

export default function AdminProfileScreen() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUri, setLogoUri] = useState<string | null>(null);

  const [nameFocused, setNameFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/users/me"),
  });

  const { data: club, isLoading: clubLoading } = useQuery({
    queryKey: ["myClub"],
    queryFn: () => apiFetch("/clubs/my"),
  });

  useEffect(() => {
    if (club) {
      setName(club.name);
      setDescription(club.description || "");
      setLogoUri(club.logoUrl);
    }
  }, [club]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setLogoUri(result.assets[0].uri);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!club?.id) throw new Error("Club not found");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);

      if (logoUri && !logoUri.startsWith("http")) {
        const filename = logoUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : `image`;
        formData.append("logo", { uri: logoUri, name: filename, type } as any);
      }

      const token = await getAccessToken();
      const res = await fetch(`${API_BASE_URL}/clubs/${club.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myClub"] });
      alert("Profile updated successfully!");
    },
    onError: (error: any) => {
      alert(error.message);
    }
  });

  if (userLoading || clubLoading) {
    return (
      <View style={[styles.safe, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={GREEN} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
        <ScrollView style={styles.flex} contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.glowTop} pointerEvents="none" />

          <View style={styles.content}>
            <Text style={styles.headingSmall}>Settings</Text>
            <Text style={styles.headingBig}>Club Profile</Text>

            <TouchableOpacity style={styles.logoPicker} onPress={pickImage} activeOpacity={0.8}>
              {logoUri ? (
                <Image source={{ uri: logoUri }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Ionicons name="camera-outline" size={32} color={GREEN_DIM} />
                  <Text style={{ color: GREEN_DIM, marginTop: 8, fontSize: 12 }}>Upload Logo</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>CLUB NAME</Text>
            <View style={[styles.inputWrap, { borderColor: nameFocused ? GREEN : BORDER }]}>
              <TextInput
                style={styles.input}
                placeholder="Enter club name"
                placeholderTextColor={SUBTEXT}
                value={name}
                onChangeText={setName}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                maxLength={50}
              />
            </View>

            <Text style={styles.label}>DESCRIPTION</Text>
            <View style={[styles.inputWrap, { borderColor: descFocused ? GREEN : BORDER, height: 100, alignItems: "flex-start", paddingTop: 12 }]}>
              <TextInput
                style={[styles.input, { height: "100%" }]}
                placeholder="Enter description"
                placeholderTextColor={SUBTEXT}
                value={description}
                onChangeText={setDescription}
                onFocus={() => setDescFocused(true)}
                onBlur={() => setDescFocused(false)}
                multiline
                textAlignVertical="top"
              />
            </View>

            <Text style={styles.label}>ADMIN EMAIL (Read-only)</Text>
            <View style={[styles.inputWrap, { backgroundColor: "#111" }]}>
              <Text style={[styles.input, { color: SUBTEXT, paddingTop: 16 }]}>{user?.email}</Text>
            </View>

            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85} onPress={() => saveMutation.mutate()}>
              {saveMutation.isPending ? (
                 <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.actionBtnText}>Save Changes</Text>
                  <View style={styles.arrowBadge}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
              <Text style={styles.secondaryText}>Change password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BLACK },
  flex: { flex: 1 },
  glowTop: { position: "absolute", top: -120, left: "50%", marginLeft: -150, width: 300, height: 300, borderRadius: 150, backgroundColor: GREEN, opacity: 0.08 },
  content: { flex: 1, justifyContent: "center", paddingHorizontal: Spacing.xl, paddingTop: 60 },
  headingSmall: { fontSize: 13, fontWeight: "500", color: GREEN_DIM, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 },
  headingBig: { fontSize: 42, fontWeight: "800", color: TEXT, letterSpacing: -1.5, lineHeight: 48, marginBottom: Spacing.xxl },
  logoPicker: { width: 100, height: 100, borderRadius: 50, backgroundColor: SURFACE, borderWidth: 1, borderColor: BORDER, alignSelf: "center", marginBottom: Spacing.xl, justifyContent: "center", alignItems: "center", overflow: "hidden" },
  label: { fontSize: 10, fontWeight: "700", color: SUBTEXT, letterSpacing: 2, marginBottom: 8 },
  inputWrap: { height: 54, backgroundColor: SURFACE, borderRadius: Radii.md, borderWidth: 1, paddingHorizontal: Spacing.md, justifyContent: "center", marginBottom: Spacing.lg },
  input: { fontSize: 15, fontWeight: "500", color: TEXT, height: "100%" },
  actionBtn: { height: 56, backgroundColor: GREEN, borderRadius: Radii.md, flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: Spacing.lg, ...Shadows.medium, shadowColor: GREEN, shadowOpacity: 0.35 },
  actionBtnText: { color: "#fff", fontSize: 16, fontWeight: "800", letterSpacing: 0.5 },
  arrowBadge: { position: "absolute", right: Spacing.md, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  arrowText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
