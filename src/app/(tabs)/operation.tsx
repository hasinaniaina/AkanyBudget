import { FieldsColors as COLORS, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types pour les opérations
interface Operation {
  id: string;
  title: string;
  category: string;
  type: "revenu" | "depense" | "transfert";
  amount: string;
  date: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const OPERATIONS_DATA: Operation[] = [
  {
    id: "1",
    title: "Salaire",
    category: "Revenu • Banque",
    type: "revenu",
    amount: "+ 1 200 000 Ar",
    date: "12 déc. 2026",
    icon: "arrow-down",
    iconBg: "#D4E8DE",
    iconColor: COLORS.green,
  },
  {
    id: "2",
    title: "Courses alimentaires",
    category: "Dépense • Espèces",
    type: "depense",
    amount: "- 145 000 Ar",
    date: "11 déc. 2026",
    icon: "cart-outline",
    iconBg: "#F3D5F6",
    iconColor: "#9C27B0",
  },
  {
    id: "3",
    title: "Transfert Mobile Money",
    category: "Transfert • Mobile Money",
    type: "transfert",
    amount: "- 50 000 Ar",
    date: "10 déc. 2026",
    icon: "swap-horizontal",
    iconBg: "#FFE0B2",
    iconColor: "#EF6C00",
  },
  {
    id: "4",
    title: "Frais de santé",
    category: "Dépense • Banque",
    type: "depense",
    amount: "- 80 000 Ar",
    date: "09 déc. 2026",
    icon: "medical-outline",
    iconBg: "#D1C4E9",
    iconColor: "#512DA8",
  },
  {
    id: "5",
    title: "Vente produits",
    category: "Revenu • Mobile Money",
    type: "revenu",
    amount: "+ 320 000 Ar",
    date: "08 déc. 2026",
    icon: "basket-outline",
    iconBg: "#FFE0B2",
    iconColor: "#EF6C00",
  },
];

export default function OperationsScreen() {
  const [activeTab, setActiveTab] = useState<"toutes" | "revenus" | "depenses">(
    "toutes",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const renderItem = ({ item }: { item: Operation }) => (
    <View style={styles.operationItem}>
      <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
        <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
      </View>
      <View style={styles.operationInfo}>
        <Text style={styles.operationTitle}>{item.title}</Text>
        <Text style={styles.operationCategory}>{item.category}</Text>
      </View>
      <View style={styles.operationRight}>
        <Text
          style={[
            styles.operationAmount,
            item.type === "revenu" ? styles.textGreen : styles.textRed,
          ]}
        >
          {item.amount}
        </Text>
        <Text style={styles.operationDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre principal */}
        <Text style={styles.headerTitle}>Opérations</Text>

        {/* Onglets de filtrage (Toutes / Revenus / Dépenses) */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "toutes" && styles.activeTab]}
            onPress={() => setActiveTab("toutes")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "toutes" && styles.activeTabText,
              ]}
            >
              Toutes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "revenus" && styles.activeTab]}
            onPress={() => setActiveTab("revenus")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "revenus" && styles.activeTabText,
              ]}
            >
              Revenus
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "depenses" && styles.activeTab]}
            onPress={() => setActiveTab("depenses")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "depenses" && styles.activeTabText,
              ]}
            >
              Dépenses
            </Text>
          </TouchableOpacity>
        </View>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color={COLORS.lightGreen}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une opération..."
            placeholderTextColor="#86B5AA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filtres déroulants (Comptes & Période) */}
        <View style={styles.filtersRow}>
          <TouchableOpacity style={styles.filterDropdown}>
            <Text style={styles.filterText}>Tous les comptes</Text>
            <Ionicons name="chevron-down" size={14} color={COLORS.green} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterDropdown}>
            <Text style={styles.filterText}>Cette année</Text>
            <Ionicons name="chevron-down" size={14} color={COLORS.green} />
          </TouchableOpacity>
        </View>

        {/* Résumé Cartes (Revenus / Dépenses) */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCardRevenu}>
            <Text style={styles.summaryLabelRevenu}>Revenus</Text>
            <Text style={styles.summaryAmountRevenu}>4 250 000 Ar</Text>
          </View>

          <View style={styles.summaryCardDepense}>
            <Text style={styles.summaryLabelDepense}>Dépenses</Text>
            <Text style={styles.summaryAmountDepense}>2 180 000 Ar</Text>
          </View>
        </View>

        {/* Section Dernières opérations */}
        <Text style={styles.sectionTitle}>Dernières opérations</Text>

        <View style={styles.listContainer}>
          {OPERATIONS_DATA.map((item) => (
            <React.Fragment key={item.id}>
              {renderItem({ item })}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* Bouton Flottant (+) en bas à droite */}
      <TouchableOpacity style={styles.floatingButton} activeOpacity={0.85}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 90, // Espace pour ne pas être masqué par le bouton flottant
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.green,
    marginBottom: 16,
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
    backgroundColor: COLORS.green,
    shadowColor: COLORS.green,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4E8DE",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.small,
    color: "#333333",
  },
  filtersRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  filterDropdown: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4E8DE",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  filterText: {
    fontSize: FontSizes.small,
    color: COLORS.green,
    fontWeight: "500",
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  summaryCardRevenu: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  summaryLabelRevenu: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "600",
    marginBottom: 6,
  },
  summaryAmountRevenu: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  summaryCardDepense: {
    flex: 1,
    backgroundColor: "#FFEBEE",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  summaryLabelDepense: {
    fontSize: 13,
    color: "#C62828",
    fontWeight: "600",
    marginBottom: 6,
  },
  summaryAmountDepense: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B71C1C",
  },
  sectionTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: COLORS.green,
    marginBottom: 14,
  },
  listContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E2ECE6",
  },
  operationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F5F2",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  operationInfo: {
    flex: 1,
  },
  operationTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
    marginBottom: 3,
  },
  operationCategory: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
  },
  operationRight: {
    alignItems: "flex-end",
  },
  operationAmount: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    marginBottom: 3,
  },
  textGreen: {
    color: "#10A976",
  },
  textRed: {
    color: "#E53935",
  },
  operationDate: {
    fontSize: FontSizes.xsmall,
    color: "#86B5AA",
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#10A976",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#10A976",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
