import Historique from "@/components/tabs/compte/historique";
import VueEnsemble from "@/components/tabs/compte/vueEnsemble";
import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountsScreen() {
  const [activeTab, setActiveTab] = useState<"overview" | "history">(
    "overview",
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* En-tête : Bouton Retour et Titre */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.push("/(tabs)")}
        >
          <Ionicons name="chevron-back" size={24} color={FieldsColors.green} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Comptes</Text>
      </View>

      {/* Sélecteur d'onglets (Vue d'ensemble / Historique) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "overview" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("overview")}
          activeOpacity={0.9}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "overview" && styles.activeTabText,
            ]}
          >
            Vue d'ensemble
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "history" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("history")}
          activeOpacity={0.9}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "history" && styles.activeTabText,
            ]}
          >
            Historique
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab == "overview" ? <VueEnsemble /> : <Historique />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F9F6", // Fond vert très clair AkanyBudget
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 115,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  headerTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: FieldsColors.green,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EAF4F0",
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 24,
  },
  activeTabButton: {
    backgroundColor: FieldsColors.green, // Vert principal
    shadowColor: FieldsColors.green,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#557065",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
});
