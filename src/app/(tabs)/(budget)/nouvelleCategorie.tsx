import CalculAutomatique from "@/components/nouvelleCategorie/calculAutomatique";
import CalculExacte from "@/components/nouvelleCategorie/calculExacte";
import ListIcon from "@/components/ui/listIcon";
import MonthYearPicker from "@/components/ui/monthYearPicker";
import { DEFAULT_MONTHS_FR } from "@/constants/month";
import { FieldsColors, FontSizes, PaddingBottom } from "@/constants/theme";
import { Budget } from "@/models/budget";
import { insertBudget } from "@/services/budget";
import { generateId } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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

// Palette de couleurs inspirée de l'image
const COLORS_LIST = [
  "#0A7B3E", // Vert principal (sélectionné)
  "#F97316", // Orange
  "#FACC15", // Jaune
  "#A855F7", // Violet
  "#3B82F6", // Bleu
  "#EF4444", // Rouge
  "#6B7280", // Gris
];

let budget_tmp: Budget = {
  id: "",
  label: "",
  icon_background_color: "#0A7B3E",
  icon: "cash",
  monthly_amount: "0",
  unit_amount: "0",
  unit: "Nombre",
  number: "0",
  status: true,
  period: "",
  limit_type: "exact",
};

export default function CategoryFormScreen() {
  const now = new Date();

  const [budget, setBudget] = useState<Budget>(budget_tmp);
  const [selectedColor, setSelectedColor] = useState("#0A7B3E");
  const [isOpen, setIsOpen] = useState(false);
  const [isStatutActive, setIsStatutActive] = useState(budget.status);

  const [isDateYearPickerOpen, setIsDateYearPickerOpen] =
    useState<boolean>(false);
  const currentPeriodConcerne =
    DEFAULT_MONTHS_FR[now.getMonth()] + " " + now.getFullYear();
  const [periodConcerne, setPeriodConcerne] = useState<string>(
    currentPeriodConcerne,
  );

  const saveBudget = () => {
    const unique_id = generateId();
    budget.id = unique_id;
    insertBudget(budget);
  };

  useEffect(() => {
    setBudget({
      ...budget,
      period: periodConcerne,
      status: isStatutActive ? true : false,
    });
  }, [periodConcerne, isStatutActive]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* 1. EN-TÊTE : Bouton retour et Titre */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.push("/(tabs)/(budget)/gestionBudget")}
        >
          <Ionicons name="chevron-back" size={20} color={FieldsColors.green} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle catégorie</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Ligne du haut : Icône et Champ Nom de la catégorie */}
        <View style={styles.topSection}>
          <View style={styles.iconContainerWrapper}>
            <TouchableOpacity
              style={[
                styles.iconPreview,
                {
                  backgroundColor: budget.icon_background_color + "20",
                  borderColor: budget.icon_background_color,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setIsOpen(true)}
            >
              <Ionicons
                name={budget.icon}
                size={28}
                color={
                  budget.icon_background_color
                    ? budget.icon_background_color
                    : selectedColor
                }
              />
              <View
                style={[
                  styles.badgeIcon,
                  {
                    backgroundColor: budget.icon_background_color
                      ? budget.icon_background_color
                      : selectedColor,
                  },
                ]}
              >
                <Ionicons name="pencil" size={10} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.iconSubtext}>Choisir une icône</Text>
          </View>

          <ListIcon
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            budget={budget}
            setSelectedIcon={setBudget}
          />

          <View style={styles.inputGroupFlex}>
            <Text style={styles.label}>Nom de la catégorie</Text>
            <TextInput
              style={styles.textInput}
              value={budget.label}
              onChangeText={(label) => {
                setBudget({ ...budget, label: label });
              }}
              placeholder="Ex: Alimentation"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Section Couleur */}
        <Text style={styles.sectionLabel}>Couleur</Text>
        <View style={styles.colorsContainer}>
          {COLORS_LIST.map((color) => {
            const icon_color = budget.icon_background_color
              ? budget.icon_background_color
              : selectedColor;
            const isSelected = icon_color === color;
            return (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  isSelected && styles.selectedColorRing,
                ]}
                onPress={() =>
                  setBudget({ ...budget, icon_background_color: color })
                }
                activeOpacity={0.8}
              >
                {isSelected && (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Section Limite de dépenses (Cartes de choix) */}
        <Text style={styles.sectionLabel}>Limite de dépenses</Text>
        <View style={styles.limitTypesContainer}>
          {/* Option 1 : Montant exact */}
          <TouchableOpacity
            style={[
              styles.limitCard,
              budget.limit_type === "exact" && styles.selectedLimitCard,
            ]}
            onPress={() => {
              setBudget({
                ...budget,
                number: "0",
                unit_amount: "0",
                limit_type: "exact",
              });
            }}
            activeOpacity={0.9}
          >
            <View style={styles.limitCardHeader}>
              <View style={styles.radioOuter}>
                {budget.limit_type === "exact" && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Ionicons name="receipt-outline" size={18} color="#0A7B3E" />
            </View>
            <Text style={styles.limitCardTitle}>Montant exact</Text>
            <Text style={styles.limitCardSubtitle}>
              Saisir directement le montant
            </Text>
          </TouchableOpacity>

          {/* Option 2 : Calcul automatique */}
          <TouchableOpacity
            style={[
              styles.limitCard,
              budget.limit_type === "automatic" && styles.selectedLimitCard,
            ]}
            onPress={() => {
              setBudget({
                ...budget,
                monthly_amount: "0",
                limit_type: "automatic",
              });
            }}
            activeOpacity={0.9}
          >
            <View style={styles.limitCardHeader}>
              <View style={styles.radioOuter}>
                {budget.limit_type === "automatic" && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Ionicons name="construct-outline" size={18} color="#6B7280" />
            </View>
            <Text style={styles.limitCardTitle}>Calcul automatique</Text>
            <Text style={styles.limitCardSubtitle}>
              Selon un prix unitaire et une unité
            </Text>
          </TouchableOpacity>
        </View>

        {budget.limit_type === "exact" ? (
          <CalculExacte budget={budget} setBudget={setBudget} />
        ) : (
          <CalculAutomatique budget={budget} setBudget={setBudget} />
        )}

        {/* Récapitulatif Box */}
        <View style={styles.recapCard}>
          <View>
            <Text style={[styles.recapHeaderTitle, { color: selectedColor }]}>
              Récapitulatif
            </Text>
            <Text style={styles.recapSubtitle}>Limite pour décembre 2026</Text>
          </View>

          {budget.limit_type == "exact" ? (
            <Text style={styles.recapAmount}>
              {Number(budget.monthly_amount).toLocaleString("fr-FR")} Ar
            </Text>
          ) : (
            <Text style={styles.recapAmount}>
              {(
                Number(budget.number) * Number(budget.unit_amount)
              ).toLocaleString("fr-FR")}{" "}
              Ar
            </Text>
          )}
        </View>

        <View style={styles.flex1}>
          <Text style={styles.label}>Période concerné</Text>
          <TouchableOpacity
            style={styles.selectInput}
            activeOpacity={0.7}
            onPress={() => {
              // setModalVisible(!modalVisible);
              setIsDateYearPickerOpen(true);
            }}
          >
            <Text style={styles.selectText}>{periodConcerne}</Text>
            <Ionicons name="calendar-outline" size={16} color="#719082" />
          </TouchableOpacity>
          <MonthYearPicker
            periodConcerne={periodConcerne}
            setPeriodConcerne={setPeriodConcerne}
            isOpen={isDateYearPickerOpen}
            setIsOpen={setIsDateYearPickerOpen}
          />
        </View>

        {/* 6. STATUT (SWITCH) */}
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Statut</Text>
          <Switch
            value={Boolean(isStatutActive)}
            onValueChange={setIsStatutActive}
            trackColor={{ false: "#E2ECE7", true: "#0A7B3E" }}
            thumbColor={"#FFFFFF"}
          />
        </View>
        {/* 7. BOUTON DE VALIDATION EN BAS */}
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.85}
          onPress={() => {
            saveBudget();
          }}
        >
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
    paddingBottom: PaddingBottom,
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
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
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  iconContainerWrapper: {
    alignItems: "center",
  },
  iconPreview: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    position: "relative",
  },
  badgeIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  iconSubtext: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 4,
  },
  inputGroupFlex: {
    flex: 1,
  },
  label: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    marginTop: 12,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1F2937",
    flex: 1,
  },
  colorsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColorRing: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  limitTypesContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  limitCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
  },
  selectedLimitCard: {
    borderColor: "#0A7B3E",
    borderWidth: 1.5,
    backgroundColor: "#F4FBF7",
  },
  limitCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  inputGroupAutomaticSection: {
    flexDirection: "row",
  },
  inputContainer: {
    marginTop: 10,
    marginRight: 5,
    flex: 1,
  },
  selectInput: {
    flexDirection: "row",
    backgroundColor: "#F8FBFA",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#1A332B",
  },

  placeholderText: {
    color: "#A0AAB2",
    fontWeight: "500",
  },
  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#0A7B3E",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0A7B3E",
  },
  limitCardTitle: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 2,
  },
  limitCardSubtitle: {
    fontSize: FontSizes.xsmall,
    color: "#6B7280",
    lineHeight: 14,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingRight: 14,
    marginBottom: 8,
  },
  currencySuffix: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#6B7280",
  },
  recapCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 8,
    marginTop: 10,
  },
  recapHeaderTitle: {
    fontSize: FontSizes.small,
    fontWeight: "700",
  },
  recapSubtitle: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
  },
  calulateAmount: {
    fontSize: FontSizes.small,
    color: FieldsColors.grey,
    fontWeight: "600",
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: FontSizes.medium,
    fontWeight: "700",
    color: "#1F2937",
    alignSelf: "flex-end",
  },
  recapAmount: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#1F2937",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: FontSizes.small,
    color: "#1F2937",
    fontWeight: "500",
  },
  flex1: {
    flex: 1,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
