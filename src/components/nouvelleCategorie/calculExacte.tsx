import { FontSizes } from "@/constants/theme";
import { Budget } from "@/models/budget";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CalculExacte({
  budget,
  setBudget,
}: {
  budget: Budget;
  setBudget: (val: Budget) => void;
}) {
  const [selectedColor, setSelectedColor] = useState("#0A7B3E");
  const [amount, setAmount] = useState("400000");
  return (
    <>
      {/* Montant mensuel limite */}
      <Text style={styles.sectionLabel}>Montant mensuel limite</Text>
      <View style={styles.amountInputContainer}>
        <TextInput
          style={[
            styles.textInput,
            {
              color: selectedColor,
              fontWeight: "700",
              flex: 1,
              borderWidth: 0,
            },
          ]}
          value={budget.monthly_amount}
          onChangeText={(amount) => {
            setBudget({ ...budget, monthly_amount: amount });
          }}
          keyboardType="numeric"
        />
        <View style={styles.currencySuffix}>
          <Ionicons
            name="swap-vertical"
            size={14}
            color="#6B7280"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.currencyText}>Ar</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
});
