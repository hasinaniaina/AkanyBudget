import { FieldsColors as COLORS, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Type pour les catégories de budget
interface BudgetCategory {
  id: string;
  name: string;
  spent: string;
  total: string;
  percentage: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const BUDGET_DATA: BudgetCategory[] = [
  {
    id: "1",
    name: "Alimentation",
    spent: "800 000",
    total: "1 000 000 Ar",
    percentage: 80,
    icon: "leaf",
    iconBg: "#0A5C36",
    iconColor: "#FFFFFF",
  },
  {
    id: "2",
    name: "Logement",
    spent: "600 000",
    total: "800 000 Ar",
    percentage: 75,
    icon: "home-outline",
    iconBg: "#2196F3",
    iconColor: "#FFFFFF",
  },
  {
    id: "3",
    name: "Transport",
    spent: "350 000",
    total: "500 000 Ar",
    percentage: 70,
    icon: "car-outline",
    iconBg: "#FFA726",
    iconColor: "#FFFFFF",
  },
  {
    id: "4",
    name: "Santé et famille",
    spent: "280 000",
    total: "400 000 Ar",
    percentage: 70,
    icon: "heart-outline",
    iconBg: "#9C27B0",
    iconColor: "#FFFFFF",
  },
  {
    id: "5",
    name: "Autres",
    spent: "150 000",
    total: "300 000 Ar",
    percentage: 50,
    icon: "radio-button-on-outline",
    iconBg: "#5C6BC0",
    iconColor: "#FFFFFF",
  },
];

export default function BudgetsScreen() {
  const [activeTab, setActiveTab] = useState<"categorie" | "activite">(
    "categorie",
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre principal */}
        <Text style={styles.headerTitle}>Budgets</Text>

        {/* Sélecteur de mois */}
        <TouchableOpacity style={styles.monthSelector}>
          <View style={styles.monthSelectorLeft}>
            <Ionicons name="filter-outline" size={16} color={COLORS.green} />
            <Text style={styles.monthText}>Décembre 2026</Text>
          </View>
          <Ionicons name="chevron-down" size={16} color={COLORS.green} />
        </TouchableOpacity>

        {/* Onglets (Par catégorie / Par activité) */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "categorie" && styles.activeTab]}
            onPress={() => setActiveTab("categorie")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "categorie" && styles.activeTabText,
              ]}
            >
              Par catégorie
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "activite" && styles.activeTab]}
            onPress={() => setActiveTab("activite")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "activite" && styles.activeTabText,
              ]}
            >
              Par activité
            </Text>
          </TouchableOpacity>
        </View>

        {/* Carte de résumé global du mois */}
        <View style={styles.mainSummaryCard}>
          <Text style={styles.summaryTitle}>Dépenses du mois</Text>
          <Text style={styles.summaryAmount}>2 180 000 Ar</Text>
          <Text style={styles.summarySubtitle}>sur 3 000 000 Ar</Text>

          {/* Barre de progression globale */}
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: "73%" }]} />
          </View>
          <Text style={styles.progressPercentage}>73%</Text>
        </View>

        {/* Section Catégories */}
        <Text style={styles.sectionTitle}>Catégories</Text>

        <View style={styles.categoriesList}>
          {BUDGET_DATA.map((item) => (
            <View key={item.id} style={styles.categoryCard}>
              <View
                style={[
                  styles.categoryIconContainer,
                  { backgroundColor: item.iconBg },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.iconColor}
                />
              </View>

              <View style={styles.categoryInfo}>
                <View style={styles.categoryHeaderRow}>
                  <Text style={styles.categoryName}>{item.name}</Text>
                  <Text style={styles.categoryPercentage}>
                    {item.percentage}%
                  </Text>
                </View>

                <Text style={styles.categoryDetails}>
                  {item.spent} / {item.total}
                </Text>

                {/* Barre de progression de la catégorie */}
                <View style={styles.catProgressBarBg}>
                  <View
                    style={[
                      styles.catProgressBarFill,
                      { width: `${item.percentage}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9F6",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0A5C36",
    marginBottom: 16,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4E8DE",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
    width: "60%",
  },
  monthSelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  monthText: {
    fontSize: FontSizes.medium,
    fontWeight: "600",
    color: COLORS.green,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#E6F2EC",
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: "#0A5C36",
    shadowColor: "#0A5C36",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: FontSizes.medium,
    fontWeight: "500",
    color: "#557A68",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  mainSummaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2ECE6",
    marginBottom: 24,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: FontSizes.medium,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
  },
  summaryAmount: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: "#0A5C36",
    marginBottom: 2,
  },
  summarySubtitle: {
    fontSize: FontSizes.small,
    color: "#719082",
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 16,
    backgroundColor: "#E6F2EC",
    borderRadius: 5,
    overflow: "hidden",
    width: "88%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.green,
    borderRadius: 5,
  },
  progressPercentage: {
    position: "absolute",
    bottom: 18,
    right: 20,
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A5C36",
    marginBottom: 14,
  },
  categoriesList: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2ECE6",
  },
  categoryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryName: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: COLORS.text,
  },
  categoryPercentage: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: COLORS.text,
  },
  categoryDetails: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
    marginBottom: 8,
  },
  catProgressBarBg: {
    height: 6,
    backgroundColor: "#E6F2EC",
    borderRadius: 3,
    overflow: "hidden",
  },
  catProgressBarFill: {
    height: "100%",
    backgroundColor: COLORS.green,
    borderRadius: 3,
  },
});
