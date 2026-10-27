import { FontSizes } from "@/constants/theme";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Project = {
  id: number;
  title: string;
  amount: number;
  goal: number;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Vacances",
    amount: 300_000,
    goal: 500_000,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Finition de la maison",
    amount: 200_000,
    goal: 500_000,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop",
  },
];

const formatMoney = (amount: number) =>
  `${amount.toLocaleString("fr-FR").replace(/\u202f/g, " ")} Ar`;

function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.progressBackground}>
      <View
        style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]}
      />
    </View>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const progress = Math.round((project.amount / project.goal) * 100);

  return (
    <View style={styles.projectCard}>
      <Image
        source={{ uri: project.image }}
        style={styles.projectImage}
        resizeMode="cover"
      />

      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>{project.title}</Text>

        <Text style={styles.projectAmount}>
          {formatMoney(project.amount)} Ar ({progress}%)
        </Text>

        <View style={styles.projectProgressRow}>
          <View style={styles.projectProgress}>
            <ProgressBar progress={progress} />
          </View>
          <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>
      </View>
    </View>
  );
}

export default function EpargneScreen() {
  const [activeTab, setActiveTab] = useState<"epargne" | "projets">("epargne");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête */}
        <Text style={styles.pageTitle}>Épargne & projets</Text>

        {/* Onglets */}
        <View style={styles.tabsContainer}>
          <Pressable
            onPress={() => setActiveTab("epargne")}
            style={[styles.tab, activeTab === "epargne" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "epargne" && styles.activeTabText,
              ]}
            >
              Épargne
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("projets")}
            style={[styles.tab, activeTab === "projets" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "projets" && styles.activeTabText,
              ]}
            >
              Projets
            </Text>
          </Pressable>
        </View>

        {activeTab === "epargne" ? (
          <>
            {/* Objectif mensuel */}
            <View style={styles.goalCard}>
              <Text style={styles.cardLabel}>Objectif d'épargne mensuel</Text>

              <Text style={styles.goalAmount}>500 000 Ar</Text>

              <View style={styles.statusRow}>
                <Text style={styles.statusIcon}>●</Text>
                <Text style={styles.statusText}>Répartition automatique</Text>
              </View>
            </View>

            {/* Épargne bancaire */}
            <View style={styles.bankCard}>
              <Text style={styles.cardLabel}>Épargne totale à la banque</Text>

              <Text style={styles.bankAmount}>2 000 000 Ar</Text>

              <View style={styles.separator} />

              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Text style={styles.greenDot}>●</Text>
                  <Text style={styles.detailLabel}>Épargne existante</Text>
                </View>

                <Text style={styles.detailAmount}>1 500 000 Ar</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLabelContainer}>
                  <Text style={styles.greenDot}>●</Text>
                  <Text style={styles.detailLabel}>
                    Nouvelle épargne ce mois
                  </Text>
                </View>

                <Text style={styles.detailAmount}>500 000 Ar</Text>
              </View>
            </View>

            {/* Projets */}
            <View style={styles.projectsSection}>
              <Text style={styles.sectionTitle}>Répartition des projets</Text>

              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </View>
          </>
        ) : (
          /* Onglet Projets */
          <View style={styles.projectsSection}>
            <Text style={styles.sectionTitle}>Mes projets</Text>

            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            <Pressable
              style={styles.addButton}
              onPress={() => {
                // TODO : ouvrir le formulaire de création de projet
              }}
            >
              <Text style={styles.addButtonText}>+ Ajouter un projet</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#173C55",
    marginBottom: 14,
  },

  // Onglets
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#EFF4F7",
    borderRadius: 20,
    padding: 3,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 18,
  },
  activeTab: {
    backgroundColor: "#087957",
  },
  tabText: {
    color: "#536A79",
    fontSize: FontSizes.small,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // Cartes
  goalCard: {
    backgroundColor: "#EAF8F0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0F2E7",
  },
  cardLabel: {
    color: "#315C61",
    fontSize: FontSizes.small,
    fontWeight: "500",
    marginBottom: 5,
  },
  goalAmount: {
    color: "#087957",
    fontSize: FontSizes.large,
    fontWeight: "800",
    marginBottom: 7,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusIcon: {
    color: "#15956C",
    fontSize: FontSizes.xsmall,
  },
  statusText: {
    color: "#397663",
    fontSize: FontSizes.xsmall,
  },
  bankCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8EEF1",
  },
  bankAmount: {
    color: "#173C66",
    fontSize: FontSizes.large,
    fontWeight: "800",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#EDF1F3",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
    gap: 8,
  },
  detailLabelContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  greenDot: {
    color: "#15956C",
    fontSize: 8,
  },
  detailLabel: {
    color: "#526A7C",
    fontSize: FontSizes.xsmall,
    flexShrink: 1,
  },
  detailAmount: {
    color: "#284F70",
    fontSize: 10,
    fontWeight: "700",
  },

  // Projets
  projectsSection: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#24465E",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
  },
  projectCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8EEF1",
    padding: 8,
    marginBottom: 9,
    gap: 10,
  },
  projectImage: {
    width: 66,
    height: 66,
    borderRadius: 9,
    backgroundColor: "#E3ECE8",
  },
  projectContent: {
    flex: 1,
    justifyContent: "center",
  },
  projectTitle: {
    color: "#25445A",
    fontSize: FontSizes.small,
    fontWeight: "700",
    marginBottom: 5,
  },
  projectAmount: {
    color: "#526D7D",
    fontSize: FontSizes.xsmall,
    marginBottom: 8,
  },
  projectProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  projectProgress: {
    flex: 1,
  },
  progressBackground: {
    height: 7,
    borderRadius: 10,
    backgroundColor: "#E9F0EF",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#16B783",
  },
  progressPercentage: {
    width: 26,
    color: "#648293",
    fontSize: FontSizes.xsmall,
    textAlign: "right",
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#087957",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: FontSizes.small,
    fontWeight: "700",
  },
});
