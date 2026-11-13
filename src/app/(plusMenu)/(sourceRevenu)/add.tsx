import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

interface IconOption {
  id: string;
  name: keyof typeof Ionicons.glyphMap;
}

const ICONS_LIST: IconOption[] = [
  { id: "1", name: "briefcase" },
  { id: "2", name: "storefront" },
  { id: "3", name: "cart" },
  { id: "4", name: "home" },
  { id: "5", name: "cash" },
  { id: "6", name: "add-circle" },
];

export default function AddRevenueSourceScreen() {
  const [nomSource, setNomSource] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("briefcase");
  const [isStatutActive, setIsStatutActive] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* 1. EN-TÊTE : Retour et Titre */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.back()}
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
        {/* 2. CERCLE D'APERÇU DE L'ICÔNE */}
        <View style={styles.iconPreviewContainer}>
          <View style={styles.mainIconCircle}>
            <Ionicons name="add" size={38} color="#0A7B3E" />
          </View>
        </View>

        {/* 3. NOM DE LA SOURCE */}
        <Text style={styles.label}>Nom de la source *</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ex. Salaire, Commerce..."
            placeholderTextColor="#A0AAB2"
            value={nomSource}
            onChangeText={setNomSource}
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
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        {/* 5. SÉLECTION DE L'ICÔNE */}
        <Text style={styles.label}>Icône</Text>
        <View style={styles.iconsGrid}>
          {ICONS_LIST.map((item) => {
            const isSelected = selectedIcon === item.name;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.iconCard, isSelected && styles.selectedIconCard]}
                onPress={() => setSelectedIcon(item.name)}
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
            value={isStatutActive}
            onValueChange={setIsStatutActive}
            trackColor={{ false: "#E2ECE7", true: "#0A7B3E" }}
            thumbColor={"#FFFFFF"}
          />
        </View>

        {/* 7. BOUTON DE VALIDATION EN BAS */}
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.85}>
          <Text style={styles.submitButtonText}>Enregistrer</Text>
        </TouchableOpacity>
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
