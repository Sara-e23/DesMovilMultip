import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getToken } from '../utils/TokenStorage';

export default function Index() {
  const [checking, setChecking] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
      setChecking(false);
    }) ();
  }, []);
  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return isLoggedIn 
  ? <Redirect href="/(app)/details" /> 
  : <Redirect href="/(auth)/login" />;
}