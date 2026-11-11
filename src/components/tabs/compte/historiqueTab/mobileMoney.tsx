import { FieldsColors, FontSizes } from "@/constants/theme";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function MobileMoney() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Carte : En-tête du compte Mobile Money */}
      <View style={styles.accountHeaderCard}>
        <View style={styles.accountHeaderTop}>
          <View
            style={[
              styles.accountIconBg,
              { backgroundColor: FieldsColors.lightRed },
            ]}
          >
            <MaterialCommunityIcons
              name="cellphone"
              size={22}
              color="#E53935"
            />
          </View>
          <View style={styles.accountHeaderInfo}>
            <Text style={styles.accountTitle}>Mobile Money</Text>
            <Text style={styles.accountSubtitle}>Solde actuel</Text>
          </View>
          <Text style={styles.accountAmount}>320 000 Ar</Text>
        </View>
      </View>

      {/* Sélecteur de mois */}
      <TouchableOpacity style={styles.dateSelector} activeOpacity={0.7}>
        <View style={styles.dateSelectorLeft}>
          <Ionicons
            name="calendar-outline"
            size={18}
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

      {/* --- LISTE DES OPÉRATIONS MOBILE MONEY --- */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Opération 1 : Achat crédit */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#FFEBEE" }]}>
            <MaterialCommunityIcons
              name="cellphone-message"
              size={18}
              color="#E53935"
            />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Achat crédit</Text>
            <Text style={styles.transSubtitle}>Mobile</Text>
            <Text style={styles.transDate}>15 nov. 2026 • 14:30</Text>
          </View>
          <Text style={styles.amountRed}>- 20 000 Ar</Text>
        </View>

        {/* Opération 2 : Transfert reçu (Revenu) */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E1F5EC" }]}>
            <Feather name="repeat" size={16} color="#0A5C36" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Transfert reçu</Text>
            <Text style={styles.transSubtitle}>Particulier</Text>
            <Text style={styles.transDate}>14 nov. 2026 • 09:10</Text>
          </View>
          <Text style={styles.amountGreen}>+ 50 000 Ar</Text>
        </View>

        {/* Opération 3 : Paiement marchand */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E3F2FD" }]}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={18}
              color="#1E88E5"
            />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Paiement marchand</Text>
            <Text style={styles.transSubtitle}>Alimentation</Text>
            <Text style={styles.transDate}>11 nov. 2026 • 10:45</Text>
          </View>
          <Text style={styles.amountRed}>- 35 000 Ar</Text>
        </View>

        {/* Opération 4 : Transfert vers banque */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E3F2FD" }]}>
            <MaterialCommunityIcons
              name="cellphone"
              size={18}
              color="#1E88E5"
            />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Transfert vers banque</Text>
            <Text style={styles.transSubtitle}>Compte bancaire</Text>
            <Text style={styles.transDate}>09 nov. 2026 • 11:20</Text>
          </View>
          <Text style={styles.amountRed}>- 100 000 Ar</Text>
        </View>

        {/* Opération 5 : Achat forfait */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#FFEBEE" }]}>
            <MaterialCommunityIcons name="wifi" size={18} color="#E53935" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Achat forfait</Text>
            <Text style={styles.transSubtitle}>Mobile</Text>
            <Text style={styles.transDate}>07 nov. 2026 • 18:15</Text>
          </View>
          <Text style={styles.amountRed}>- 15 000 Ar</Text>
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
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
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
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
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
    marginTop: 2,
  },
  accountAmount: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: "#E53935", // Rouge/Rose caractéristique du Mobile Money
    marginTop: 4,
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
    color: "#1A332B",
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
    fontSize: 10,
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
