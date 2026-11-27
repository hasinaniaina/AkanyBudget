import { FieldsColors as COLORS } from "@/constants/theme";
import { useModalStore } from "@/hooks/useModalStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.green, // Vert quand actif
        tabBarInactiveTintColor: COLORS.grey, // Gris-vert quand inactif
        tabBarStyle: isModalOpen
          ? { display: "none" }
          : {
              position: "absolute",
              backgroundColor: "rgba(255, 255, 255, 0.9)", // ou 'transparent'
              borderTopWidth: 0,
              elevation: 0, // Pour Android
            },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(dashboard)/compte"
        options={{
          headerShown: false,
          title: "Mes compte",
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="operation"
        options={{
          headerShown: false,
          title: "Opérations",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="repeat-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          headerShown: false,
          title: "Budgets",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(budget)/nouvelleCategorie"
        options={{
          headerShown: false,
          title: "Création d'une catégorie",
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="projet"
        options={{
          headerShown: false,
          title: "Épargne & projets",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plus"
        options={{
          headerShown: false,
          title: "Plus",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
