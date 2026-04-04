import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();
  const router = useRouter();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const handleLogin = () => {
    // Navigate to home after login
    router.replace("/(tabs)");
  };

  const handleSignUp = () => {
    // Navigate to home tabs for now
    router.push("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          {/* LOGIN Title */}
          <ThemedText type="title" style={styles.loginTitle}>
            LOGIN
          </ThemedText>

          {/* Username Input */}
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.lightGreenBg,
                color: colors.text,
              },
            ]}
            placeholder="Username:"
            placeholderTextColor="#000000"
            value={username}
            onChangeText={setUsername}
            editable
            maxLength={50}
          />

          {/* Password Input */}
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.lightGreenBg,
                color: colors.text,
              },
            ]}
            placeholder="Password:"
            placeholderTextColor="#000000"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            maxLength={100}
          />

          {/* LOGIN Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: colors.successGreen },
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <TouchableOpacity
            style={[
              styles.signUpButton,
              { backgroundColor: colors.lightGreenBg },
            ]}
            onPress={handleSignUp}
          >
            <ThemedText style={styles.signUpText}>Sign Up</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    width: "100%",
  },
  loginTitle: {
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 50,
    fontStyle: "normal",
    textAlign: "center",
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    height: 55,
    borderRadius: 10,
    paddingHorizontal: 18,
    marginBottom: 25,
    fontSize: 17,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  loginButton: {
    width: "55%",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "900",
    fontStyle: "normal",
    letterSpacing: 0.5,
  },
  signUpButton: {
    width: "55%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1CB944",
  },
  signUpText: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    color: "#000000",
  },
});
