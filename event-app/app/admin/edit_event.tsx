import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Radii, Shadows, Spacing } from "../../constants/theme";
import * as ImagePicker from "expo-image-picker";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, getAccessToken, API_BASE_URL } from "../../utils/apiClient";

const BLACK = "#0A0A0A";
const SURFACE = "#141414";
const BORDER = "#222222";
const GREEN = "#1CB944";
const GREEN_DIM = "#4CAF50";
const GREEN_SOFT = "#1C2E20";
const GREEN_SOFT_BORDER = "#2E5C34";
const SUBTEXT = "#666666";
const TEXT = "#F5F5F5";

export default function EditEvent() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isEditing = !!id;
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");
  const [registrationUrl, setRegistrationUrl] = useState("");
  const [description, setDescription] = useState("");
  const [posterUri, setPosterUri] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);

  const { data: event, isLoading: isFetching } = useQuery({
    queryKey: ["event", id],
    queryFn: () => apiFetch(`/events/${id}`),
    enabled: isEditing,
  });

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setVenue(event.venue);
      setCategory(event.category || "");
      setRegistrationUrl(event.registrationUrl || "");
      setDescription(event.description || "");
      setPosterUri(event.posterUrl);
      setIsPublished(event.isPublished || false);
    }
  }, [event]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPosterUri(result.assets[0].uri);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date || new Date().toISOString());
      formData.append("venue", venue);
      formData.append("category", category || "General");
      formData.append("description", description);
      formData.append("isPublished", isPublished ? "true" : "false");
      if (registrationUrl) formData.append("registrationUrl", registrationUrl);

      if (posterUri && !posterUri.startsWith("http")) {
        const localUri = posterUri;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : `image`;
        formData.append("poster", { uri: localUri, name: filename, type } as any);
      }

      const token = await getAccessToken();
      const endpoint = isEditing ? `/events/${id}` : "/events";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type is automatically set for FormData
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save event");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myClub"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.back();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getAccessToken();
      const res = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete event");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myClub"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.back();
    },
    onError: (error: any) => {
      Alert.alert("Error", error.message || "Failed to delete event");
    }
  });

  const handleDelete = () => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => deleteMutation.mutate() 
        }
      ]
    );
  };

  if (isFetching) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.glowTop} pointerEvents="none" />

      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 20, paddingTop: 40 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 15 }}>
          <Ionicons name="chevron-back" size={24} color={TEXT} />
        </TouchableOpacity>
        <Text style={{ color: TEXT, fontSize: 20, fontWeight: "bold" }}>
          {isEditing ? "Edit Event" : "Create Event"}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Poster Picker */}
        <TouchableOpacity style={styles.posterPicker} onPress={pickImage}>
          {posterUri ? (
            <Image source={{ uri: posterUri }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          ) : (
             <View style={{ alignItems: "center" }}>
                <Ionicons name="image-outline" size={32} color={GREEN_DIM} />
                <Text style={{ color: GREEN_DIM, marginTop: 8 }}>Upload Poster</Text>
             </View>
          )}
        </TouchableOpacity>

        <View style={styles.greenBox}>
          <View style={styles.fieldSection}>
            <Text style={styles.greenLabel}>Event Title</Text>
            <TextInput style={styles.greenInput} placeholderTextColor="rgba(255,255,255,0.4)" value={title} onChangeText={setTitle} placeholder="E.g. Tech Conference 2026" />
          </View>
        </View>

        <View style={styles.darkBox}>
          <EditableRow icon="calendar" label="Date (ISO String)" value={date} onChangeText={setDate} />
          <EditableRow icon="map-marker" label="Venue" value={venue} onChangeText={setVenue} />
          <EditableRow icon="tag" label="Category" value={category} onChangeText={setCategory} />
          <EditableRow icon="link" label="Registration URL" value={registrationUrl} onChangeText={setRegistrationUrl} isLast />
        </View>

        <View style={styles.darkBox}>
          <View style={styles.editableRow}>
            <Text style={[styles.rowLabel, { fontSize: 14, color: TEXT, flex: 1, marginTop: 8 }]}>Publish Event (Visible to Students)</Text>
            <TouchableOpacity 
              style={{ width: 50, height: 28, borderRadius: 14, backgroundColor: isPublished ? GREEN : BORDER, justifyContent: "center", padding: 2 }}
              onPress={() => setIsPublished(!isPublished)}
              activeOpacity={0.8}
            >
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: "#fff", alignSelf: isPublished ? "flex-end" : "flex-start" }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.darkBox}>
          <Text style={styles.aboutTitle}>About the Event</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholderTextColor={SUBTEXT}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        {isEditing && (
          <TouchableOpacity 
            style={styles.deleteBtn} 
            activeOpacity={0.8} 
            onPress={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.deleteBtnText}>Delete Event</Text>
            )}
          </TouchableOpacity>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.saveBar}>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85} onPress={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.saveBtnText}>Save Event</Text>
              <View style={styles.arrowBadge}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function EditableRow({ icon, label, value, onChangeText, isLast }: { icon: string; label: string; value: string; onChangeText: (text: string) => void; isLast?: boolean; }) {
  return (
    <>
      <View style={styles.editableRow}>
        <FontAwesome name={icon as any} size={18} color={GREEN} style={styles.rowIcon} />
        <View style={styles.rowContent}>
          <Text style={styles.rowLabel}>{label}</Text>
          <TextInput style={styles.rowInput} placeholderTextColor={SUBTEXT} value={value} onChangeText={onChangeText} />
        </View>
      </View>
      {!isLast && <View style={styles.rowDivider} />}
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BLACK },
  glowTop: { position: "absolute", top: -120, left: "50%", marginLeft: -150, width: 300, height: 300, borderRadius: 150, backgroundColor: GREEN, opacity: 0.08 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg, gap: Spacing.md },
  posterPicker: { height: 160, backgroundColor: SURFACE, borderRadius: Radii.lg, borderWidth: 1, borderColor: BORDER, overflow: "hidden", justifyContent: "center", alignItems: "center" },
  greenBox: { backgroundColor: GREEN_SOFT, borderWidth: 1, borderColor: GREEN_SOFT_BORDER, borderRadius: Radii.lg, padding: Spacing.md },
  fieldSection: { marginVertical: 5 },
  greenLabel: { fontSize: 10, fontWeight: "700", color: GREEN_DIM, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 },
  greenInput: { fontSize: 16, fontWeight: "600", color: TEXT, borderBottomWidth: 1, borderBottomColor: GREEN_SOFT_BORDER, paddingBottom: 6 },
  darkBox: { backgroundColor: SURFACE, borderWidth: 1, borderColor: BORDER, borderRadius: Radii.lg, overflow: "hidden" },
  editableRow: { flexDirection: "row", alignItems: "flex-start", paddingHorizontal: Spacing.md, paddingVertical: 14 },
  rowIcon: { marginRight: 12, marginTop: 4 },
  rowContent: { flex: 1 },
  rowLabel: { fontSize: 10, fontWeight: "700", color: SUBTEXT, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 },
  rowInput: { fontSize: 15, fontWeight: "600", color: TEXT },
  rowDivider: { height: 1, backgroundColor: BORDER, marginHorizontal: Spacing.md },
  aboutTitle: { fontSize: 10, fontWeight: "700", color: SUBTEXT, letterSpacing: 2, textTransform: "uppercase", paddingHorizontal: Spacing.md, paddingTop: Spacing.md, marginBottom: 10 },
  descriptionInput: { fontSize: 14, lineHeight: 20, color: TEXT, borderWidth: 1, borderColor: BORDER, borderRadius: Radii.md, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, margin: Spacing.md, minHeight: 100, backgroundColor: BLACK },
  saveBar: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: BORDER, backgroundColor: BLACK },
  saveBtn: { height: 56, backgroundColor: GREEN, borderRadius: Radii.md, flexDirection: "row", alignItems: "center", justifyContent: "center", ...Shadows.medium, shadowColor: GREEN, shadowOpacity: 0.35 },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "800", letterSpacing: 0.5 },
  arrowBadge: { position: "absolute", right: Spacing.md, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  arrowText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  deleteBtn: {
    height: 52,
    backgroundColor: "rgba(229, 57, 53, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(229, 57, 53, 0.3)",
    borderRadius: Radii.md,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },
  deleteBtnText: {
    color: "#E53935",
    fontSize: 15,
    fontWeight: "700",
  },
});
