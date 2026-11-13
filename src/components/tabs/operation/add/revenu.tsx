import CustomDropdown from "@/components/ui/CustomDropdown";
import DatePickerField from "@/components/ui/datePickerField";
import { FontSizes } from "@/constants/theme";
import { formatDate } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface isOpenInterface {
  categorie: boolean;
  compte: boolean;
}

export default function Revenu() {
  const [montant, setMontant] = useState("0");
  const [categorie, setCategorie] = useState("Salaire");
  const [date, setDate] = useState("03 / 11 / 2026");
  const [compte, setCompte] = useState("Mobile Money");
  const [libelle, setLibelle] = useState("");

  const [isOpen, setIsOpen] = useState<isOpenInterface>({
    categorie: false,
    compte: false,
  });
  const [selectedCategorie, setSelecteCategorie] = useState<string>();
  const [selectedCompte, setSelectedCompte] = useState<string>();
  const options = {
    categorie: ["Salaire", "Poulailler", "Transfert mobile"],
    compte: ["Espèce", "Banque", "Mobile money"],
  };

  const placeholder = "Sélectionner...";
  const [onDateChange, setOnDateChange] = useState<string | undefined>(
    formatDate(new Date()),
  );
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      {/* 2. MONTANT (AR) */}
      <Text style={styles.label}>Montant (Ar)</Text>
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
      <Text style={styles.label}>Catégorie</Text>
      {/* 1. Le TouchableOpacity déclencheur */}
      <TouchableOpacity
        style={styles.selectInput}
        activeOpacity={0.7}
        onPress={() => {
          setIsOpen({ ...isOpen, categorie: !isOpen.categorie });
          if (isOpen.compte) {
            setIsOpen({ ...isOpen, compte: !isOpen.compte });
          }
        }}
      >
        <Text
          style={[
            styles.selectText,
            !selectedCategorie && styles.placeholderText,
          ]}
        >
          {selectedCategorie || placeholder}
        </Text>
        <Ionicons
          name={isOpen.categorie ? "chevron-up" : "chevron-down"}
          size={16}
          color="#1A332B"
        />
      </TouchableOpacity>
      <CustomDropdown
        options={options.categorie}
        selectedValue={placeholder}
        isOpen={isOpen.categorie}
        setIsOpen={() => {
          setIsOpen({ ...isOpen, categorie: !isOpen.categorie });
        }}
        onSelect={setSelecteCategorie}
      />

      {/* 4. DATE ET COMPTE */}
      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.selectInput}
            activeOpacity={0.7}
            onPress={() => {
              setShowPicker(!showPicker);
            }}
          >
            <Text style={styles.selectText}>{onDateChange}</Text>
            <Ionicons name="calendar-outline" size={16} color="#719082" />
          </TouchableOpacity>
          <DatePickerField
            onDateChange={setOnDateChange}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
          />
        </View>

        <View style={{ width: 12 }} />

        <View style={styles.flex1}>
          <Text style={styles.label}>Compte</Text>
          <TouchableOpacity
            style={styles.selectInput}
            activeOpacity={0.7}
            onPress={() => {
              setIsOpen({ ...isOpen, compte: !isOpen.compte });
              if (isOpen.categorie) {
                setIsOpen({ ...isOpen, categorie: !isOpen.categorie });
              }
            }}
          >
            <Text
              style={[
                styles.selectText,
                !selectedCompte && styles.placeholderText,
              ]}
            >
              {selectedCompte || placeholder}
            </Text>
            <Ionicons
              name={isOpen.compte ? "chevron-up" : "chevron-down"}
              size={16}
              color="#1A332B"
            />
          </TouchableOpacity>
          <CustomDropdown
            options={options.compte}
            selectedValue={placeholder}
            isOpen={isOpen.compte}
            setIsOpen={() => setIsOpen({ ...isOpen, compte: !isOpen.compte })}
            onSelect={setSelectedCompte}
          />
        </View>
      </View>

      {/* 5. LIBELLÉ / NOTE */}
      <Text style={styles.label}>Description (optionnel)</Text>
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
  placeholderText: {
    color: "#A0AAB2",
    fontWeight: "500",
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
