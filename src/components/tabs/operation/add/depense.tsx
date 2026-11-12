import { FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Depense() {
  const [montant, setMontant] = useState("0");
  const [categorie, setCategorie] = useState("Alimentaion");
  const [date, setDate] = useState("03 / 11 / 2026");
  const [compte, setCompte] = useState("Mobile Money");
  const [libelle, setLibelle] = useState("");

  return (
    <>
      {/* 2. MONTANT (AR) */}
      <Text style={styles.label}>MONTANT (AR)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.amountInput}
          keyboardType="numeric"
          value={montant}
          onChangeText={setMontant}
          placeholder="0"
          placeholderTextColor="#A0AAB2"
          textAlignVertical="center"
        />
        <Text style={styles.currencySymbol}>Ar</Text>
      </View>

      {/* 3. CATÉGORIE */}
      <Text style={styles.label}>CATÉGORIE</Text>
      <TouchableOpacity style={styles.selectInput} activeOpacity={0.7}>
        <Text style={styles.selectText}>{categorie}</Text>
        <Ionicons name="chevron-down" size={16} color="#1A332B" />
      </TouchableOpacity>

      {/* 4. DATE ET COMPTE */}
      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.label}>DATE</Text>
          <TouchableOpacity style={styles.selectInput} activeOpacity={0.7}>
            <Text style={styles.selectText}>{date}</Text>
            <Ionicons name="calendar-outline" size={16} color="#719082" />
          </TouchableOpacity>
        </View>

        <View style={{ width: 12 }} />

        <View style={styles.flex1}>
          <Text style={styles.label}>COMPTE</Text>
          <TouchableOpacity style={styles.selectInput} activeOpacity={0.7}>
            <Text style={styles.selectText}>{compte}</Text>
            <Ionicons name="chevron-down" size={16} color="#1A332B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 5. LIBELLÉ / NOTE */}
      <Text style={styles.label}>LIBELLÉ / NOTE</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ex: Course Supermarché, Prime..."
          placeholderTextColor="#A0AAB2"
          value={libelle}
          onChangeText={setLibelle}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#719082",
    marginBottom: 6,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  typeContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F9F6",
    borderRadius: 24,
    padding: 4,
    marginBottom: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTypeButton: {
    backgroundColor: "#0A5C36",
  },
  typeText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#557065",
  },
  activeTypeText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#F8FBFA",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    alignItems: "center",
  },
  amountInput: {
    flex: 1,
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#1A332B",
    height: "100%",
    paddingVertical: 0,
  },
  currencySymbol: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#719082",
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
  row: {
    flexDirection: "row",
  },
  flex1: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: FontSizes.small,
    color: "#1A332B",
    height: "100%",
    paddingVertical: 0,
  },
});
