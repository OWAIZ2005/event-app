import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Colors, Radii, Shadows } from "../constants/theme";
import { useColorScheme } from "../hooks/use-color-scheme";

export default function AdminDashboard() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const { width } = useWindowDimensions();

  const smallCardSize = width * 0.32; // FIXED size
  const largeCardHeight = width * 0.5;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Right Circle */}
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={[
              styles.topCircle,
              { backgroundColor: colors.softGreenTheme },
            ]}
          />
        </View>

        {/* Past Events */}
        <Text style={[styles.heading, { color: colors.text }]}>
          Past Events
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push("/edit-event")}
            >
              <View
                style={[
                  styles.smallCard,
                  {
                    width: smallCardSize,
                    height: smallCardSize,
                    backgroundColor: colors.cardGreenBg,
                  },
                  Shadows.light,
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* My Events */}
        <Text style={[styles.heading, { color: colors.text }]}>My Events</Text>

        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={index} style={styles.block}>
              <TouchableOpacity onPress={() => router.push("/edit-event")}>
                <View
                  style={[
                    styles.largeCard,
                    {
                      height: largeCardHeight,
                      backgroundColor: colors.cardGreenBg,
                    },
                    Shadows.light,
                  ]}
                >
                  <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {index === 0 && <Text style={styles.swipe}>Swipe to delete</Text>}
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom + Button */}
      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="plus" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  topContainer: {
    alignItems: "flex-end",
    paddingRight: 16,
    paddingTop: 16,
  },

  topCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  heading: {
    fontSize: 22,
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 12,
  },

  row: {
    paddingLeft: 16,
  },

  smallCard: {
    borderRadius: Radii.lg,
    marginRight: 12,
  },

  block: {
    marginHorizontal: 16,
    marginBottom: 18,
  },

  largeCard: {
    width: "100%",
    borderRadius: Radii.lg,
    justifyContent: "flex-end",
    padding: 10,
  },

  editBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#7A7A7A",
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  editText: {
    color: "#fff",
    fontSize: 13,
  },

  swipe: {
    alignSelf: "flex-end",
    fontSize: 11,
    marginTop: 5,
    color: "#000",
  },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.strong,
  },
});
