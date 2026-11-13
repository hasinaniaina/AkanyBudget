import Annee from "@/components/budget/annee";
import Mois from "@/components/budget/mois";
import Trimestre from "@/components/budget/trimestre";
import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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

        {selectedPeriod == "Mois" && <Mois />}
        {selectedPeriod == "Trimestre" && <Trimestre />}
        {selectedPeriod == "Année" && <Annee />}

        {/* 6. BOUTON BAS DE PAGE */}
        <TouchableOpacity style={styles.bottomButton} activeOpacity={0.8}>
          <Text style={styles.bottomButtonText}>
            Voir toutes les catégories
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 18,
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
});
