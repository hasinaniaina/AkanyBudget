import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface RevenueSource {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const REVENUE_SOURCES: RevenueSource[] = [
  {
    id: "1",
    title: "Salaire",
    subtitle: "Revenu professionnel",
    icon: "briefcase",
  },
  {
    id: "2",
    title: "BSF",
    subtitle: "Activité commerciale",
    icon: "storefront",
  },
  {
    id: "3",
    title: "Commerce",
    subtitle: "Ventes et activités",
    icon: "cart",
  },
  {
    id: "4",
    title: "Location",
    subtitle: "Revenus locatifs",
    icon: "home",
  },
  {
    id: "5",
    title: "Autres revenus",
    subtitle: "Autres entrées d'argent",
    icon: "add-circle",
  },
];

export default function SourceRevenu() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* 1. EN-TÊTE */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color={FieldsColors.green} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes sources de revenus</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. CARTE BANNIÈRE SUPÉRIEURE */}
        <View style={styles.bannerCard}>
          <Text style={styles.bannerTitle}>5 sources de revenus</Text>
          <Text style={styles.bannerSubtitle}>
            Gérez vos différentes sources de revenus.
          </Text>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.85}
            onPress={() => router.push("/(plusMenu)/(sourceRevenu)/add")}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Ajouter une source</Text>
          </TouchableOpacity>
        </View>

        {/* 3. LISTE DES SOURCES DE REVENUS */}
        <View style={styles.listContainer}>
          {REVENUE_SOURCES.map((source) => (
            <TouchableOpacity
              key={source.id}
              style={styles.sourceCard}
              activeOpacity={0.75}
            >
              {/* Conteneur carré arrondi pour l'icône */}
              <View style={styles.iconContainer}>
                <Ionicons name={source.icon} size={24} color="#0A7B3E" />
              </View>

              {/* Textes (Titre et sous-titre) */}
              <View style={styles.textContainer}>
                <Text style={styles.sourceTitle}>{source.title}</Text>
                <Text style={styles.sourceSubtitle}>{source.subtitle}</Text>
              </View>

              {/* Menu trois points verticaux */}
              <TouchableOpacity
                style={styles.moreButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="ellipsis-vertical" size={18} color="#719082" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FAF8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#F7FAF8",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: "700",
    color: FieldsColors.green,
  },
  headerPlaceholder: {
    width: 30,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 32,
  },
  /* Bannière */
  bannerCard: {
    backgroundColor: "#E8F5EE",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: FontSizes.medium,
    fontWeight: "bold",
    color: "#1A332B",
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: FontSizes.small,
    color: "#557065",
    marginBottom: 16,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#0A7B3E",
    borderRadius: 12,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    shadowColor: "#0A7B3E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 3,
  },
  addButtonText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  /* Liste des cartes */
  listContainer: {
    gap: 12,
  },
  sourceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    shadowColor: "#1A332B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#E6F4EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  sourceTitle: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#1A332B",
    marginBottom: 2,
  },
  sourceSubtitle: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
    fontWeight: "500",
  },
  moreButton: {
    padding: 4,
  },
});
