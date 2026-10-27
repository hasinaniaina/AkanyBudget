import { FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Type pour les activités
interface ActivityItem {
  id: string;
  title: string;
  revenue: string;
  expenses: string;
  image: any;
}

const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: "1",
    title: "Activité principale",
    revenue: "3 200 000 Ar",
    expenses: "1 850 000 Ar",
    image: require("@/assets/images/landscape.jpeg"), // Remplacez par le chemin de votre image
  },
  {
    id: "2",
    title: "Vente de produits",
    revenue: "750 000 Ar",
    expenses: "320 000 Ar",
    image: require("@/assets/images/landscape.jpeg"), // Remplacez par le chemin de votre image
  },
  {
    id: "3",
    title: "Petite boutique",
    revenue: "400 000 Ar",
    expenses: "210 000 Ar",
    image: require("@/assets/images/landscape.jpeg"), // Remplacez par le chemin de votre image
  },
];

export default function ActivitiesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Récupère les marges de sécurité de l'appareil
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={22} color="#0A5C36" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Activités</Text>
          <View></View>
        </View>

        {/* Sélecteur de filtre déroulant */}
        <TouchableOpacity style={styles.filterDropdown}>
          <Text style={styles.filterText}>Toutes les activités</Text>
          <Ionicons name="chevron-down" size={16} color="#0A5C36" />
        </TouchableOpacity>

        {/* Liste des cartes d'activités */}
        <View style={styles.listContainer}>
          {ACTIVITIES_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.activityCard}
              activeOpacity={0.8}
            >
              <Image source={item.image} style={styles.activityImage} />

              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityText}>
                  Revenus :{" "}
                  <Text style={styles.revenueText}>{item.revenue}</Text>
                </Text>
                <Text style={styles.activityText}>
                  Dépenses :{" "}
                  <Text style={styles.expenseText}>{item.expenses}</Text>
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#719082" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bouton d'action en bas "Nouvelle activité" */}
      <View
        style={[
          styles.footerContainer,
          { bottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <TouchableOpacity style={styles.newActivityButton} activeOpacity={0.85}>
          <LinearGradient
            colors={["#10A976", "#07815D"]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons
              name="add"
              size={20}
              color="#FFFFFF"
              style={styles.addIcon}
            />
            <Text style={styles.newActivityButtonText}>Nouvelle activité</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9F6",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 100, // Espace pour ne pas être masqué par le bouton du bas
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
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

  filterDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4E8DE",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 20,
  },
  filterText: {
    fontSize: FontSizes.small,
    fontWeight: "500",
    color: "#0A5C36",
  },
  listContainer: {
    gap: 14,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2ECE6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityImage: {
    width: 60,
    height: 60,
    borderRadius: 14,
    marginRight: 14,
    resizeMode: "cover",
  },
  activityInfo: {
    flex: 1,
    gap: 3,
  },
  activityTitle: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#1A332B",
    marginBottom: 2,
  },
  activityText: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
  },
  revenueText: {
    fontWeight: "600",
    color: "#10A976",
  },
  expenseText: {
    fontWeight: "600",
    color: "#E53935",
  },
  footerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#F3F9F6", // Assure un fond propre si l'utilisateur scrolle au fond
  },
  newActivityButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#10A976",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  gradientButton: {
    flexDirection: "row",
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  addIcon: {
    marginRight: 8,
  },
  newActivityButtonText: {
    color: "#FFFFFF",
    fontSize: FontSizes.small,
    fontWeight: "bold",
  },
});
