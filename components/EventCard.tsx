import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EventCard = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <View style={styles.card}>
        {/* Event image placeholder */}
        <View style={styles.imageBox} />

        <View style={styles.details}>
          <Text style={styles.eventName}>EVENT NAME</Text>
          <Text style={styles.organizer}>Organizer</Text>
          <Text style={styles.date}>Date & Time</Text>
          <Text style={styles.venue}>Venue</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#CBF4D1",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  imageBox: {
    width: "100%",
    height: 140,
    backgroundColor: "#A8E6CF",
  },
  details: {
    padding: 14,
  },
  eventName: {
    fontSize: 20,
    fontFamily: "IrishGrover",
    color: "#222",
    marginBottom: 4,
  },
  organizer: {
    fontSize: 14,
    fontFamily: "IrishGrover",
    color: "#555",
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    fontFamily: "IrishGrover",
    color: "#666",
    marginBottom: 2,
  },
  venue: {
    fontSize: 13,
    fontFamily: "IrishGrover",
    color: "#666",
  },
});
