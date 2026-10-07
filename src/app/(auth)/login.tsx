import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { saveToken } from '../../utils/TokenStorage';
import { login } from '../../utils/auth';

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
            router.replace('/(app)/index-pausa');
        } catch {
            Alert.alert('Error', 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
            placeholder="Username"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                editable={!loading}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                editable={!loading}
            />
            <Pressable
                onPress={handleLogin}
                disabled={loading}
                style={[styles.button, loading && styles.buttonDisabled]}
            >
                {loading ? (
                    <ActivityIndicator color="fff"/>
                ) : (
                <Text style={styles.buttonText}>Entrar</Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20 
    },
    title: { 
        fontSize: 24, 
        marginBottom: 20 
    },
    input: { 
        width: '100%', 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 10, 
        paddingHorizontal: 10 
    },
    button: { 
        backgroundColor: '#333', 
        paddingVertical: 15, 
        borderRadius: 8,
        alignItems: 'center', 
    },
    buttonDisabled: { 
        opacity: 0.5,
        backgroundColor: 'lightgray' 
    },
    buttonText: { 
        color: 'white', 
        fontWeight: '600',
        fontSize: 16
    }
});