import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { format } from "date-fns";

export interface EventProps {
  id: string;
  title: string;
  clubName: string;
  date: string;
  venue: string;
  posterUrl?: string;
}

const EventCard = ({ event, onPress }: { event: EventProps; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <View style={styles.card}>
        {event.posterUrl ? (
          <Image source={{ uri: event.posterUrl }} style={styles.imageBox} resizeMode="cover" />
        ) : (
          <View style={styles.imageBox} />
        )}

        <View style={styles.details}>
          <Text style={styles.eventName} numberOfLines={1}>{event.title}</Text>
          <Text style={styles.organizer} numberOfLines={1}>{event.clubName}</Text>
          <Text style={styles.date}>{format(new Date(event.date), "MMM d, yyyy • h:mm a")}</Text>
          <Text style={styles.venue} numberOfLines={1}>{event.venue}</Text>
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
