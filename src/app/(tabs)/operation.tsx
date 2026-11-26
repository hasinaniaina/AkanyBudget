import Depense from "@/components/tabs/operation/depense";
import Revenue from "@/components/tabs/operation/revenue";
import Tous from "@/components/tabs/operation/tous";
import Transfert from "@/components/tabs/operation/transfert";
import {
    FieldsColors as COLORS,
    FieldsColors,
    FontSizes,
} from "@/constants/theme";
import { useModalStore } from "@/hooks/useModalStore";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

export default function OperationsScreen() {
  const { isModalOpen, openModal, closeModal } = useModalStore();

  const [activeTab, setActiveTab] = useState<
    "toutes" | "revenus" | "depenses" | "transfert"
  >("toutes");

  const [visible, setVisible] = useState<boolean>(true);

  return (
    <>
      <SafeAreaView style={styles.container} edges={["top"]}>
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
          <TouchableOpacity
            style={[styles.tab, activeTab === "transfert" && styles.activeTab]}
            onPress={() => setActiveTab("transfert")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "transfert" && styles.activeTabText,
              ]}
            >
              Transfert
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab == "toutes" && <Tous />}
        {activeTab == "revenus" && <Revenue />}
        {activeTab == "depenses" && <Depense />}
        {activeTab == "transfert" && <Transfert />}

        {/* Bouton Flottant (+) en bas à droite */}
        <TouchableOpacity
          style={styles.floatingButton}
          activeOpacity={0.85}
          onPress={openModal}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 140, // Espace pour ne pas être masqué par le bouton flottant
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

  floatingButton: {
    position: "absolute",
    bottom: 120,
    right: 24,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: FieldsColors.green,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: FieldsColors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
