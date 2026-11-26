import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BudgetManagementItem {
  id: string;
  name: string;
  amount: string;
  color: string;
  icon:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap;
  iconLibrary: "Ionicons" | "MaterialCommunityIcons";
}

const BUDGETS_DATA: BudgetManagementItem[] = [
  {
    id: "1",
    name: "Alimentation",
    amount: "800 000 Ar / mois",
    color: "#F25C54", // Rouge corail
    icon: "restaurant",
    iconLibrary: "Ionicons",
  },
  {
    id: "2",
    name: "Logement",
    amount: "600 000 Ar / mois",
    color: "#F27D42", // Orange
    icon: "home",
    iconLibrary: "Ionicons",
  },
  {
    id: "3",
    name: "Transport",
    amount: "300 000 Ar / mois",
    color: "#F2B830", // Jaune
    icon: "bus",
    iconLibrary: "Ionicons",
  },
  {
    id: "4",
    name: "Loisirs",
    amount: "200 000 Ar / mois",
    color: "#9342F5", // Violet
    icon: "star",
    iconLibrary: "Ionicons",
  },
  {
    id: "5",
    name: "Santé",
    amount: "100 000 Ar / mois",
    color: "#738598", // Gris bleuté
    icon: "medical",
    iconLibrary: "Ionicons",
  },
];

export default function GestionBudget() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. EN-TÊTE : Retour, Titre et Bouton Ajouter (+) */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={FieldsColors.green}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gestion des budgets</Text>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/(budget)/nouvelleCategorie")}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* 2. CARTE D'INFORMATION */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Définis tes budgets par catégorie pour mieux contrôler tes dépenses.
          </Text>
        </View>

        {/* 3. LISTE DES BUDGETS PAR CATÉGORIE */}
        <View style={styles.listContainer}>
          {BUDGETS_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.budgetRow}
              activeOpacity={0.7}
            >
              {/* Icône ronde colorée */}
              <View
                style={[styles.iconCircle, { backgroundColor: item.color }]}
              >
                {item.iconLibrary === "Ionicons" ? (
                  <Ionicons name={item.icon as any} size={15} color="#FFFFFF" />
                ) : (
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={20}
                    color="#FFFFFF"
                  />
                )}
              </View>

              {/* Informations (Nom et Montant/Mois) */}
              <View style={styles.budgetInfo}>
                <Text style={styles.budgetName}>{item.name}</Text>
                <Text style={styles.budgetAmount}>{item.amount}</Text>
              </View>

              {/* Bouton "Voir détail >" */}
              <View style={styles.detailButtonRow}>
                <Text style={styles.detailButtonText}>Voir détail</Text>
                <Ionicons name="chevron-forward" size={14} color="#64748B" />
              </View>
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
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: FieldsColors.green,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#0A5C36", // Vert principal AkanyBudget
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0A5C36",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  /* Info Card */
  infoCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EDF2F7",
    alignItems: "center",
  },
  infoText: {
    fontSize: FontSizes.small,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "500",
  },
  /* List Container */
  listContainer: {
    gap: 8,
  },
  budgetRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  budgetInfo: {
    flex: 1,
  },
  budgetName: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 2,
  },
  budgetAmount: {
    fontSize: FontSizes.xsmall,
    color: "#64748B",
    fontWeight: "500",
  },
  detailButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  detailButtonText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#64748B",
  },
});
