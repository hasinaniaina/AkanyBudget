import { DEFAULT_MONTHS_FR } from "@/constants/month";
import { FieldsColors, FontSizes } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MonthYearPickerProps {
  periodConcerne: string;
  setPeriodConcerne: (value: string) => void;
  localeMonths?: string[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function MonthYearPicker({
  periodConcerne,
  setPeriodConcerne,
  localeMonths = DEFAULT_MONTHS_FR,
  isOpen,
  setIsOpen,
}: MonthYearPickerProps) {
  const periodSplited = periodConcerne.split(" ");
  const periodYear = Number(periodSplited[1]);
  const periodMonth = DEFAULT_MONTHS_FR.indexOf(periodSplited[0]);

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
    <View style={[isOpen ? styles.card : { display: "none" }]}>
      {/* En-tête : < Année > */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handlePrevYear}
          style={styles.arrowButton}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.yearText}>{year}</Text>

        <TouchableOpacity
          onPress={handleNextYear}
          style={styles.arrowButton}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.arrowText}>{">"}</Text>
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
            >
              <Text
                style={[
                  styles.monthText,
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
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  arrowButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  arrowText: {
    fontSize: 20,
    color: FieldsColors.green,
    fontWeight: "400",
  },
  yearText: {
    fontSize: FontSizes.small,
    color: "#6B7280",
    fontWeight: "400",
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
    color: "#6B7280",
    fontWeight: "400",
  },
  monthTextSelected: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
