import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Text,
    TextInput,
    View
} from 'react-native';
import { login, saveToken } from '../../utils/TokenStorage';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Por favor, ingrese usuario y contraseña');
            return;
        }
        try {
            setLoading(true);
            const token = await login(username, password);
            await saveToken(token);
            router.replace('/(app)');
        } catch {
            Alert.alert('Error', 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
        </View>
    );
}

