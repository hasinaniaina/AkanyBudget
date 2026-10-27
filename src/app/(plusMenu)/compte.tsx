import { FontSizes } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComptesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* En-tête avec bouton retour et bouton d'ajout */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={22} color="#0A5C36" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Comptes</Text>
        </View>
        <TouchableOpacity style={[styles.headerIconBtn]}>
          <Ionicons name="add" size={24} color="#0A5C36" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Carte Compte : Espèces */}
        <View style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: "#D4E8DE" }]}>
            <MaterialCommunityIcons name="cash" size={22} color="#0A5C36" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Espèces</Text>
            <Text style={styles.cardSubtitle}>Argent en main</Text>
          </View>
          <Text style={styles.cardAmount}>450 000 Ar</Text>
        </View>

        {/* Carte Compte : Banque (avec sous-détails épargne / disponible) */}
        <View style={styles.cardExpanded}>
          <View style={styles.cardTopRow}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#D1E8FF" }]}
            >
              <Ionicons name="business-outline" size={22} color="#1976D2" />
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.cardDetails}>
                <View>
                  <Text style={styles.cardTitle}>Banque</Text>
                  <View style={styles.rowAlign}>
                    <Text style={styles.cardSubtitle}>Solde total</Text>
                    <Ionicons
                      name="chevron-up"
                      size={12}
                      color="#719082"
                      style={{ marginLeft: 2 }}
                    />
                  </View>
                </View>
                <Text style={styles.cardAmount}>2 000 000 Ar</Text>
              </View>
              {/* Boîte de sous-détails interne */}
              <View style={styles.subDetailsBox}>
                <View style={styles.subDetailRow}>
                  <Text style={styles.subDetailLabel}>Dont épargne</Text>
                  <Text style={styles.subDetailValue}>1 500 000 Ar</Text>
                </View>
                <View style={styles.subDetailRow}>
                  <Text style={styles.subDetailLabel}>Reste disponible</Text>
                  <Text style={styles.subDetailValue}>500 000 Ar</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Carte Compte : Mobile Money */}
        <View style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: "#FCE4EC" }]}>
            <MaterialCommunityIcons
              name="cellphone"
              size={22}
              color="#C2185B"
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Mobile Money</Text>
            <Text style={styles.cardSubtitle}>Soldes des comptes</Text>
          </View>
          <Text style={styles.cardAmount}>400 000 Ar</Text>
        </View>

        {/* Note d'information du bas */}
        <View style={styles.infoBanner}>
          <Ionicons
            name="leaf-outline"
            size={20}
            color="#0A5C36"
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            Les soldes sont mis à jour automatiquement après chaque opération.
          </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  headerLeft: {
    flexDirection: "row",
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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2ECE6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardExpanded: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2ECE6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardAmount: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
  },
  subDetailsBox: {
    marginTop: 12,
    backgroundColor: "#F0F7F4",
    borderRadius: 14,
    padding: 12,
    gap: 8,
  },
  subDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subDetailLabel: {
    fontSize: FontSizes.xsmall,
    color: "#557A68",
  },
  subDetailValue: {
    fontSize: FontSizes.xsmall,
    fontWeight: "600",
    color: "#1A332B",
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F2EC",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#D4E8DE",
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: FontSizes.small,
    color: "#2E5A44",
    lineHeight: 18,
  },
});
