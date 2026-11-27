import { FieldsColors, FontSizes } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface ExpenseSummaryCardProps {
  spentAmount?: number;
  budgetAmount?: number;
  percentage?: number;
  currency?: string;
}

const formatAriary = (value: number, currency = "Ar"): string => {
  const formatted = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} ${currency}`;
};

export default function BudgetSumary({
  spentAmount = 980000,
  budgetAmount = 1500000,
  percentage = 65,
  currency = "Ar",
}: ExpenseSummaryCardProps) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Paramètres de l'anneau circulaire (76x76)
  const size = 76;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (clampedPercentage / 100) * circumference;

  return (
    <View style={styles.card}>
      {/* Icône portefeuille à gauche */}
      <View style={styles.iconBadge}>
        <MaterialCommunityIcons
          name="wallet-outline"
          size={24}
          color="#1E8449"
        />
      </View>

      {/* Textes et montants au centre */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Total des dépenses</Text>
        <Text style={styles.spentText} numberOfLines={1} adjustsFontSizeToFit>
          {formatAriary(spentAmount, currency)}
        </Text>
        <Text style={styles.budgetText}>
          sur {formatAriary(budgetAmount, currency)}
        </Text>
      </View>

      {/* Anneau de progression à droite */}
      <View style={styles.ringContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Cercle de fond vert pâle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E8F4EC"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Arc de progression vert foncé */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#157347"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation={-90}
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <Text style={styles.percentageText}>{clampedPercentage}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#F0F3F1",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EAF5EE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 12,
  },
  label: {
    fontSize: FontSizes.small,
    color: "#6C757D",
    fontWeight: "500",
    marginBottom: 4,
  },
  spentText: {
    fontSize: FontSizes.medium,
    fontWeight: "800",
    color: FieldsColors.green,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  budgetText: {
    fontSize: FontSizes.small,
    color: "#8C96A0",
    fontWeight: "400",
  },
  ringContainer: {
    width: 76,
    height: 76,
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    position: "absolute",
  },
  percentageText: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: FieldsColors.text,
  },
});
