import { FontSizes } from "@/constants/theme";
import { formatAmount } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BudgetCategoryCardProps {
  id?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  title?: string;
  spentAmount?: number;
  budgetAmount?: number;
  percentage?: number;
  currency?: string;
  accentColor?: string;
  onPress?: () => void;
}

export default function ListBudget({
  id,
  icon,
  title = "Alimentation",
  spentAmount = 320000,
  budgetAmount = 400000,
  percentage = 80,
  currency = "Ar",
  accentColor = "#177A4A",
  onPress,
}: BudgetCategoryCardProps) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={onPress}
      key={id}
    >
      {/* Icône ronde à gauche */}
      <View style={[styles.iconCircle, { backgroundColor: accentColor }]}>
        <Ionicons name={icon} size={12} color="#FFFFFF" />
      </View>

      {/* Titre et montants au centre */}
      <View style={styles.centerColumn}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.amountsText} numberOfLines={1} adjustsFontSizeToFit>
          {formatAmount(spentAmount, currency)} /
          {formatAmount(budgetAmount, currency)}
        </Text>
      </View>

      {/* Pourcentage et barre de progression à droite */}
      <View style={styles.rightColumn}>
        <Text style={styles.percentageText}>{clampedPercentage}%</Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${clampedPercentage}%`,
                backgroundColor: accentColor,
              },
            ]}
          />
        </View>
      </View>

      {/* Chevron de navigation */}
      <Ionicons
        name="chevron-forward"
        size={18}
        color="#B0B7C0"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F0F3F1",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  centerColumn: {
    flex: 1,
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#1E252B",
    marginBottom: 4,
  },
  amountsText: {
    fontSize: FontSizes.xsmall,
    fontWeight: "500",
    color: "#7D868E",
  },
  rightColumn: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 78,
  },
  percentageText: {
    fontSize: FontSizes.xsmall,
    fontWeight: "700",
    color: "#1E252B",
    marginBottom: 6,
  },
  progressTrack: {
    width: "100%",
    height: 7,
    borderRadius: 999,
    backgroundColor: "#E6ECE8",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  chevron: {
    marginLeft: 10,
  },
});
