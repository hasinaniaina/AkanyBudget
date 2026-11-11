import { FieldsColors, FontSizes } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function SectionHeader({
  title,
  action = "Voir détail",
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.linkText}>{action}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: FontSizes.small,
    fontWeight: "800",
    color: FieldsColors.text,
  },

  linkText: {
    color: FieldsColors.blue,
    fontSize: FontSizes.small,
    fontWeight: "600",
  },
});
