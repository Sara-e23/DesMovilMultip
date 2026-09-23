import { CardItem } from '@/types/CardItem';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../components/ui/card';

interface APIProduct{
  id: number;
  title: string;
  image: string;
  description: string;
}

const adaptProductToCardItem = (p: APIProduct): CardItem => ({
  id: String(p.id),
  title: p.title,
  image: p.image,
  description: p.description
});

const API_URL = 'https://fakestoreapi.com/products?limit=10';

export default function HomeScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCards = useCallback(async () => {
    try{
      setError(null);
      const response = await fetch(API_URL);
      if(!response.ok) throw new Error('Error HTTP: ${response.status}');
      const data: APIProduct[] = await response.json();
      setCards(data.map(adaptProductToCardItem));
    }catch (err){
      setError (err instanceof Error ? err.message : 'Error desconocido')
    }finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCards();
  };

  if (loading){
    return(
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.message}> Cargando Targetas...</Text>
      </View>
    )
  }

  if (error){
    return(
      <View style={styles.centered}>
        <Text style={styles.errorText}></Text>
        <Pressable onPress ={fetchCards} style={styles.retryButton}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>  
      </View>
    )
  }

  return (
    <FlatList
      data={cards}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}{
        ...<Text style={styles.message}>No hay targetas disponibles</Text>
      }
      renderItem={({ item }: { item: CardItem }) => (
        <Card
          title={item.title}
          image={item.image}
          description={item.description}
          onPress={() =>
            router.push({
              pathname: '/details',
              params: { item: JSON.stringify(item) },
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText:{
    color: 'red',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 12,
  },
  message: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
})

/* const MOCK_DATA: CardItem[] = [
  {
    id: '1',
    title: 'Michael Kaiser',
    image:
      'https://tse1.mm.bing.net/th/id/OIP.D8Tj_nIUs8I-9g_DxK9n5AHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'KAISER IS THE BEST',
  },
  {
    id: '2',
    title: 'Rin Itoshi',
    image:
      'https://tse2.mm.bing.net/th/id/OIP.EyoBpzZyBS9iJ1TJBvksWAHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'I only love Sae Itoshi',
  },
  {
    id: '3',
    title: 'Sae Itoshi',
    image:
      'https://th.bing.com/th/id/OIP.u97izCa4fxmLAHfoPc67hQHaEK?w=311&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
    description: 'I only love KAISER',
  },
];
*/
