import BudgetSumary from "@/components/tabs/budget/budgetSumary";
import ListBudget from "@/components/tabs/budget/listBudget";
import MonthYearPicker from "@/components/ui/monthYearPicker";
import { DEFAULT_MONTHS_FR } from "@/constants/month";
import { FieldsColors, FontSizes, PaddingBottom } from "@/constants/theme";
import { Budget } from "@/models/budget";
import { getAllBudgetCurrentUser } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
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
  const [spentAmount, setSpentAmount] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

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

      budgets.map((budget) => {
        if (periodConcerne == budget.period) {
          userBudgets.push(budget);
          if (budget.limit_type == "exact") {
            totalAmount += Number(budget.monthly_amount);
          } else {
            totalAmount += Number(budget.unit_amount) * Number(budget.number);
          }
        }
      });

      setUserBudgets(userBudgets.slice(0, 10));
      setTotalAmount(totalAmount);
      setSpentAmount(0);
      const percentage = totalAmount ? (spentAmount * 100) / totalAmount : 0;
      setPercentage(percentage);
    }, [periodConcerne]),
  );
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* 1. EN-TÊTE */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budgets</Text>

        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => router.push("/(tabs)/(budget)/nouvelleCategorie")}
        >
          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
            <Ionicons name="add" size={FontSizes.small} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.addText}>Ajouter un budget</Text>
        </TouchableOpacity>
      </View>
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
      <BudgetSumary
        spentAmount={spentAmount}
        budgetAmount={totalAmount}
        percentage={percentage}
      />

      {/* 5. SECTION : PAR CATÉGORIE */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Par catégorie</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAllText}>
            Voir toutes les catégories
            <Ionicons
              name="chevron-down"
              size={FontSizes.small}
              color="#64748B"
            />
          </Text>
        </TouchableOpacity>
      </View>

      {userBudgets.length > 0 ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* LISTE DES CATÉGORIES */}
          <View style={styles.categoriesList}>
            {userBudgets.map((budget) => (
              <ListBudget
                id={budget.id}
                icon={budget.icon}
                title={budget.label}
                budgetAmount={
                  budget.limit_type == "exact"
                    ? Number(budget.monthly_amount)
                    : Number(budget.unit_amount) * Number(budget.number)
                }
                spentAmount={0}
                percentage={0}
                currency="Ar"
                accentColor={budget.icon_background_color}
              />
            ))}
          </View>

          {/* 6. BOUTON BAS DE PAGE */}
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
    paddingBottom: PaddingBottom,
    paddingHorizontal: 18,
  },
  container: {
    overflow: "hidden",
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
  addButton: {
    width: 20,
    height: 20,
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
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addText: {
    marginLeft: 10,
    color: FieldsColors.green,
    fontWeight: "500",
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
    color: FieldsColors.green,
  },
  /* Section Header */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
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
    gap: 5,
    marginBottom: 22,
  },
});
