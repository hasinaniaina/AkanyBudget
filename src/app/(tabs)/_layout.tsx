import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import AppTabs from "@/components/app-tabs";
import AddOperationModal from "@/components/tabs/operation/add";
import { useModalStore } from "@/store/useModalStore";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { isModalOpen, closeModal } = useModalStore();
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppTabs />
      <AddOperationModal visible={isModalOpen} onClose={closeModal} />
    </ThemeProvider>
  );
}
