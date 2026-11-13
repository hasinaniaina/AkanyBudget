import CustomTypeTransfertDropdown from "@/components/ui/customTypeTransfertDropdown";
import DatePickerField from "@/components/ui/datePickerField";
import { FontSizes } from "@/constants/theme";
import { formatDate } from "@/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface IsOpenInterface {
  from: boolean;
  to: boolean;
}

export default function Transfert() {
  const [typeTransfert, setTypeTransfert] = useState<"entre" | "tiers">(
    "entre",
  );
  const [montant, setMontant] = useState("0 Ar");
  const [description, setDescription] = useState("");

  const currentDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedFrom, setSelectedFrom] = useState<string>("Compte bancaire");
  const [selectedTo, setSelectedTo] = useState<string>("Mobile money");
  const [isOpen, setIsOpen] = useState<IsOpenInterface>({
    from: false,
    to: false,
  });
  const options = ["Compte bancaire", "Mobile Money"];
  return (
    <>
      {/* 1. TYPE DE TRANSFERT */}
      <Text style={styles.label}>Type de transfert</Text>
      {/* <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            typeTransfert === "entre" && styles.activeTypeButton,
          ]}
          onPress={() => setTypeTransfert("entre")}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="swap-horizontal"
            size={18}
            color={typeTransfert === "entre" ? "#0A5C36" : "#557065"}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              styles.typeText,
              typeTransfert === "entre" && styles.activeTypeText,
            ]}
          >
            Entre mes comptes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            typeTransfert === "tiers" && styles.activeTypeButton,
          ]}
          onPress={() => setTypeTransfert("tiers")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.typeText,
              typeTransfert === "tiers" && styles.activeTypeText,
            ]}
          >
            Vers un tiers
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* 2. COMPTE SOURCE ("DE") */}
      <TouchableOpacity
        style={styles.accountCard}
        activeOpacity={0.7}
        onPress={() => {
          setIsOpen({ ...isOpen, from: !isOpen.from });
          if (isOpen.to) {
            setIsOpen({ ...isOpen, to: !isOpen.to });
          }
        }}
      >
        <View style={[styles.iconBox, { backgroundColor: "#E8F1FC" }]}>
          <Ionicons name="business-outline" size={20} color="#2B6CB0" />
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountLabel}>De</Text>
          <Text style={styles.accountValue}>{selectedFrom}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#A0AAB2" />
      </TouchableOpacity>
      <CustomTypeTransfertDropdown
        options={options}
        isOpen={isOpen.from}
        setIsOpen={() => {
          setIsOpen({ ...isOpen, from: !isOpen.from });
        }}
        selectedValue={selectedFrom}
        onSelect={setSelectedFrom}
      />

      {/* 3. COMPTE DESTINATION ("VERS") */}
      <TouchableOpacity
        style={styles.accountCard}
        activeOpacity={0.7}
        onPress={() => {
          setIsOpen({ ...isOpen, to: !isOpen.to });

          if (isOpen.from) {
            setIsOpen({ ...isOpen, from: !isOpen.from });
          }
        }}
      >
        <View style={[styles.iconBox, { backgroundColor: "#FDE8E8" }]}>
          <MaterialCommunityIcons name="cellphone" size={20} color="#E53E3E" />
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountLabel}>Vers</Text>
          <Text style={styles.accountValue}>{selectedTo}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#A0AAB2" />
      </TouchableOpacity>
      <CustomTypeTransfertDropdown
        options={options}
        isOpen={isOpen.to}
        setIsOpen={() => {
          setIsOpen({ ...isOpen, to: !isOpen.to });
        }}
        selectedValue={selectedTo}
        onSelect={setSelectedTo}
      />

      {/* 4. MONTANT */}
      <Text style={styles.label}>Montant</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={montant}
          onChangeText={setMontant}
          placeholder="0 Ar"
          placeholderTextColor="#A0AAB2"
        />
        <Ionicons name="arrow-undo" size={16} color="#A0AAB2" />
      </View>

      {/* 5. DATE */}
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        activeOpacity={0.7}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Ionicons
          name="calendar-outline"
          size={18}
          color="#719082"
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.input, { lineHeight: 22 }]}>
          {formatDate(new Date(selectedDate))}
        </Text>
        <Ionicons name="calendar-outline" size={16} color="#719082" />
      </TouchableOpacity>
      <DatePickerField
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      {/* 6. DESCRIPTION (OPTIONNEL) */}
      <Text style={styles.label}>Description (optionnel)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ex. : Transfert vers épargne"
          placeholderTextColor="#A0AAB2"
          value={description}
          onChangeText={setDescription}
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
    marginTop: 12,
    letterSpacing: 0.3,
  },
  typeContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F9F6",
    borderRadius: 24,
    padding: 4,
    marginBottom: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  activeTypeButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typeText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#557065",
  },
  activeTypeText: {
    color: "#0A5C36",
    fontWeight: "bold",
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FBFA",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountLabel: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
    fontWeight: "600",
  },
  accountValue: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
    marginTop: 2,
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
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#1A332B",
  },
});
