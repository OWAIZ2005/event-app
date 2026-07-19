import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing, Radii, Shadows } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { apiFetch, clearTokens, getAccessToken, API_BASE_URL } from "@/utils/apiClient";

export default function StudentProfileScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const queryClient = useQueryClient();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => apiFetch("/users/me"),
  });

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setDepartment(user.department || "");
      setYearOfStudy(user.yearOfStudy ? String(user.yearOfStudy) : "");
    }
  }, [user]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const parsedYear = yearOfStudy ? parseInt(yearOfStudy, 10) : undefined;
      
      const token = await getAccessToken();
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          department: department || null,
          yearOfStudy: parsedYear || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      Alert.alert("Success", "Profile updated successfully!");
    },
    onError: (err: any) => {
      Alert.alert("Error", err.message || "Failed to update profile");
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async (imageUri: string) => {
      const formData = new FormData();
      const filename = imageUri.split('/').pop() || 'avatar.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('profilePicture', { uri: imageUri, name: filename, type } as any);
      
      const token = await getAccessToken();
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      Alert.alert("Success", "Profile picture updated!");
    },
    onError: (err: any) => {
      Alert.alert("Error", err.message || "Failed to update profile picture");
    }
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      uploadMutation.mutate(result.assets[0].uri);
    }
  };

  const handleSettings = () => {
    router.push("/settings" as any);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (error || !user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Failed to load profile.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView style={styles.flex} contentContainerStyle={{ paddingHorizontal: Spacing.xl, paddingVertical: Spacing.xxl }} keyboardShouldPersistTaps="handled">
        <View style={styles.glowTop} pointerEvents="none" />

        {/* Avatar Circle */}
        <View style={{ alignItems: "center", marginBottom: Spacing.xl }}>
          <TouchableOpacity 
            style={[
              styles.avatarCircle,
              {
                backgroundColor: colors.surface,
                borderColor: colors.primary,
                overflow: 'hidden'
              },
            ]}
            onPress={pickImage}
            disabled={uploadMutation.isPending}
          >
            {user.profilePictureUrl ? (
              <Image source={{ uri: user.profilePictureUrl }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 32 }}>+</Text>
              </View>
            )}
          </TouchableOpacity>
          {uploadMutation.isPending && <Text style={{ color: colors.text, marginTop: Spacing.sm }}>Uploading...</Text>}
        </View>

        {/* Full Name */}
        <Text style={styles.label}>FULL NAME</Text>
        <View
          style={[
            styles.infoField,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <TextInput
            style={[styles.infoText, { color: colors.text, height: '100%' }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
            placeholderTextColor={SUBTEXT}
          />
        </View>

        {/* Email Field (Read-only) */}
        <Text style={styles.label}>EMAIL ADDRESS (Read-only)</Text>
        <View
          style={[
            styles.infoField,
            {
              backgroundColor: colors.surface + "80",
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.infoText, { color: colors.text, opacity: 0.6 }]}>{user.email}</Text>
        </View>

        {/* Department Field */}
        <Text style={styles.label}>DEPARTMENT</Text>
        <View
          style={[
            styles.infoField,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <TextInput
            style={[styles.infoText, { color: colors.text, height: '100%' }]}
            value={department}
            onChangeText={setDepartment}
            placeholder="Enter department name"
            placeholderTextColor={SUBTEXT}
          />
        </View>

        {/* Year of Study Field */}
        <Text style={styles.label}>YEAR OF STUDY</Text>
        <View
          style={[
            styles.infoField,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <TextInput
            style={[styles.infoText, { color: colors.text, height: '100%' }]}
            value={yearOfStudy}
            onChangeText={setYearOfStudy}
            placeholder="Enter year of study (1-5)"
            placeholderTextColor={SUBTEXT}
            keyboardType="numeric"
            maxLength={1}
          />
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity
          style={[
            styles.changePasswordButton,
            Shadows.medium,
          ]}
          onPress={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          activeOpacity={0.8}
        >
          {saveMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.changePasswordText, { color: "#fff" }]}>Save Changes</Text>
          )}
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          style={[
            styles.changePasswordButton,
            { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
            Shadows.medium,
          ]}
          onPress={handleSettings}
          activeOpacity={0.8}
        >
          <Text style={[styles.changePasswordText, { color: colors.text }]}>Settings & Security</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BLACK,
  },
  flex: {
    flex: 1,
  },
  glowTop: {
    position: "absolute",
    top: -120,
    left: "50%",
    marginLeft: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: GREEN,
    opacity: 0.08,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  headingBlock: {
    marginBottom: Spacing.xl,
  },
  headingSmall: {
    fontSize: 13,
    fontWeight: "500",
    color: GREEN_DIM,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  headingBig: {
    fontSize: 48,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: 0,
    lineHeight: 52,
  },
  avatarWrap: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  avatarCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: GREEN_SOFT,
    borderWidth: 1,
    borderColor: "#2E5C34",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: GREEN_DIM,
    fontSize: 42,
    fontWeight: "800",
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: SUBTEXT,
    letterSpacing: 2,
    marginBottom: 8,
  },
  infoField: {
    width: "100%",
    height: 54,
    backgroundColor: SURFACE,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  infoText: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "500",
  },
  changePasswordButton: {
    height: 56,
    backgroundColor: GREEN,
    borderRadius: Radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
    shadowColor: GREEN,
    shadowOpacity: 0.35,
  },
  changePasswordText: {
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
  arrowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  dividerText: {
    fontSize: 13,
    color: SUBTEXT,
  },
  statusPill: {
    height: 52,
    backgroundColor: GREEN_SOFT,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: "#2E5C34",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "600",
    color: GREEN_DIM,
  },
});
