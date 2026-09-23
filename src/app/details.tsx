import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CardItem } from '../types/CardItem';

export default function DetailsScreen() {
    const { item: itemString } = useLocalSearchParams<{ item: string }>();
    const item: CardItem = JSON.parse(itemString);
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#6e65ee', alignItems: 'center', justifyContent: 'center', padding: 16 },
    image: { width: 200, height: 200, borderRadius: 100, marginBottom: 16 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    description: { fontSize: 16, color: '#fff', textAlign: 'center' },
});