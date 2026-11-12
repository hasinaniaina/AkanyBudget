import { FieldsColors, FontSizes } from "@/constants/theme";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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

export default function Revenue() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={18}
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

      {/* Carte : Total des Revenus */}
      <View style={styles.totalCard}>
        <Text style={styles.totalCardLabel}>Total des Revenus (Novembre)</Text>
        <Text style={styles.totalCardAmount}>+ 740 000 Ar</Text>

        <View style={styles.badgeContainer}>
          <Ionicons
            name="checkmark-circle"
            size={14}
            color="#FFFFFF"
            style={styles.badgeIcon}
          />
          <Text style={styles.badgeText}>3 Entrées enregistrées</Text>
        </View>
      </View>

      {/* --- LISTE DES REVENUS --- */}

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Salaire */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E1F5EC" }]}>
            <FontAwesome5 name="wallet" size={16} color="#0A5C36" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Salaire</Text>
            <Text style={styles.transDate}>05 nov. 2026</Text>
          </View>
          <Text style={styles.amountGreen}>+ 420 000 Ar</Text>
        </View>

        {/* 2. Transfert (client) */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E3F2FD" }]}>
            <Ionicons name="card-outline" size={18} color="#1E88E5" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Transfert (client)</Text>
            <Text style={styles.transDate}>02 nov. 2026</Text>
          </View>
          <Text style={styles.amountGreen}>+ 120 000 Ar</Text>
        </View>

        {/* 3. Épargne */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E1F5EC" }]}>
            <MaterialCommunityIcons
              name="piggy-bank-outline"
              size={18}
              color="#0A5C36"
            />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Épargne</Text>
            <Text style={styles.transDate}>28 oct. 2026</Text>
          </View>
          <Text style={styles.amountGreen}>+ 200 000 Ar</Text>
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
    color: FieldsColors.darkGreen,
  },
  periodChevron: {
    marginLeft: 6,
  },
  operationsCountText: {
    fontSize: FontSizes.small,
    color: "#719082",
    fontWeight: "500",
  },
  totalCard: {
    backgroundColor: FieldsColors.green, // Vert principal AkanyBudget
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: FieldsColors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  totalCardLabel: {
    fontSize: FontSizes.small,
    color: "#A3D9C9",
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
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  badgeIcon: {
    marginRight: 5,
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
    color: FieldsColors.green,
    marginBottom: 3,
  },
  transDate: {
    fontSize: FontSizes.xsmall,
    color: "#9EB3A8",
  },
  amountGreen: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: FieldsColors.green,
  },
});
