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

export default function Banque() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Carte : En-tête du compte Banque */}
      <View style={styles.accountHeaderCard}>
        <View style={styles.accountHeaderTop}>
          <View style={[styles.accountIconBg, { backgroundColor: "#E3F2FD" }]}>
            <FontAwesome5 name="university" size={20} color="#1E88E5" />
          </View>
          <View style={styles.accountHeaderInfo}>
            <Text style={styles.accountTitle}>Banque</Text>
            <Text style={styles.accountSubtitle}>Solde total</Text>
          </View>
          <Text style={styles.accountAmount}>1 680 000 Ar</Text>
        </View>
        <Text style={styles.accountDetailsSubtext}>
          Dont épargne : 1 200 000 Ar | Disponible : 480 000 Ar
        </Text>
      </View>

      {/* Sélecteur de mois */}
      <TouchableOpacity style={styles.dateSelector} activeOpacity={0.7}>
        <View style={styles.dateSelectorLeft}>
          <Ionicons
            name="calendar-outline"
            size={FontSizes.small}
            color="#0A5C36"
            style={styles.calendarIcon}
          />
          <Text style={styles.dateSelectorText}>Novembre 2026</Text>
        </View>
        <Ionicons name="chevron-down" size={16} color="#719082" />
      </TouchableOpacity>

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

      {/* --- LISTE DES OPÉRATIONS BANCAIRES --- */}

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Opération 1 : Virement reçu (Revenu) */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E1F5EC" }]}>
            <Ionicons name="arrow-up" size={18} color="#0A5C36" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Virement reçu</Text>
            <Text style={styles.transSubtitle}>Salaire</Text>
            <Text style={styles.transDate}>15 nov. 2026 • 08:30</Text>
          </View>
          <Text style={styles.amountGreen}>+ 420 000 Ar</Text>
        </View>

        {/* Opération 2 : Prélèvement */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E3F2FD" }]}>
            <Ionicons name="arrow-up" size={18} color="#1E88E5" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Prélèvement</Text>
            <Text style={styles.transSubtitle}>Electricité</Text>
            <Text style={styles.transDate}>14 nov. 2026 • 12:15</Text>
          </View>
          <Text style={styles.amountRed}>- 45 000 Ar</Text>
        </View>

        {/* Opération 3 : Virement vers épargne */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#FFEBEE" }]}>
            <MaterialCommunityIcons
              name="piggy-bank-outline"
              size={18}
              color="#E53935"
            />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Virement vers épargne</Text>
            <Text style={styles.transSubtitle}>Épargne projet maison</Text>
            <Text style={styles.transDate}>12 nov. 2026 • 10:00</Text>
          </View>
          <Text style={styles.amountRed}>- 200 000 Ar</Text>
        </View>

        {/* Opération 4 : Retrait DAB */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#F3E5F5" }]}>
            <MaterialCommunityIcons name="atm" size={18} color="#8E24AA" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Retrait DAB</Text>
            <Text style={styles.transSubtitle}>Retrait espèces</Text>
            <Text style={styles.transDate}>10 nov. 2026 • 16:40</Text>
          </View>
          <Text style={styles.amountRed}>- 50 000 Ar</Text>
        </View>

        {/* Opération 5 : Frais bancaires */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E3F2FD" }]}>
            <FontAwesome5 name="university" size={14} color="#1E88E5" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Frais bancaires</Text>
            <Text style={styles.transSubtitle}>Frais de gestion</Text>
            <Text style={styles.transDate}>05 nov. 2026 • 09:00</Text>
          </View>
          <Text style={styles.amountRed}>- 3 500 Ar</Text>
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
  accountHeaderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EAF4F0",
  },
  accountHeaderTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  accountIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  accountHeaderInfo: {
    flex: 1,
  },
  accountTitle: {
    fontSize: FontSizes.medium,
    fontWeight: "bold",
    color: "#1A332B",
  },
  accountSubtitle: {
    fontSize: FontSizes.small,
    color: "#719082",
    marginTop: 1,
  },
  accountAmount: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: "#1E88E5", // Bleu cohérent avec la banque
  },
  accountDetailsSubtext: {
    fontSize: FontSizes.xsmall,
    color: "#557065",
    borderTopWidth: 1,
    borderTopColor: "#F0F5F2",
    paddingTop: 10,
    textAlign: "center",
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
    marginBottom: 12,
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
    color: FieldsColors.darkGreen,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.small,
    color: "#1A332B",
  },
  transactionCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
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
    marginBottom: 2,
  },
  transSubtitle: {
    fontSize: FontSizes.xsmall,
    color: "#557065",
    marginBottom: 2,
  },
  transDate: {
    fontSize: FontSizes.xsmall,
    color: "#9EB3A8",
  },
  amountRed: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#E53935",
  },
  amountGreen: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#0A5C36",
  },
});
