import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { RelativePathString, router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap;
  iconLibrary: "Ionicons" | "MaterialCommunityIcons";
  isHighlighted?: boolean;
  isDestructive?: boolean;
  redirect?: string;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    items: [
      {
        id: "profile",
        title: "Jean RAKOTO",
        subtitle: "Voir mon profil",
        icon: "person",
        iconLibrary: "Ionicons",
      },
    ],
  },
  {
    title: "GESTION FINANCIÈRE",
    items: [
      {
        id: "revenues",
        title: "Mes sources de revenus",
        icon: "briefcase",
        iconLibrary: "Ionicons",
        redirect: "/(plusMenu)/sourceRevenu",
      },
      {
        id: "reports",
        title: "Rapports",
        icon: "bar-chart",
        iconLibrary: "Ionicons",
        isHighlighted: true, // Fond vert clair comme sur l'image
      },
    ],
  },
  {
    title: "SAUVEGARDE ET DONNÉES",
    items: [
      {
        id: "backup",
        title: "Sauvegarde et restauration",
        icon: "cloud-upload",
        iconLibrary: "Ionicons",
      },
      {
        id: "export",
        title: "Exporter mes données",
        icon: "document-text",
        iconLibrary: "Ionicons",
      },
    ],
  },
  {
    title: "AIDE ET INFORMATIONS",
    items: [
      {
        id: "help",
        title: "Aide et assistance",
        icon: "help-circle",
        iconLibrary: "Ionicons",
      },
      {
        id: "about",
        title: "À propos d'AkanyBudget",
        icon: "information-circle",
        iconLibrary: "Ionicons",
      },
    ],
  },
  {
    items: [
      {
        id: "logout",
        title: "Se déconnecter",
        icon: "log-out",
        iconLibrary: "Ionicons",
        isDestructive: true,
      },
    ],
  },
];

export default function PlusScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre principal */}
        <Text style={styles.headerTitle}>Plus</Text>

        {MENU_SECTIONS.map((section, sIndex) => (
          <View key={sIndex} style={styles.sectionContainer}>
            {section.title && (
              <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
            )}

            <View style={styles.sectionCard}>
              {section.items.map((item, iIndex) => {
                const isLast = iIndex === section.items.length - 1;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      item.isHighlighted && styles.highlightedItem,
                      !isLast && styles.itemBorder,
                    ]}
                    activeOpacity={0.7}
                    onPress={() =>
                      router.push(item.redirect as RelativePathString)
                    }
                  >
                    {/* Icône avec fond arrondi */}
                    <View
                      style={[
                        styles.iconBox,
                        item.isDestructive && styles.destructiveIconBox,
                      ]}
                    >
                      {item.iconLibrary === "Ionicons" ? (
                        <Ionicons
                          name={item.icon as any}
                          size={18}
                          color={item.isDestructive ? "#E53E3E" : "#0A5C36"}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name={item.icon as any}
                          size={20}
                          color={item.isDestructive ? "#E53E3E" : "#0A5C36"}
                        />
                      )}
                    </View>

                    {/* Textes (Titre + sous-titre éventuel) */}
                    <View style={styles.menuTextContainer}>
                      <Text
                        style={[
                          styles.menuTitle,
                          item.isDestructive && styles.destructiveText,
                        ]}
                      >
                        {item.title}
                      </Text>
                      {item.subtitle && (
                        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>

                    {/* Flèche de navigation */}
                    {!item.isDestructive && (
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color="#A0AAB2"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: FieldsColors.green,
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeaderTitle: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#719082",
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2ECE7",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  highlightedItem: {
    backgroundColor: "#E8F5E9", // Vert très clair pour l'élément actif/sélectionné (ex: Rapports)
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  destructiveIconBox: {
    backgroundColor: "#FDE8E8",
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1E293B",
  },
  destructiveText: {
    color: "#E53E3E",
  },
  menuSubtitle: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
    marginTop: 2,
    fontWeight: "500",
  },
});
