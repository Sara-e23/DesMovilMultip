import { Image, Pressable, StyleSheet, Text } from "react-native";

interface CardProps {
  title: string;
  image: string;
  description: string;
  onPress: () => void;
}

export function Card({ title, image, description, onPress }: CardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  title: {
    marginTop: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    marginTop: 6,
    paddingHorizontal: 30,
    color: "#555555",
    fontSize: 15,
    lineHeight: 21,
  },
});