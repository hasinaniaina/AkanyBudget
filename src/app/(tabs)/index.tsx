import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FieldsColors as COLORS, FontSizes } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type AccountProps = {
  icon: IconName;
  title: string;
  subtitle: string;
  amount: string;
  color: string;
};

function AccountCard({ icon, title, subtitle, amount, color }: AccountProps) {
  return (
    <View style={styles.accountRow}>
      <View style={[styles.accountIcon, { backgroundColor: color + "22" }]}>
        <Ionicons name={icon} size={21} color={color} />
      </View>

      <View style={styles.accountInfo}>
        <Text style={styles.accountTitle}>{title}</Text>
        <Text style={styles.smallText}>{subtitle}</Text>
      </View>

      <Text style={styles.accountAmount}>{amount}</Text>
    </View>
  );
}

function SectionHeader({
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

function ProgressBar({
  progress,
  color = COLORS.green,
}: {
  progress: number;
  color?: string;
}) {
  return (
    <View style={styles.progressBackground}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const projects = [
  {
    id: "1",
    title: "Vacances",
    details: "300 000 / 1 000 000 Ar",
    progress: 30,
    icon: "sunny-outline" as IconName,
    color: "#E7F4FF",
  },
  {
    id: "2",
    title: "Finition de la maison",
    details: "200 000 / 800 000 Ar",
    progress: 25,
    icon: "home-outline" as IconName,
    color: "#F7E9D8",
  },
];

const navigation: {
  label: string;
  icon: IconName;
}[] = [
  { label: "Accueil", icon: "home" },
  { label: "Opérations", icon: "swap-horizontal-outline" },
  { label: "Budgets", icon: "pie-chart-outline" },
  { label: "Projets", icon: "wallet-outline" },
  { label: "Plus", icon: "ellipsis-horizontal" },
];

export default function App() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [showBalance, setShowBalance] = useState(true);

  const money = (amount: string) => (showBalance ? amount : "•••••• Ar");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* En-tête */}
          <View style={styles.topHeader}>
            <View style={styles.brand}>
              <View style={styles.logo}>
                <Image
                  source={require("@/assets/images/logo.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>

              <View>
                <Text style={styles.brandName}>AkanyBudget</Text>
                <Text style={styles.brandSubtitle}>Ton argent, bien géré</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => {}}
            >
              <Ionicons
                name="notifications-outline"
                size={23}
                color={COLORS.text}
              />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          {/* Sélecteur d'année */}
          <TouchableOpacity
            style={styles.yearSelector}
            onPress={() =>
              setSelectedYear((year) => (year >= 2026 ? 2024 : year + 1))
            }
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={18} color={COLORS.green} />
            <Text style={styles.yearText}>Année {selectedYear}</Text>
            <Ionicons name="chevron-down" size={15} color={COLORS.secondary} />
          </TouchableOpacity>

          {/* Solde total */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceTop}>
              <View style={styles.balanceIcon}>
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={22}
                  color={COLORS.green}
                />
              </View>

              <View style={styles.balanceLabels}>
                <Text style={styles.balanceLabel}>Total disponible</Text>
              </View>

              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                <Ionicons
                  name={showBalance ? "eye-outline" : "eye-off-outline"}
                  size={21}
                  color="#D5F3E8"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.balanceAmount}>
              {money("2 850 000")}
              {showBalance ? " Ar" : ""}
            </Text>

            <Text style={styles.balanceSubtitle}>
              Espèces • Banque (Total) • Mobile Money
            </Text>
          </View>

          {/* Mes comptes */}
          <View style={styles.card}>
            <SectionHeader title="Mes comptes" />

            <AccountCard
              icon="cash-outline"
              title="Espèces"
              subtitle="Argent en main"
              amount={money("450 000") + (showBalance ? " Ar" : "")}
              color="#15976D"
            />

            <View style={styles.accountDivider} />

            <View style={styles.accountRow}>
              <View
                style={[styles.accountIcon, { backgroundColor: "#E1EEFF" }]}
              >
                <Ionicons
                  name="business-outline"
                  size={21}
                  color={COLORS.blue}
                />
              </View>

              <View style={styles.accountInfo}>
                <Text style={styles.accountTitle}>Banque – total</Text>
                <Text style={styles.smallText}>Dont épargne</Text>
                <Text style={styles.smallText}>Reste bancaire</Text>
              </View>

              <View style={styles.amountColumn}>
                <Text style={styles.accountAmount}>
                  {money("2 000 000")}
                  {showBalance ? " Ar" : ""}
                </Text>
                <Text style={styles.subAmount}>
                  {money("1 500 000")}
                  {showBalance ? " Ar" : ""}
                </Text>
                <Text style={styles.subAmount}>
                  {money("500 000")}
                  {showBalance ? " Ar" : ""}
                </Text>
              </View>
            </View>

            <View style={styles.accountDivider} />

            <AccountCard
              icon="phone-portrait-outline"
              title="Mobile Money"
              subtitle="Soldes des comptes configurés"
              amount={money("400 000") + (showBalance ? " Ar" : "")}
              color="#D94DCE"
            />
          </View>

          {/* Épargne et projets */}
          <View style={styles.card}>
            <SectionHeader title="Épargne & projets" />

            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Épargne totale</Text>
              <Text style={styles.metricValue}>
                {money("2 000 000")}
                {showBalance ? " Ar" : ""}
              </Text>
            </View>

            <View style={styles.thinDivider} />

            <View style={styles.metricRow}>
              <Text style={styles.mutedMetric}>Nouvelle épargne ce mois</Text>
              <Text style={styles.metricValue}>
                {money("500 000")}
                {showBalance ? " Ar" : ""}
              </Text>
            </View>
          </View>

          {/* Mes projets */}
          <View style={styles.card}>
            <SectionHeader title="Mes projets" action="Voir tout" />

            {projects.map((project, index) => (
              <TouchableOpacity
                key={project.id}
                style={[styles.projectRow, index > 0 && styles.projectSpacing]}
                activeOpacity={0.8}
                onPress={() => {}}
              >
                <View
                  style={[
                    styles.projectImage,
                    { backgroundColor: project.color },
                  ]}
                >
                  <Ionicons
                    name={project.icon}
                    size={30}
                    color={COLORS.green}
                  />
                </View>

                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>{project.title}</Text>

                  <View style={styles.projectDetailsRow}>
                    <Text style={styles.projectDetails}>
                      {showBalance ? project.details : "••••••••••"}
                    </Text>
                    <Text style={styles.projectPercentage}>
                      {project.progress}%
                    </Text>
                  </View>

                  <ProgressBar progress={project.progress} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.footerText}>
            MonBudget • Gérez mieux votre argent
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },

  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  logo: {
    width: 39,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  brandName: {
    color: COLORS.green,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.4,
  },

  brandSubtitle: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 2,
  },

  notificationButton: {
    width: 37,
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F04452",
    borderWidth: 1,
    borderColor: COLORS.background,
  },

  yearSelector: {
    height: 39,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
    marginBottom: 12,
  },

  yearText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },

  balanceCard: {
    backgroundColor: COLORS.green,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 10,
    overflow: "hidden",
  },

  balanceTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  balanceIcon: {
    width: 31,
    height: 31,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  balanceLabels: {
    flex: 1,
  },

  balanceLabel: {
    color: "#E0F4EC",
    fontSize: 12,
    fontWeight: "500",
  },

  balanceAmount: {
    color: COLORS.white,
    fontSize: FontSizes.large,
    fontWeight: "800",
    letterSpacing: 0.1,
    marginTop: 5,
  },

  balanceSubtitle: {
    color: "#D1EDE2",
    fontSize: 9,
    marginTop: 3,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEF3F1",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: FontSizes.small,
    fontWeight: "800",
    color: COLORS.text,
  },

  linkText: {
    color: COLORS.blue,
    fontSize: FontSizes.small,
    fontWeight: "600",
  },

  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 43,
    gap: 9,
  },

  accountIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  accountInfo: {
    flex: 1,
    justifyContent: "center",
  },

  accountTitle: {
    color: COLORS.text,
    fontSize: FontSizes.small,
    fontWeight: "700",
    marginBottom: 3,
  },

  smallText: {
    color: COLORS.secondary,
    fontSize: FontSizes.xsmall,
    marginTop: 1,
  },

  accountAmount: {
    color: "#214B91",
    fontSize: FontSizes.small,
    fontWeight: "800",
    textAlign: "right",
    flexShrink: 0,
  },

  amountColumn: {
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 5,
  },

  subAmount: {
    color: "#4778B8",
    fontSize: FontSizes.xsmall,
    fontWeight: "600",
  },

  accountDivider: {
    height: 1,
    backgroundColor: "#EDF2F0",
    marginVertical: 8,
    marginLeft: 40,
  },

  metricRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingVertical: 2,
  },

  metricLabel: {
    color: COLORS.green,
    fontSize: FontSizes.xsmall,
    fontWeight: "600",
  },

  metricValue: {
    color: "#214B91",
    fontSize: 10,
    fontWeight: "800",
  },

  mutedMetric: {
    color: COLORS.secondary,
    fontSize: 9,
  },

  thinDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 9,
  },

  projectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  projectSpacing: {
    marginTop: 13,
  },

  projectImage: {
    width: 43,
    height: 43,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  projectContent: {
    flex: 1,
    gap: 5,
  },

  projectTitle: {
    color: COLORS.text,
    fontSize: FontSizes.small,
    fontWeight: "700",
  },

  projectDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },

  projectDetails: {
    color: COLORS.secondary,
    fontSize: FontSizes.xsmall,
    flexShrink: 1,
  },

  projectPercentage: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: "700",
  },

  progressBackground: {
    height: 5,
    borderRadius: 5,
    backgroundColor: "#EAF0EE",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 5,
  },

  footerText: {
    textAlign: "center",
    color: "#91A69F",
    fontSize: 9,
    paddingVertical: 8,
  },
});
