import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to main app if already authenticated
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}