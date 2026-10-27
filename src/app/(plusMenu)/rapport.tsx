import { FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RapportsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"mensuel" | "annuel" | "activite">(
    "mensuel",
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={22} color="#0A5C36" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rapports</Text>
          <View></View>
        </View>

        {/* Onglets de filtrage (Mensuel / Annuel / Par activité) */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "mensuel" && styles.activeTab]}
            onPress={() => setActiveTab("mensuel")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "mensuel" && styles.activeTabText,
              ]}
            >
              Mensuel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "annuel" && styles.activeTab]}
            onPress={() => setActiveTab("annuel")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "annuel" && styles.activeTabText,
              ]}
            >
              Annuel
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

        {/* Sélecteur de mois */}
        <TouchableOpacity style={styles.monthSelector}>
          <View style={styles.monthSelectorLeft}>
            <Ionicons name="filter-outline" size={16} color="#0A5C36" />
            <Text style={styles.monthText}>Décembre 2026</Text>
          </View>
          <Ionicons name="chevron-down" size={16} color="#0A5C36" />
        </TouchableOpacity>

        {/* Section Aperçu financier */}
        <Text style={styles.sectionTitle}>Aperçu financier</Text>
        <View style={styles.card}>
          <View style={styles.financialRow}>
            <View style={styles.financialItemLeft}>
              <View style={[styles.iconDot, { backgroundColor: "#E8F5E9" }]}>
                <View
                  style={[styles.innerDot, { backgroundColor: "#10A976" }]}
                />
              </View>
              <Text style={styles.financialLabel}>Revenus</Text>
            </View>
            <Text style={styles.financialAmountGreen}>4 250 000 Ar</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.financialRow}>
            <View style={styles.financialItemLeft}>
              <View style={[styles.iconDot, { backgroundColor: "#FFEBEE" }]}>
                <View
                  style={[styles.innerDot, { backgroundColor: "#E53935" }]}
                />
              </View>
              <View>
                <Text style={styles.financialLabel}>Dépenses</Text>
                <Text style={styles.financialSubLabel}>Solde total</Text>
              </View>
            </View>
            <Text style={styles.financialAmountRed}>2 180 000 Ar</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.financialRow}>
            <View style={styles.financialItemLeft}>
              <View style={[styles.iconDot, { backgroundColor: "#EDE7F6" }]}>
                <View
                  style={[styles.innerDot, { backgroundColor: "#7E57C2" }]}
                />
              </View>
              <Text style={styles.financialLabel}>Solde</Text>
            </View>
            <Text style={styles.financialAmountPurple}>2 070 000 Ar</Text>
          </View>
        </View>

        {/* Section Évolution revenus / dépenses (Graphique simplifié en barres) */}
        <Text style={styles.sectionTitle}>Évolution revenus / dépenses</Text>
        <View style={styles.card}>
          <View style={styles.chartContainer}>
            {[
              "Jan",
              "Fév",
              "Mar",
              "Avr",
              "Mai",
              "Juin",
              "Juil",
              "Août",
              "Sep",
              "Oct",
              "Nov",
              "Déc",
            ].map((month, index) => (
              <View key={index} style={styles.barGroup}>
                <View style={styles.barsWrapper}>
                  <View
                    style={[
                      styles.barGreen,
                      { height: `${Math.floor(Math.random() * 50) + 40}%` },
                    ]}
                  />
                  <View
                    style={[
                      styles.barRed,
                      { height: `${Math.floor(Math.random() * 40) + 30}%` },
                    ]}
                  />
                </View>
                <Text style={styles.chartMonthText}>{month}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Section Répartition des dépenses */}
        <Text style={styles.sectionTitle}>Répartition des dépenses</Text>
        <View style={styles.card}>
          <View style={styles.distributionContainer}>
            {/* Simulation graphique camembert stylisé */}
            <View style={styles.pieChartMock}>
              <View style={styles.pieSlice1} />
              <View style={styles.pieSlice2} />
              <View style={styles.pieSlice3} />
            </View>

            {/* Légende */}
            <View style={styles.legendContainer}>
              <View style={styles.legendRow}>
                <View style={styles.legendLeft}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#1976D2" }]}
                  />
                  <Text style={styles.legendText}>Alimentation</Text>
                </View>
                <Text style={styles.legendPercent}>35%</Text>
              </View>

              <View style={styles.legendRow}>
                <View style={styles.legendLeft}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#10A976" }]}
                  />
                  <Text style={styles.legendText}>Logement</Text>
                </View>
                <Text style={styles.legendPercent}>25%</Text>
              </View>

              <View style={styles.legendRow}>
                <View style={styles.legendLeft}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#FFA726" }]}
                  />
                  <Text style={styles.legendText}>Transport</Text>
                </View>
                <Text style={styles.legendPercent}>15%</Text>
              </View>

              <View style={styles.legendRow}>
                <View style={styles.legendLeft}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#E91E63" }]}
                  />
                  <Text style={styles.legendText}>Santé et famille</Text>
                </View>
                <Text style={styles.legendPercent}>15%</Text>
              </View>

              <View style={styles.legendRow}>
                <View style={styles.legendLeft}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#5C6BC0" }]}
                  />
                  <Text style={styles.legendText}>Autres</Text>
                </View>
                <Text style={styles.legendPercent}>10%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  headerTitle: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: "#0A5C36",
    marginLeft: 20,
  },

  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E6F2EC",
    alignItems: "center",
    justifyContent: "center",
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#E6F2EC",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
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
    fontSize: FontSizes.small,
    fontWeight: "500",
    color: "#557A68",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
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
    height: 46,
    marginBottom: 20,
    width: "60%",
  },
  monthSelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  monthText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#0A5C36",
  },
  sectionTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#0A5C36",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ffffffff",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  financialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  financialItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconDot: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  financialLabel: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#1A332B",
  },
  financialSubLabel: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
  },
  financialAmountGreen: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#10A976",
  },
  financialAmountRed: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#E53935",
  },
  financialAmountPurple: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#7E57C2",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F5F2",
    marginVertical: 4,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 140,
    paddingTop: 10,
  },
  barGroup: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  barsWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: "80%",
  },
  barGreen: {
    width: 5,
    backgroundColor: "#10A976",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  barRed: {
    width: 5,
    backgroundColor: "#E53935",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  chartMonthText: {
    fontSize: 10,
    color: "#719082",
    marginTop: 6,
  },
  distributionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  pieChartMock: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#1976D2",
    overflow: "hidden",
    position: "relative",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  pieSlice1: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 70,
    height: 70,
    backgroundColor: "#10A976",
  },
  pieSlice2: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    backgroundColor: "#FFA726",
  },
  pieSlice3: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 60,
    height: 60,
    backgroundColor: "#E91E63",
  },
  legendContainer: {
    flex: 1,
    gap: 8,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#1A332B",
  },
  legendPercent: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1A332B",
  },
});
