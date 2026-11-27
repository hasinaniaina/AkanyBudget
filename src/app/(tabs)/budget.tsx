import Annee from "@/components/budget/annee";
import Mois from "@/components/budget/mois";
import Trimestre from "@/components/budget/trimestre";
import { FieldsColors, FontSizes } from "@/constants/theme";
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
  const [selectedPeriod, setSelectedPeriod] = useState<
    "Mois" | "Trimestre" | "Année"
  >("Mois");
  const [userBudget, setUserBudget] = useState<Budget[]>([]);

  useFocusEffect(
    useCallback(() => {
      const budgets = getAllBudgetCurrentUser();
      setUserBudget(budgets);
    }, []),
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. EN-TÊTE */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budgets</Text>
        <TouchableOpacity
          style={styles.manageButton}
          activeOpacity={0.7}
          onPress={() => router.push("/(tabs)/(budget)/gestionBudget")}
        >
          <Ionicons name="settings-outline" size={16} color="#117A53" />
          <Text style={styles.manageButtonText}>Gérer les budgets</Text>
        </TouchableOpacity>
      </View>
      {userBudget.length > 0 ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 2. SÉLECTEUR DE PÉRIODE (Mois / Trimestre / Année) */}
          <View style={styles.periodTabsContainer}>
            {(["Mois", "Trimestre", "Année"] as const).map((period) => {
              const isActive = selectedPeriod === period;
              return (
                <TouchableOpacity
                  key={period}
                  style={[styles.periodTab, isActive && styles.activePeriodTab]}
                  onPress={() => setSelectedPeriod(period)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.periodTabText,
                      isActive && styles.activePeriodTabText,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedPeriod == "Mois" && <Mois budgets={userBudget} />}
          {selectedPeriod == "Trimestre" && <Trimestre budgets={userBudget} />}
          {selectedPeriod == "Année" && <Annee budgets={userBudget} />}

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
});
