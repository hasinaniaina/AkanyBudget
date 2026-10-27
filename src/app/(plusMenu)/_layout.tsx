// app/_layout.tsx

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="compte" options={{ headerShown: false }} />
      <Stack.Screen name="activite" options={{ headerShown: false }} />
      <Stack.Screen name="profil" options={{ headerShown: false }} />
      <Stack.Screen name="parametre" options={{ headerShown: false }} />
      <Stack.Screen name="rapport" options={{ headerShown: false }} />
    </Stack>
  );
}
