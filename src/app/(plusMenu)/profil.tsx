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

interface ProfileOption {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  value?: string;
}

const PROFILE_OPTIONS: ProfileOption[] = [
  { id: "1", title: "Mes informations", icon: "person-outline" },
  { id: "2", title: "Changer de mot de passe", icon: "lock-closed-outline" },
  { id: "3", title: "Préférences", icon: "settings-outline" },
  { id: "4", title: "Langue", icon: "globe-outline", value: "Français" },
  { id: "5", title: "Devise", icon: "cash-outline", value: "Ariary (Ar)" },
];

export default function ProfilScreen() {
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
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={{ width: 38 }} />
        {/* Élément vide pour centrer le titre */}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête du profil (Avatar + Nom + Email) */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>AkanyBudget</Text>
            <Text style={styles.profileRole}>Compte personnel</Text>
            <Text style={styles.profileEmail}>maronela@email.com</Text>
          </View>
        </View>

        {/* Liste des options du profil */}
        <View style={styles.optionsList}>
          {PROFILE_OPTIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionItem}
              activeOpacity={0.7}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name={item.icon} size={20} color="#0A5C36" />
              </View>

              <Text style={styles.optionTitle}>{item.title}</Text>

              <View style={styles.optionRight}>
                {item.value && (
                  <Text style={styles.optionValue}>{item.value}</Text>
                )}
                <Ionicons name="chevron-forward" size={16} color="#719082" />
              </View>
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
    color: "#0A5C36",
    marginLeft: 20,
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
  profileHeaderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2ECE6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: COLORS.green,
  },
  profileRole: {
    fontSize: FontSizes.small,
    color: "#719082",
  },
  profileEmail: {
    fontSize: FontSizes.small,
    color: "#10A976",
    fontWeight: "500",
    marginTop: 2,
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
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E6F2EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  optionTitle: {
    flex: 1,
    fontSize: FontSizes.small,
    fontWeight: "500",
    color: "#1A332B",
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionValue: {
    fontSize: FontSizes.small,
    color: "#719082",
  },
});
