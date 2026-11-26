import { FieldsColors, FontSizes } from "@/constants/theme";
import { Budget } from "@/models/budget";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryBudget {
  id: string;
  name: string;
  amount: string;
  percentage: number;
  color: string;
  icon:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap;
  iconLibrary: "Ionicons" | "MaterialCommunityIcons";
}

const CATEGORIES_DATA: CategoryBudget[] = [
  {
    id: "1",
    name: "Alimentation",
    amount: "320 000 Ar",
    percentage: 80,
    color: "#138A63", // Vert émeraude
    icon: "restaurant",
    iconLibrary: "Ionicons",
  },
  {
    id: "2",
    name: "Logement",
    amount: "250 000 Ar",
    percentage: 63,
    color: "#F27D42", // Orange corail
    icon: "home",
    iconLibrary: "Ionicons",
  },
  {
    id: "3",
    name: "Transport",
    amount: "120 000 Ar",
    percentage: 60,
    color: "#F2B830", // Jaune moutarde
    icon: "bus",
    iconLibrary: "Ionicons",
  },
  {
    id: "4",
    name: "Santé",
    amount: "90 000 Ar",
    percentage: 45,
    color: "#9342F5", // Violet
    icon: "star",
    iconLibrary: "Ionicons",
  },
  {
    id: "5",
    name: "Autres",
    amount: "200 000 Ar",
    percentage: 50,
    color: "#738598", // Gris bleuté
    icon: "dots-horizontal",
    iconLibrary: "MaterialCommunityIcons",
  },
];

export default function Mois({ budgets }: { budgets: Budget[] }) {
  let userBudgets: Budget[] = [];
  let spentAmount = 0;
  let limtCountBudget = 10;
  let initCountBudget = 0;

  budgets.map((budget) => {
    if (initCountBudget <= limtCountBudget) {
      userBudgets.push(budget);
    }

    if (budget.limit_type == "exact") {
      spentAmount += Number(budget.monthly_amount);
    } else {
      spentAmount += Number(budget.unit_amount) * Number(budget.number);
    }
  });
  return (
    <>
      {/* 3. NAVIGATION DE DATE */}
      <View style={styles.dateSelector}>
        <TouchableOpacity style={styles.arrowButton} activeOpacity={0.6}>
          <Ionicons name="chevron-back" size={18} color="#2D3748" />
        </TouchableOpacity>
        <Text style={styles.dateText}>Novembre 2026</Text>
        <TouchableOpacity style={styles.arrowButton} activeOpacity={0.6}>
          <Ionicons name="chevron-forward" size={18} color="#2D3748" />
        </TouchableOpacity>
      </View>

      {/* 4. CARTE RÉSUMÉ : DÉPENSES DU MOIS */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Dépenses du mois</Text>
        <View style={styles.amountRow}>
          <Text style={styles.spentAmount}>{spentAmount} Ar</Text>
          <Text style={styles.totalBudget}> / 1 500 000 Ar</Text>
        </View>

        {/* Barre de progression */}
        <View style={styles.progressRow}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: "65%" }]} />
          </View>
          <Text style={styles.progressPercentage}>65%</Text>
        </View>
      </View>

      {/* 5. SECTION : PAR CATÉGORIE */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Par catégorie</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAllText}>Voir tout</Text>
        </TouchableOpacity>
      </View>

      {/* LISTE DES CATÉGORIES */}
      <View style={styles.categoriesList}>
        {userBudgets.map((budget) => (
          <TouchableOpacity
            key={budget.id}
            style={styles.categoryRow}
            activeOpacity={0.7}
          >
            {/* Icône ronde colorée */}
            <View
              style={[
                styles.categoryIconCircle,
                { backgroundColor: budget.icon_background_color },
              ]}
            >
              <Ionicons name={budget.icon as any} size={14} color="#FFFFFF" />
            </View>

            {/* Nom de la catégorie */}
            <Text style={styles.categoryName}>{budget.label}</Text>

            {/* Montant et pourcentage alignés à droite */}
            <View style={styles.categoryRight}>
              {budget.limit_type == "exact" ? (
                <Text style={styles.categoryAmount}>
                  {budget.monthly_amount}
                </Text>
              ) : (
                <Text style={styles.categoryAmount}>
                  {String(Number(budget.unit_amount) * Number(budget.number))}
                </Text>
              )}

              {/* <Text style={styles.categoryPercent}>{item.percentage}%</Text> */}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EDF2F7",
  },
  arrowButton: {
    padding: 4,
  },
  dateText: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#1E293B",
  },
  /* Summary Card */
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#EDF2F7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: FieldsColors.green,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 14,
  },
  spentAmount: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: "#117A53",
  },
  totalBudget: {
    fontSize: FontSizes.medium,
    fontWeight: "500",
    color: "#64748B",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#E8F3EE",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#138A63",
    borderRadius: 6,
  },
  progressPercentage: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#64748B",
  },
  /* Section Header */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1E293B",
  },
  seeAllText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#64748B",
  },
  /* Categories List */
  categoriesList: {
    gap: 14,
    marginBottom: 22,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#334155",
  },
  categoryRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  categoryAmount: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#475569",
  },
  categoryPercent: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1E293B",
    width: 34,
    textAlign: "right",
  },
});
