import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Budget } from "@/models/budget";
import { FlashList } from "@shopify/flash-list";

interface IconOption {
  id: string;
  name: keyof typeof Ionicons.glyphMap;
}

const ICONS_LIST: IconOption[] = [
  { id: "1", name: "cart" },
  { id: "2", name: "fast-food" },
  { id: "3", name: "restaurant" },
  { id: "4", name: "home" },
  { id: "5", name: "car" },
  { id: "6", name: "bus" },
  { id: "7", name: "airplane" },
  { id: "8", name: "flash" },
  { id: "9", name: "water" },
  { id: "10", name: "wifi" },
  { id: "11", name: "phone-portrait" },
  { id: "12", name: "medkit" },
  { id: "13", name: "fitness" },
  { id: "14", name: "school" },
  { id: "15", name: "book" },
  { id: "16", name: "shirt" },
  { id: "17", name: "bag-handle" },
  { id: "18", name: "gift" },
  { id: "19", name: "game-controller" },
  { id: "20", name: "film" },
  { id: "21", name: "musical-notes" },
  { id: "22", name: "beer" },
  { id: "23", name: "cafe" },
  { id: "24", name: "construct" },
  { id: "25", name: "hammer" },
  { id: "26", name: "key" },
  { id: "27", name: "receipt" },
  { id: "28", name: "card" },
  { id: "29", name: "cash" },
  { id: "30", name: "wallet" },
  { id: "31", name: "tv" },
  { id: "32", name: "laptop" },
  { id: "33", name: "hardware-chip" },
  { id: "34", name: "print" },
  { id: "35", name: "bed" },
  { id: "36", name: "keypad" },
  { id: "37", name: "paw" },
  { id: "38", name: "rose" },
  { id: "39", name: "heart" },
  { id: "40", name: "bandage" },
  { id: "41", name: "thermometer" },
  { id: "42", name: "eyedrop" },
  { id: "43", name: "flask" },
  { id: "44", name: "bicycle" },
  { id: "45", name: "boat" },
  { id: "46", name: "train" },
  { id: "47", name: "subway" },
  { id: "48", name: "earth" },
  { id: "49", name: "map" },
  { id: "50", name: "navigate" },
  { id: "51", name: "compass" },
  { id: "52", name: "brush" },
  { id: "53", name: "color-palette" },
  { id: "54", name: "images" },
  { id: "55", name: "camera" },
  { id: "56", name: "mic" },
  { id: "57", name: "headset" },
  { id: "58", name: "volume-high" },
  { id: "59", name: "radio" },
  { id: "60", name: "calculator" },
  { id: "61", name: "document-text" },
  { id: "62", name: "folder-open" },
  { id: "63", name: "briefcase" },
  { id: "64", name: "calendar" },
  { id: "65", name: "time" },
  { id: "66", name: "alarm" },
  { id: "67", name: "infinite" },
  { id: "68", name: "repeat" },
  { id: "69", name: "shield" },
  { id: "70", name: "lock-closed" },
  { id: "71", name: "key" },
  { id: "72", name: "bonfire" },
  { id: "73", name: "sunny" },
  { id: "74", name: "snow" },
  { id: "75", name: "umbrella" },
  { id: "76", name: "construct" },
];

export default function ListIcon({
  isOpen,
  setIsOpen,
  budget,
  setSelectedIcon,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  budget: Budget;
  setSelectedIcon: (value: Budget) => void;
}) {
  // Fonction de rendu d'un élément individuel
  const renderItem = ({ item }: { item: IconOption }) => {
    const isSelected = budget.icon === item.name;

    return (
      <TouchableOpacity
        style={[styles.iconCard, isSelected && styles.selectedIconCard]}
        onPress={() => {
          setSelectedIcon({ ...budget, icon: item.name });
        }}
        activeOpacity={0.8}
      >
        <Ionicons
          name={item.name}
          size={15}
          color={isSelected ? "#0A7B3E" : "#719082"}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={[!isOpen ? { display: "none" } : styles.container]}>
      {/* 5. SÉLECTION DE L'ICÔNE */}
      <View style={styles.header}>
        <Text style={styles.label}>Icône</Text>
        <TouchableOpacity onPress={() => setIsOpen(false)}>
          <Ionicons name="checkmark" size={20} color={FieldsColors.green} />
        </TouchableOpacity>
      </View>
      <View style={styles.listIconContainer}>
        <FlashList
          data={ICONS_LIST}
          renderItem={renderItem}
          // Clé unique obligatoire pour chaque élément
          keyExtractor={(item) => item.id}
          // Nombre de colonnes pour transformer la liste en grille
          numColumns={6}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    zIndex: 3,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: FieldsColors.green,
    borderRadius: 20,
    top: 0,
    left: 70,
  },
  listIconContainer: {
    height: 200,
    width: Dimensions.get("window").width - 90,
  },
  scrollViewStyle: {
    flex: 1, // Permet au ScrollView de s'étirer correctement dans sa limite de maxHeight
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: FieldsColors.green,
  },
  label: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: FieldsColors.green,
    marginBottom: 6,
  },

  /* Grille d'icônes */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
    marginBottom: 16,
  },
  iconCard: {
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",

    marginVertical: 10,
  },
  selectedIconCard: {
    borderColor: "#0A7B3E",
    borderWidth: 2,
    backgroundColor: "#E6F4EC",
  },
});
