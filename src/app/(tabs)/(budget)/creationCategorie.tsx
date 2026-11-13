import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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

// Liste des couleurs disponibles dans la palette
const COLORS_PALETTE = [
  "#0A5C36", // Vert principal
  "#1E6091", // Bleu foncé
  "#F27D42", // Orange
  "#F25C54", // Rouge / Rose
  "#9342F5", // Violet
  "#2563EB", // Bleu vif
  "#FBBF24", // Jaune
  "#C6F6D5", // Vert clair pastel
  "#FEFCBF", // Jaune pastel
  "#EBF8FF", // Bleu pastel
  "#EDF2F7", // Gris pastel
];

export default function CreateCategoryScreen() {
  const [nomCategorie, setNomCategorie] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS_PALETTE[0]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. EN-TÊTE : Bouton retour et Titre */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.push("/(tabs)/(budget)/gestionBudget")}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={FieldsColors.green}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Création d'une catégorie</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* 2. CERCLE D'APERÇU DE L'ICÔNE */}
        <View style={styles.iconPreviewContainer}>
          <View style={[styles.mainIconCircle, { backgroundColor: "#E8F5E9" }]}>
            <Ionicons name="restaurant" size={44} color="#0A5C36" />

            {/* Petit bouton appareil photo / édition sur l'icône */}
            <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.8}>
              <Ionicons name="camera" size={14} color="#0A5C36" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. NOM DE LA CATÉGORIE */}
        <Text style={styles.label}>Nom de la catégorie *</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ex. : Alimentation"
            placeholderTextColor="#A0AAB2"
            value={nomCategorie}
            onChangeText={setNomCategorie}
          />
        </View>

        {/* 4. SÉLECTION DE LA COULEUR */}
        <Text style={styles.label}>Couleur</Text>
        <View style={styles.paletteContainer}>
          {COLORS_PALETTE.map((color, index) => {
            const isSelected = selectedColor === color;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorDot,
                  { backgroundColor: color },
                  isSelected && styles.selectedColorDot,
                ]}
                onPress={() => setSelectedColor(color)}
                activeOpacity={0.8}
              >
                {/* Bordure intérieure de sélection si actif */}
                {isSelected && <View style={styles.innerSelectedRing} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 5. ICÔNE (OPTIONNEL) */}
        <Text style={styles.label}>Icône (optionnel)</Text>
        <TouchableOpacity style={styles.iconSelectorButton} activeOpacity={0.7}>
          <Ionicons
            name="lock-closed-outline"
            size={16}
            color="#475569"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.iconSelectorText}>Choisir une icône</Text>
        </TouchableOpacity>

        {/* 6. BOUTON DE VALIDATION EN BAS */}
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: FieldsColors.green,
  },
  /* Icon Preview */
  iconPreviewContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  mainIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  /* Form Elements */
  label: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
    marginTop: 14,
  },
  inputContainer: {
    backgroundColor: "#F8FAFC",
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
    color: "#1E293B",
  },
  /* Color Palette */
  paletteContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
    marginBottom: 10,
  },
  colorDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColorDot: {
    borderWidth: 2,
    borderColor: "#0A5C36",
  },
  innerSelectedRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  /* Icon Selector Button */
  iconSelectorButton: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  iconSelectorText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#475569",
  },
  /* Submit Button */
  submitButton: {
    backgroundColor: "#0A5C36",
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0A5C36",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
