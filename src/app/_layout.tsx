// app/_layout.tsx

import { initDatabase } from "@/database/database";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(console.error);
    initDatabase();
    // deleteDatabase();
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(plusMenu)" options={{ headerShown: false }} />
      </Stack>

      {/* Alert message */}
      <Toast />
    </>
  );
}
