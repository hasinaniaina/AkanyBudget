import { FieldsColors as COLORS, FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ParameterOption {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const PARAMETERS_OPTIONS: ParameterOption[] = [
  {
    id: "1",
    title: "Notifications",
    subtitle: "Alertes et rappels",
    icon: "notifications-outline",
  },
  {
    id: "2",
    title: "Hors ligne",
    subtitle: "Données accessibles sans Internet",
    icon: "cloud-offline-outline",
  },
  {
    id: "3",
    title: "Sécurité",
    subtitle: "Code d'accès et biométrie",
    icon: "shield-outline",
  },
  {
    id: "4",
    title: "Sauvegarde",
    subtitle: "Synchronisation et sauvegarde",
    icon: "cloud-upload-outline",
  },
  {
    id: "5",
    title: "À propos",
    subtitle: "Version et mentions légales",
    icon: "information-circle-outline",
  },
];

export default function ParametresScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* En-tête avec bouton retour et titre */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#0A5C36" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={{ width: 38 }} />
        {/* Élément vide pour centrer le titre */}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Liste des options de paramètres */}
        <View style={styles.optionsList}>
          {PARAMETERS_OPTIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionItem}
              activeOpacity={0.7}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name={item.icon} size={20} color="#0A5C36" />
              </View>

              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>{item.title}</Text>
                <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
              </View>

              <Ionicons name="chevron-forward" size={16} color="#719082" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    marginLeft: 20,
    color: "#0A5C36",
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E6F2EC",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  optionsList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E2ECE6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F5F2",
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: COLORS.lightGreen,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  optionInfo: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
  },
  optionSubtitle: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
  },
});
