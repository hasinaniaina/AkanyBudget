import MonthYearPicker from "@/components/ui/monthYearPicker";
import { DEFAULT_MONTHS_FR } from "@/constants/month";
import { FieldsColors, FontSizes } from "@/constants/theme";
import { Budget } from "@/models/budget";
import { getAllBudgetCurrentUser } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BudgetsScreen() {
  const now = new Date();
  const [userBudgets, setUserBudgets] = useState<Budget[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [isDateYearPickerOpen, setIsDateYearPickerOpen] =
    useState<boolean>(false);
  const currentPeriodConcerne =
    DEFAULT_MONTHS_FR[now.getMonth()] + " " + now.getFullYear();
  const [periodConcerne, setPeriodConcerne] = useState<string>(
    currentPeriodConcerne,
  );

  const prevPeriodConcern = () => {
    const periodConcernSplited = periodConcerne.split(" ");
    const monthConcern = periodConcernSplited[0];
    let yearConcern = Number(periodConcernSplited[1]);
    const indexMonth = DEFAULT_MONTHS_FR.indexOf(monthConcern);
    let newIndexMonthConcern = indexMonth - 1;
    let newMonthConcern = DEFAULT_MONTHS_FR[newIndexMonthConcern];

    if (newIndexMonthConcern < 0) {
      newIndexMonthConcern = 11;
      yearConcern -= 1;
      newMonthConcern = DEFAULT_MONTHS_FR[newIndexMonthConcern];
    }

    setPeriodConcerne(newMonthConcern + " " + yearConcern);
  };

  const nextPeriodConcern = () => {
    const periodConcernSplited = periodConcerne.split(" ");
    const monthConcern = periodConcernSplited[0];
    let yearConcern = Number(periodConcernSplited[1]);

    const indexMonth = DEFAULT_MONTHS_FR.indexOf(monthConcern);
    let newIndexMonthConcern = indexMonth + 1;
    let newMonthConcern = DEFAULT_MONTHS_FR[newIndexMonthConcern];

    if (newIndexMonthConcern > 11) {
      newIndexMonthConcern = 0;
      yearConcern += 1;
      newMonthConcern = DEFAULT_MONTHS_FR[newIndexMonthConcern];
    }

    setPeriodConcerne(newMonthConcern + " " + yearConcern);
  };

  useFocusEffect(
    useCallback(() => {
      const budgets = getAllBudgetCurrentUser();
      let userBudgets: Budget[] = [];
      let totalAmount = 0;
      let limtCountBudget = 10;
      let initCountBudget = 0;

      budgets.map((budget) => {
        if (initCountBudget <= limtCountBudget) {
          userBudgets.push(budget);
        }

        if (budget.limit_type == "exact") {
          totalAmount += Number(budget.monthly_amount);
        } else {
          totalAmount += Number(budget.unit_amount) * Number(budget.number);
        }
      });

      setUserBudgets(budgets);
      setTotalAmount(totalAmount);
    }, []),
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. EN-TÊTE */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budgets</Text>
      </View>
      {userBudgets.length > 0 ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 3. NAVIGATION DE DATE */}
          <View style={styles.dateSelector}>
            <TouchableOpacity style={styles.arrowButton} activeOpacity={0.6}>
              <Ionicons
                name="arrow-back-circle"
                size={18}
                color={FieldsColors.green}
                onPress={prevPeriodConcern}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsDateYearPickerOpen(!isDateYearPickerOpen);
              }}
            >
              <Text style={styles.dateText}>{periodConcerne}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.arrowButton}
              activeOpacity={0.6}
              onPress={nextPeriodConcern}
            >
              <Ionicons
                name="arrow-forward-circle"
                size={18}
                color={FieldsColors.green}
              />
            </TouchableOpacity>
          </View>
          <MonthYearPicker
            periodConcerne={periodConcerne}
            setPeriodConcerne={setPeriodConcerne}
            isOpen={isDateYearPickerOpen}
            setIsOpen={setIsDateYearPickerOpen}
            isBudgetListView={true}
          />

          {/* 4. CARTE RÉSUMÉ : DÉPENSES DU MOIS */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Dépenses du mois</Text>
            <View style={styles.amountRow}>
              <Text style={styles.spentAmount}>0 Ar</Text>
              <Text style={styles.totalBudget}> / {totalAmount} Ar</Text>
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
                  <Ionicons
                    name={budget.icon as any}
                    size={14}
                    color="#FFFFFF"
                  />
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
                      {String(
                        Number(budget.unit_amount) * Number(budget.number),
                      )}
                    </Text>
                  )}

                  {/* <Text style={styles.categoryPercent}>{item.percentage}%</Text> */}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* 6. BOUTON BAS DE PAGE */}
          <TouchableOpacity style={styles.bottomButton} activeOpacity={0.8}>
            <Text style={styles.bottomButtonText}>
              Voir toutes les catégories
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          {/* Remplace par <Image source={require('./assets/empty-budget.png')} style={styles.emptyImage} /> */}
          <View style={styles.illustrationPlaceholder}>
            <Image
              source={require("@/assets/images/empty-budget.png")}
              style={styles.emptyImage}
            />
          </View>
          <Text style={styles.emptyTitle}>Aucun budget enregistré</Text>
          <Text style={styles.emptySubtitle}>Ta liste de budgets est vide</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",

    paddingHorizontal: 18,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 30,
  },
  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: FieldsColors.green,
  },
  manageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  manageButtonText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#117A53",
  },
  /* Period Tabs */
  periodTabsContainer: {
    flexDirection: "row",
    backgroundColor: "#EFF3F6",
    borderRadius: 24,
    padding: 4,
    marginBottom: 14,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: 20,
  },
  activePeriodTab: {
    backgroundColor: "#117A53",
  },
  periodTabText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#64748B",
  },
  activePeriodTabText: {
    color: "#FFFFFF",
  },
  /* Bottom Button */
  bottomButton: {
    backgroundColor: "#EFF3F6",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  bottomButtonText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#475569",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  illustrationPlaceholder: {
    width: 120,
    height: 110,
    borderRadius: 24,
    backgroundColor: "#EFF7F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyImage: {
    width: 150,
    height: 120,
    resizeMode: "contain",
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#343A40",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13.5,
    color: "#7D868E",
  },
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
    padding: 6,
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
