import { FieldsColors, FontSizes } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Banque from "./historiqueTab/banque";
import Espece from "./historiqueTab/espece";
import MobileMoney from "./historiqueTab/mobileMoney";
import Tous from "./historiqueTab/tous";

export default function Historique() {
  const [selectedFilter, setSelectedFilter] = useState<
    "Tous" | "Espèces" | "Banque" | "Mobile Money"
  >("Tous");

  return (
    <>
      {/* Filtres par type de compte (Onglets du haut) */}
      <View style={styles.filterContainer}>
        {(["Tous", "Espèces", "Banque", "Mobile Money"] as const).map(
          (filter) => {
            const isActive = selectedFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  isActive && styles.activeFilterButton,
                ]}
                onPress={() => setSelectedFilter(filter)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.activeFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          },
        )}
      </View>
      {selectedFilter == "Tous" && <Tous />}
      {selectedFilter == "Espèces" && <Espece />}
      {selectedFilter == "Banque" && <Banque />}
      {selectedFilter == "Mobile Money" && <MobileMoney />}
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {},
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#EAF4F0",
    borderRadius: 24,
    padding: 3,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: FieldsColors.green, // Vert foncé principal
    shadowColor: FieldsColors.green,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#557065",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  dateSelector: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    marginBottom: 16,
  },
  dateSelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateSelectorText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: FieldsColors.green,
  },
  summaryCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#0A5C36",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: FieldsColors.text,
    marginBottom: 4,
    fontWeight: "500",
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: FieldsColors.green,
    marginBottom: 14,
  },
  subAccountsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  subAccountItem: {
    flex: 1,
    alignItems: "center",
  },
  subIconBg: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  subAccountName: {
    fontSize: 10,
    color: FieldsColors.text,
    marginBottom: 2,
  },
  subAccountValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: FieldsColors.green,
  },
  separatorVertical: {
    width: 1,
    height: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  sectionTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
    marginBottom: 10,
  },
  dateGroupHeader: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#719082",
    marginTop: 12,
    marginBottom: 8,
  },
  transactionCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#EAF4F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  transIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transInfo: {
    flex: 1,
  },
  transTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
    marginBottom: 2,
  },
  transSubtitle: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
  },
  transRight: {
    alignItems: "flex-end",
  },
  amountGreen: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: FieldsColors.green,
    marginBottom: 2,
  },
  amountRed: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#E53935",
    marginBottom: 2,
  },
  transTime: {
    fontSize: FontSizes.xsmall,
    color: "#A0AAB2",
  },
  footerSync: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  footerSyncText: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
    marginHorizontal: 6,
  },
});
