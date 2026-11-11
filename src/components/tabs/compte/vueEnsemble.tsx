import { FieldsColors, FontSizes } from "@/constants/theme";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VueEnsemble() {
  const [isBankExpanded, setIsBankExpanded] = useState(true); // Pour dérouler/voir les détails du compte bancaire

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Carte : Solde total des comptes */}
      <View style={styles.totalCard}>
        <Text style={styles.totalCardLabel}>Solde total des comptes</Text>
        <Text style={styles.totalCardAmount}>2 450 000 Ar</Text>
      </View>

      {/* Section : Détail des comptes */}
      <Text style={styles.sectionTitle}>Détail des comptes</Text>

      {/* 1. Compte Espèces */}
      <View style={styles.accountCard}>
        <View style={styles.accountRow}>
          <View style={[styles.iconContainer, { backgroundColor: "#E1F5EC" }]}>
            <FontAwesome5 name="wallet" size={18} color="#10A976" />
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Espèces</Text>
            <Text style={styles.accountDescription}>Argent en main</Text>
          </View>
          <Text style={styles.accountAmount}>320 000 Ar</Text>
        </View>
      </View>

      {/* 2. Compte Banque (avec sous-détails extensibles) */}
      <TouchableOpacity
        style={styles.accountCardInteractive}
        onPress={() => setIsBankExpanded(!isBankExpanded)}
        activeOpacity={0.9}
      >
        <View style={styles.accountRow}>
          <View style={[styles.iconContainer, { backgroundColor: "#E3F2FD" }]}>
            <FontAwesome5 name="university" size={18} color="#1E88E5" />
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Banque</Text>
            <Text style={styles.accountDescription}>
              Solde total (dont épargne 1 200 000 Ar)
            </Text>
          </View>
          <Text style={styles.accountAmount}>1 680 000 Ar</Text>
        </View>

        {/* Sous-bloc : Détail du compte bancaire */}
        {isBankExpanded && (
          <View style={styles.subDetailContainer}>
            <Text style={styles.subDetailHeader}>
              Détail du compte bancaire
            </Text>

            <View style={styles.subDetailRow}>
              <Text style={styles.subDetailLabel}>Solde total</Text>
              <Text style={styles.subDetailValue}>1 680 000 Ar</Text>
            </View>

            <View style={styles.subDetailRow}>
              <Text style={styles.subDetailLabel}>Épargne</Text>
              <Text style={styles.subDetailValue}>1 200 000 Ar</Text>
            </View>

            <View style={[styles.subDetailRow, styles.noBorder]}>
              <Text style={styles.subDetailLabel}>Reste disponible</Text>
              <Text style={styles.subDetailValue}>480 000 Ar</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* 3. Compte Mobile Money */}
      <View style={styles.accountCard}>
        <View style={styles.accountRow}>
          <View style={[styles.iconContainer, { backgroundColor: "#FFEBEE" }]}>
            <MaterialCommunityIcons
              name="cellphone"
              size={20}
              color="#E53935"
            />
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Mobile Money</Text>
            <Text style={styles.accountDescription}>
              Soldes des comptes configurés
            </Text>
          </View>
          <Text style={[styles.accountAmount, styles.redAmount]}>
            450 000 Ar
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {},
  totalCard: {
    backgroundColor: FieldsColors.green, // Vert foncé élégant
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#0A5C36",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
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
  },
  sectionTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
    marginBottom: 14,
  },
  accountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  accountCardInteractive: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
    marginBottom: 2,
  },
  accountDescription: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
  },
  accountAmount: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
  },
  redAmount: {
    color: "#E53935", // Couleur spécifique pour mobile money si besoin, ou standard
  },
  subDetailContainer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F5F2",
    backgroundColor: "#F8FBFA",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  subDetailHeader: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#557065",
    marginBottom: 8,
  },
  subDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF4F1",
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  subDetailLabel: {
    fontSize: FontSizes.small,
    color: "#719082",
  },
  subDetailValue: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#1A332B",
  },
});
