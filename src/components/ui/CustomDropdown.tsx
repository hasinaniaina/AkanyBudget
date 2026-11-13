import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface isOpenInterface {
  categorie: boolean;
  compte: boolean;
}

interface CustomDropdownProps {
  options?: string[];
  isOpen: boolean;
  setIsOpen: () => void;
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function CustomDropdown({
  options = ["Item 1", "Item 2", "Item 3"],
  isOpen,
  setIsOpen,
  selectedValue,
  onSelect,
}: CustomDropdownProps) {
  const handleSelect = (item: string) => {
    onSelect(item);
    setIsOpen(); // Ferme le dropdown après la sélection
  };

  return (
    <View style={styles.container}>
      {/* 2. La liste du dropdown qui s'affiche conditionnellement */}
      {isOpen && (
        <View style={styles.dropdownListContainer}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {options.map((item, index) => {
              const isSelected = selectedValue === item;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    isSelected && styles.selectedDropdownItem,
                  ]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      isSelected && styles.selectedDropdownItemText,
                    ]}
                  >
                    {item}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={16} color="#0A5C36" />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative", // Nécessaire pour positionner la liste par rapport à ce conteneur
    zIndex: 100, // S'assure que le dropdown passe au-dessus des autres éléments
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
    fontSize: 14,
    fontWeight: "600",
    color: "#1A332B",
  },
  placeholderText: {
    color: "#A0AAB2",
    fontWeight: "500",
  },
  dropdownListContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  selectedDropdownItem: {
    backgroundColor: "#F0F5F2",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "500",
  },
  selectedDropdownItemText: {
    color: "#0A5C36",
    fontWeight: "700",
  },
});
