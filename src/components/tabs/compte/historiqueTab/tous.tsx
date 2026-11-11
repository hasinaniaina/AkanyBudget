import { FieldsColors, FontSizes } from "@/constants/theme";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Tous() {
  return (
    <>
      {/* Sélecteur de mois */}
      <TouchableOpacity style={styles.dateSelector} activeOpacity={0.7}>
        <View style={styles.dateSelectorLeft}>
          <Ionicons
            name="calendar-outline"
            size={FontSizes.small}
            color={FieldsColors.green}
            style={styles.calendarIcon}
          />
          <Text style={styles.dateSelectorText}>Novembre 2026</Text>
        </View>
        <Ionicons name="chevron-down" size={16} color="#719082" />
      </TouchableOpacity>

      {/* Carte récapitulative du solde total et sous-soldes */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Solde total des comptes</Text>
        <Text style={styles.summaryAmount}>2 450 000 Ar</Text>

        <View style={styles.subAccountsRow}>
          {/* Espèces */}
          <View style={styles.subAccountItem}>
            <View style={[styles.subIconBg, { backgroundColor: "#E1F5EC" }]}>
              <FontAwesome5 name="wallet" size={12} color="#0A5C36" />
            </View>
            <Text style={styles.subAccountName}>Espèces</Text>
            <Text style={styles.subAccountValue}>320 000 Ar</Text>
          </View>

          <View style={styles.separatorVertical} />

          {/* Banque */}
          <View style={styles.subAccountItem}>
            <View style={[styles.subIconBg, { backgroundColor: "#E3F2FD" }]}>
              <FontAwesome5 name="university" size={12} color="#1E88E5" />
            </View>
            <Text style={styles.subAccountName}>Banque</Text>
            <Text style={styles.subAccountValue}>1 680 000 Ar</Text>
          </View>

          <View style={styles.separatorVertical} />

          {/* Mobile Money */}
          <View style={styles.subAccountItem}>
            <View style={[styles.subIconBg, { backgroundColor: "#FFEBEE" }]}>
              <MaterialCommunityIcons
                name="cellphone"
                size={14}
                color="#E53935"
              />
            </View>
            <Text style={styles.subAccountName}>Mobile Money</Text>
            <Text style={styles.subAccountValue}>450 000 Ar</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre Mouvements récents */}
        <Text style={styles.sectionTitle}>Mouvements récents</Text>

        {/* --- GROUPE : Aujourd'hui --- */}
        <Text style={styles.dateGroupHeader}>Aujourd'hui – 15 nov. 2026</Text>

        {/* Transaction 1 : Salaire (Revenu) */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E1F5EC" }]}>
            <Ionicons name="arrow-up" size={18} color="#0A5C36" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Salaire</Text>
            <Text style={styles.transSubtitle}>Revenu – Banque</Text>
          </View>
          <View style={styles.transRight}>
            <Text style={styles.amountGreen}>+ 420 000 Ar</Text>
            <Text style={styles.transTime}>08:30</Text>
          </View>
        </View>

        {/* Transaction 2 : Alimentation (Dépense) */}
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
            <Text style={styles.transSubtitle}>Dépense – Espèces</Text>
          </View>
          <View style={styles.transRight}>
            <Text style={styles.amountRed}>- 45 000 Ar</Text>
            <Text style={styles.transTime}>12:15</Text>
          </View>
        </View>

        {/* Transaction 3 : Transfert Mobile Money */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E3F2FD" }]}>
            <MaterialCommunityIcons
              name="cellphone"
              size={18}
              color="#1E88E5"
            />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Transfert Mobile Money</Text>
            <Text style={styles.transSubtitle}>Transfert – Mobile Money</Text>
          </View>
          <View style={styles.transRight}>
            <Text style={styles.amountRed}>- 100 000 Ar</Text>
            <Text style={styles.transTime}>14:20</Text>
          </View>
        </View>

        {/* --- GROUPE : 14 nov. 2026 --- */}
        <Text style={styles.dateGroupHeader}>14 nov. 2026</Text>

        {/* Transaction 4 : Loyer */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#FFF3E0" }]}>
            <Ionicons name="home-outline" size={18} color="#EF6C00" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Loyer</Text>
            <Text style={styles.transSubtitle}>Dépense – Banque</Text>
          </View>
          <View style={styles.transRight}>
            <Text style={styles.amountRed}>- 150 000 Ar</Text>
            <Text style={styles.transTime}>09:15</Text>
          </View>
        </View>

        {/* Transaction 5 : Virement reçu */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#FFFDE7" }]}>
            <Feather name="repeat" size={16} color="#FBC02D" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Virement reçu</Text>
            <Text style={styles.transSubtitle}>Revenu – Mobile Money</Text>
          </View>
          <View style={styles.transRight}>
            <Text style={styles.amountGreen}>+ 200 000 Ar</Text>
            <Text style={styles.transTime}>16:45</Text>
          </View>
        </View>

        {/* --- GROUPE : 13 nov. 2026 --- */}
        <Text style={styles.dateGroupHeader}>13 nov. 2026</Text>

        {/* Transaction 6 : Courses */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#FFEBEE" }]}>
            <Ionicons name="cart-outline" size={18} color="#E53935" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Courses</Text>
            <Text style={styles.transSubtitle}>Dépense – Banque</Text>
          </View>
          <View style={styles.transRight}>
            <Text style={styles.amountRed}>- 72 500 Ar</Text>
            <Text style={styles.transTime}>11:30</Text>
          </View>
        </View>

        {/* Transaction 7 : Transfert entre comptes */}
        <View style={styles.transactionCard}>
          <View style={[styles.transIconBg, { backgroundColor: "#E1F5EC" }]}>
            <Ionicons name="arrow-redo" size={16} color="#0A5C36" />
          </View>
          <View style={styles.transInfo}>
            <Text style={styles.transTitle}>Transfert entre comptes</Text>
            <Text style={styles.transSubtitle}>
              Transfert – Banque ➔ Mobile Money
            </Text>
          </View>
          <View style={styles.transRight}>
            <Text style={styles.amountRed}>- 50 000 Ar</Text>
            <Text style={styles.transTime}>17:20</Text>
          </View>
        </View>

        {/* Bas de page : Mise à jour */}
        <View style={styles.footerSync}>
          <Ionicons name="cloud-outline" size={14} color="#719082" />
          <Text style={styles.footerSyncText}>
            Données mises à jour jusqu'à 15 nov. 2026 - 17:20
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="reload" size={13} color="#0A5C36" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {},
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
    marginTop: 20,
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
