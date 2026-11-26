import { FieldsColors, FontSizes } from "@/constants/theme";
import { Budget } from "@/models/budget";
import { daysInThisMonth } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomDropdown from "../ui/CustomDropdown";

export default function CalculAutomatique({
  budget,
  setBudget,
}: {
  budget: Budget;
  setBudget: (val: Budget) => void;
}) {
  const [selectedUnit, setSelectedUnit] = useState<string>(budget.unit);
  const daysThisMonth = daysInThisMonth();

  const [isUnitOpen, setIsUnitOpen] = useState(false);
  const options = ["Nombre", "Jour", "Mois"];

  useEffect(() => {
    setBudget({
      ...budget,
      unit: selectedUnit,
      number: selectedUnit == "Mois" ? String(daysThisMonth) : "0",
    });
  }, [selectedUnit]);
  return (
    <>
      <View style={styles.inputGroupAutomaticSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Prix unitaire</Text>
          <TextInput
            style={styles.textInput}
            value={budget.unit_amount}
            placeholder="30000"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            onChangeText={(unitAmount) => {
              setBudget({
                ...budget,
                unit_amount: unitAmount,
              });
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Unité</Text>
          <TouchableOpacity
            style={styles.selectInput}
            activeOpacity={0.7}
            onPress={() => setIsUnitOpen(true)}
          >
            <Text
              style={[
                styles.selectText,
                !selectedUnit && styles.placeholderText,
              ]}
            >
              {selectedUnit}
            </Text>
            <Ionicons
              name={isUnitOpen ? "chevron-up" : "chevron-down"}
              size={16}
              color="#1A332B"
            />
          </TouchableOpacity>
          <CustomDropdown
            options={options}
            selectedValue={budget.unit}
            isOpen={isUnitOpen}
            setIsOpen={() => setIsUnitOpen(!isUnitOpen)}
            onSelect={setSelectedUnit}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.textInput}
          value={budget.number}
          placeholder="15"
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
          onChangeText={(nombre) => {
            setBudget({ ...budget, number: nombre });
          }}
        />
      </View>

      {/* Récapitulatif Box */}
      <View style={styles.recapCard}>
        <View>
          <Text style={styles.recapHeaderTitle}>Nombre: {budget.number}</Text>
          <Text style={styles.recapSubtitle}>
            Soit {budget.number} nombre(s)
          </Text>
        </View>
        <View>
          <Text style={styles.calulateAmount}>Montant calculé</Text>
          <Text
            style={[
              styles.totalAmount,
              ,
              { color: budget.icon_background_color },
            ]}
          >
            {(
              Number(budget.unit_amount) * Number(budget.number) || 0
            ).toLocaleString("fr-FR")}
            Ar
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputGroupAutomaticSection: {
    flexDirection: "row",
  },
  inputContainer: {
    marginTop: 10,
    marginRight: 5,
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
});
