import { getToken } from '@/utils/TokenStorage'; //src\utils\TokenStorage.ts
import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await getToken();
            setIsLoggedIn(!!token);
            setChecking(false);
        })();
    }, []);

    if (checking) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isLoggedIn) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Tarjeta" }} />
            <Stack.Screen name="detail" options={{ title: "Detalle" }} />
        </Stack>
    );
}
