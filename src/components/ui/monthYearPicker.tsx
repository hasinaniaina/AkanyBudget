import { DEFAULT_MONTHS_FR } from "@/constants/month";
import { FieldsColors, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MonthYearPickerProps {
  periodConcerne: string;
  setPeriodConcerne: (value: string) => void;
  localeMonths?: string[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isBudgetListView?: boolean;
}

export default function MonthYearPicker({
  periodConcerne,
  setPeriodConcerne,
  localeMonths = DEFAULT_MONTHS_FR,
  isOpen,
  setIsOpen,
  isBudgetListView = false,
}: MonthYearPickerProps) {
  const periodSplited = periodConcerne.split(" ");
  const periodYear = Number(periodSplited[1]);
  const periodMonth = DEFAULT_MONTHS_FR.indexOf(periodSplited[0]);

  const currentMonthIndexInArray = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState<number>(periodYear);
  const [selectedYear, setSelectedYear] = useState<number>(periodYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(periodMonth);

  const handlePrevYear = () => {
    setYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    setYear((prev) => prev + 1);
  };

  const handleSelectMonth = (monthIndex: number) => {
    setSelectedYear(year);
    setSelectedMonth(monthIndex);
    const month = DEFAULT_MONTHS_FR[monthIndex];
    setPeriodConcerne(month + " " + year);
    setIsOpen(false);
  };

  return (
    <View
      style={[
        isOpen
          ? !isBudgetListView
            ? styles.card
            : styles.budgetList
          : { display: "none" },
      ]}
    >
      {/* En-tête : < Année > */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handlePrevYear}
          style={styles.arrowButton}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="arrow-back-circle"
            style={[
              year - 1 >= Number(currentYear)
                ? styles.arrowText
                : { display: "none" },
            ]}
          />
        </TouchableOpacity>

        <Text style={styles.yearText}>{year}</Text>

        <TouchableOpacity
          onPress={handleNextYear}
          style={styles.arrowButton}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-forward-circle" style={styles.arrowText} />
        </TouchableOpacity>
      </View>

      {/* Grille 3 colonnes des 12 mois */}
      <View style={styles.grid}>
        {localeMonths.map((label, index) => {
          const isSelected = selectedMonth === index && selectedYear === year;

          return (
            <TouchableOpacity
              key={`${label}-${index}`}
              style={[styles.monthCell, isSelected && styles.monthCellSelected]}
              onPress={() => handleSelectMonth(index)}
              activeOpacity={0.75}
              disabled={
                year <= currentYear && index < Number(currentMonthIndexInArray)
                  ? true
                  : false
              }
            >
              <Text
                style={[
                  styles.monthText,
                  year <= currentYear &&
                  index < Number(currentMonthIndexInArray)
                    ? styles.monthTextDisabled
                    : styles.monthTextActive,
                  isSelected && styles.monthTextSelected,
                ]}
              >
                {label.length > 4 ? label.substring(0, 3) : label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  budgetList: {
    backgroundColor: "#ffffffff",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    position: "absolute",
    top: 67,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#e9e9e9ff",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    position: "absolute",
    top: -200,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginBottom: 14,
  },
  arrowButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  arrowText: {
    fontSize: 20,
    color: FieldsColors.green,
    fontWeight: "bold",
  },
  yearText: {
    fontSize: FontSizes.small,
    color: FieldsColors.text,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  monthCell: {
    width: "33.3333%", // 3 colonnes exactes
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  monthCellSelected: {
    backgroundColor: FieldsColors.green, // Gris foncé proche de la capture
  },
  monthText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
  },
  monthTextDisabled: {
    color: "#dbdbdbff",
  },
  monthTextActive: {
    color: "#6B7280",
  },
  monthTextSelected: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
