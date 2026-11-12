import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Transfert() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={FontSizes.small}
            color="#719082"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une opération..."
            placeholderTextColor="#9EB3A8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Ligne : Période et nombre d'opérations */}
        <View style={styles.periodRow}>
          <TouchableOpacity style={styles.periodSelector} activeOpacity={0.7}>
            <Text style={styles.periodLabel}>Période : </Text>
            <Text style={styles.periodValue}>Novembre 2026</Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color="#719082"
              style={styles.periodChevron}
            />
          </TouchableOpacity>
          <Text style={styles.operationsCountText}>3 opérations</Text>
        </View>

        {/* --- LISTE DES DÉPENSES --- */}

        {/* 1. Alimentation */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#FFEBEE" }]}>
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={18}
              color="#E53935"
            />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Alimentation</Text>
            <Text style={styles.transDate}>04 nov. 2026</Text>
          </View>
          <Text style={styles.amountRed}>- 85 000 Ar</Text>
        </View>

        {/* 2. Mobile Money */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#FFEBEE" }]}>
            <MaterialCommunityIcons
              name="cellphone"
              size={18}
              color="#E53935"
            />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Mobile Money</Text>
            <Text style={styles.transDate}>03 nov. 2026</Text>
          </View>
          <Text style={styles.amountRed}>- 50 000 Ar</Text>
        </View>

        {/* 3. Loyer */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#FFF3E0" }]}>
            <Ionicons name="home-outline" size={18} color="#EF6C00" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Loyer</Text>
            <Text style={styles.transDate}>01 nov. 2026</Text>
          </View>
          <Text style={styles.amountRed}>- 150 000 Ar</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F9F6", // Fond vert très clair AkanyBudget
  },
  scrollContainer: {},
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.small,
    color: "#1A332B",
  },
  periodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2ECE7",
  },
  periodLabel: {
    fontSize: FontSizes.small,
    color: "#719082",
  },
  periodValue: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: FieldsColors.green,
  },
  periodChevron: {
    marginLeft: 6,
  },
  operationsCountText: {
    fontSize: FontSizes.small,
    color: FieldsColors.text,
    fontWeight: "500",
  },
  totalCard: {
    backgroundColor: FieldsColors.red, // Rouge/Rose caractéristique des dépenses
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: FieldsColors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  totalCardLabel: {
    fontSize: FontSizes.small,
    color: "#FFCDD2",
    marginBottom: 6,
    fontWeight: "500",
  },
  totalCardAmount: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  badgeContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: FontSizes.xsmall,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  transactionCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EAF4F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  transIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
    marginBottom: 3,
  },
  transDate: {
    fontSize: FontSizes.xsmall,
    color: "#9EB3A8",
  },
  amountRed: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: FieldsColors.red,
  },
});
