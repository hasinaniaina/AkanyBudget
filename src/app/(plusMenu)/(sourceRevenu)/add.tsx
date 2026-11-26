import { FieldsColors, FontSizes } from "@/constants/theme";
import { Source } from "@/models/source";
import { insertSource, updateSource } from "@/services/source";
import { generateId, parseBoolean } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface IconOption {
  id: string;
  name: keyof typeof Ionicons.glyphMap;
}

const ICONS_LIST: IconOption[] = [
  { id: "1", name: "cash-outline" },
  { id: "2", name: "wallet-outline" },
  { id: "3", name: "card-outline" },
  { id: "4", name: "briefcase-outline" },
  { id: "5", name: "trending-up-outline" },
  { id: "6", name: "business-outline" },
  { id: "7", name: "storefront-outline" },
  { id: "8", name: "cart-outline" },
  { id: "9", name: "home-outline" },
  { id: "10", name: "leaf-outline" },
  { id: "11", name: "laptop-outline" },
  { id: "12", name: "construct-outline" },
  { id: "13", name: "car-outline" },
  { id: "14", name: "gift-outline" },
  { id: "15", name: "ribbon-outline" },
  { id: "16", name: "pie-chart-outline" },
  { id: "17", name: "phone-portrait-outline" },
  { id: "18", name: "repeat-outline" },
  { id: "19", name: "pricetag-outline" },
  { id: "20", name: "hammer-outline" },
  { id: "21", name: "globe-outline" },
  { id: "22", name: "server-outline" },
  { id: "23", name: "people-outline" },
  { id: "24", name: "key-outline" },
  { id: "25", name: "receipt-outline" },
];

const sourceTmp = {
  id: "",
  label: "",
  description: "",
  icon_url: "cash-outline",
  status: true,
};

export default function AddRevenueSourceScreen() {
  const { theSource } = useLocalSearchParams();
  const editingSource: Source = JSON.parse(theSource as string);

  const [source, setSource] = useState<Source>(
    editingSource ? editingSource : sourceTmp,
  );

  const saveSource = () => {
    if (source.label != "") {
      const unique_id = generateId();
      source.id = unique_id;
      const isInserted = insertSource(source);
      if (isInserted) {
        Toast.show({
          type: "success",
          text1: "Insertion réussi",
          text2: "L'insertion de la source à été réussi.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Insertion Invalide",
          text2: "Problème d'insertion de la Source.",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Insertion Invalide",
        text2: "Le nom de la Source est requis",
      });
    }
  };

  const editSource = () => {
    if (source.label != "") {
      const isUpdated = updateSource(source);
      if (isUpdated) {
        Toast.show({
          type: "success",
          text1: "Mofication réussi",
          text2: "La modification de la source à été réussi.",
        });

        setTimeout(() => {
          router.push("/(plusMenu)/sourceRevenu");
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "Modification Invalide",
          text2: "Problème d'insertion de la Source.",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Modifiaction Invalide",
        text2: "Le champs nom de la Source est requis.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* 1. EN-TÊTE : Retour et Titre */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.push("/(plusMenu)/sourceRevenu")}
        >
          <Ionicons name="chevron-back" size={22} color={FieldsColors.green} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter une source</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. NOM DE LA SOURCE */}
        <Text style={styles.label}>Nom de la source *</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ex. Salaire, Commerce..."
            placeholderTextColor="#A0AAB2"
            value={source.label}
            onChangeText={(label) => {
              setSource({ ...source, label: label });
            }}
          />
        </View>

        {/* 4. DESCRIPTION */}
        <Text style={styles.label}>Description</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Détails sur cette source de revenus..."
            placeholderTextColor="#A0AAB2"
            multiline={true}
            numberOfLines={3}
            value={source.description}
            onChangeText={(description) => {
              setSource({ ...source, description: description });
            }}
            textAlignVertical="top"
          />
        </View>

        {/* 5. SÉLECTION DE L'ICÔNE */}
        <Text style={styles.label}>Icône</Text>
        <View style={styles.iconsGrid}>
          {ICONS_LIST.map((item) => {
            const isSelected = source.icon_url === item.name;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.iconCard, isSelected && styles.selectedIconCard]}
                onPress={() => setSource({ ...source, icon_url: item.name })}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={item.name}
                  size={22}
                  color={isSelected ? "#0A7B3E" : "#719082"}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 6. STATUT (SWITCH) */}
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Statut</Text>
          <Switch
            value={parseBoolean(source.status)}
            onValueChange={(isActive) => {
              setSource({ ...source, status: isActive });
            }}
            trackColor={{ false: "#E2ECE7", true: "#0A7B3E" }}
            thumbColor={"#FFFFFF"}
          />
        </View>

        {/* 7. BOUTON DE VALIDATION EN BAS */}
        {editingSource ? (
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={() => {
              editSource();
            }}
          >
            <Text style={styles.submitButtonText}>Modifier</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={() => {
              saveSource();
            }}
          >
            <Text style={styles.submitButtonText}>Enregistrer</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FAF8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#F7FAF8",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: "700",
    color: FieldsColors.green,
  },
  headerPlaceholder: {
    width: 30,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 36,
  },
  /* Aperçu Icône */
  iconPreviewContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#E6F4EC",
    justifyContent: "center",
    alignItems: "center",
  },
  /* Champs de formulaire */
  label: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: FieldsColors.text,
    marginBottom: 6,
    marginTop: 12,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    justifyContent: "center",
  },
  input: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#1A332B",
  },
  textAreaContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    height: 88,
  },
  textArea: {
    fontSize: FontSizes.small,
    fontWeight: "500",
    color: "#1A332B",
    height: "100%",
  },
  /* Grille d'icônes */
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
    marginBottom: 16,
  },
  iconCard: {
    width: 64,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIconCard: {
    borderColor: "#0A7B3E",
    borderWidth: 2,
    backgroundColor: "#E6F4EC",
  },
  /* Statut */
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 24,
  },
  statusLabel: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#1A332B",
  },
  /* Bouton Enregistrer */
  submitButton: {
    backgroundColor: "#0A7B3E",
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0A7B3E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
