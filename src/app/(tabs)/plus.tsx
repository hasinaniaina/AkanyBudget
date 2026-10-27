import { FieldsColors as COLORS, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { ExternalPathString, RelativePathString, useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuItem = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  redirect?: RelativePathString | ExternalPathString;
};

const menuItems: MenuItem[] = [
  {
    title: "Comptes",
    subtitle: "Gère tes comptes et soldes",
    icon: "wallet-outline",
    redirect: "../(plusMenu)/compte",
  },
  {
    title: "Rapports",
    subtitle: "Analyses et graphiques",
    icon: "stats-chart-outline",
    redirect: "../(plusMenu)/rapport",
  },
  {
    title: "Activités",
    subtitle: "Selon tes activités",
    icon: "people-outline",
    redirect: "../(plusMenu)/activite",
  },
  {
    title: "Profil",
    subtitle: "Infos et préférences",
    icon: "person-outline",
    redirect: "../(plusMenu)/profil",
  },
  {
    title: "Paramètres",
    subtitle: "Devise, notifications, sécurité",
    icon: "settings-outline",
    redirect: "../(plusMenu)/parametre",
  },
  {
    title: "Aide et support",
    subtitle: "FAQ et assistance",
    icon: "help-buoy-outline",
    redirect: "../(plusMenu)/aide",
  },
];

function MenuRow({ item }: { item: MenuItem }) {
  const router = useRouter();
  return (
    <Pressable
      style={({ pressed }) => [styles.menuRow, pressed && styles.pressedRow]}
      onPress={() => {
        if (item.redirect) {
          // Redirection vers la page correspondante
          router.push(item.redirect);
        }
      }}
    >
      <View style={styles.menuIconContainer}>
        <Ionicons name={item.icon} size={18} color="#164D4B" />
      </View>

      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={15} color="#167A9B" />
    </Pressable>
  );
}

export default function PlusScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre */}
        <Text style={styles.pageTitle}>Plus</Text>

        {/* Compte MonBudget */}
        <Pressable
          style={({ pressed }) => [
            styles.accountCard,
            pressed && styles.pressedRow,
          ]}
          onPress={() => {
            // TODO : ouvrir le compte personnel
          }}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={22} color="#FFFFFF" />
          </View>

          <View style={styles.accountTextContainer}>
            <Text style={styles.accountTitle}>AkanyBudget</Text>
            <Text style={styles.accountSubtitle}>Compte personnel</Text>
          </View>

          <Ionicons name="chevron-forward" size={15} color="#167A9B" />
        </Pressable>

        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.title}>
              <MenuRow item={item} />
              {index < menuItems.length - 1 && (
                <View style={styles.separator} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Bannière MonBudget */}
        <View style={styles.promoCard}>
          <View style={styles.leafContainer}>
            <Ionicons name="leaf" size={34} color="#0A9C6A" />
          </View>

          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>MonBudget</Text>
            <Text style={styles.promoDescription}>
              Simple aujourd'hui,
              {"\n"}plus de projets demain !
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20,
  },

  // En-tête
  pageTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#173C55",
    marginBottom: 13,
  },

  // Carte du compte
  accountCard: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 7,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#D9EDF0",
    marginBottom: 20,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#459F99",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  accountTextContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  accountTitle: {
    fontSize: FontSizes.small,
    fontWeight: "800",
    color: COLORS.darkGreen,
    marginBottom: 2,
  },
  accountSubtitle: {
    fontSize: FontSizes.xsmall,
    color: COLORS.secondary,
  },

  // Liste des menus
  menuContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  menuRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  pressedRow: {
    opacity: 0.7,
  },
  menuIconContainer: {
    width: 29,
    height: 29,
    borderRadius: 10,
    backgroundColor: "#F0F6F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  menuTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#24465A",
    marginBottom: 3,
  },
  menuSubtitle: {
    fontSize: FontSizes.xsmall,
    color: "#7A96A5",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F3F4",
    marginLeft: 43,
  },

  // Bannière inférieure
  promoCard: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 66,
    backgroundColor: "#E5F8F0",
    borderRadius: 11,
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  leafContainer: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  promoTextContainer: {
    flex: 1,
  },
  promoTitle: {
    fontSize: FontSizes.xsmall,
    fontWeight: "800",
    color: COLORS.darkGreen,
    marginBottom: 3,
  },
  promoDescription: {
    fontSize: FontSizes.xsmall,
    lineHeight: 13,
    color: COLORS.green,
  },
});
