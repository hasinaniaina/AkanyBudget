import { FieldsColors, FontSizes } from "@/constants/theme";
import { User } from "@/models/user";
import { updatePasswordByEmail } from "@/services/user";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function ChangePasswordScreen() {
  const { userParams } = useLocalSearchParams();
  const user: User = JSON.parse(userParams as string);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validation dynamique (basique pour l'UI)
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  const handleValidation = () => {
    if (!hasMinLength || !hasUpperCase || !hasNumber) {
      Toast.show({
        type: "error",
        text1: "Mots de passe invalide.",
        text2:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
      });
      return;
    }

    if (newPassword != confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Mots de passe invalide.",
        text2:
          "Le nouveau mot de passe et la confirmation du nouveau mot de passe ne correspondent pas",
      });
      return;
    }
    const passwordChanged = updatePasswordByEmail(user.email, newPassword);

    if (passwordChanged) {
      Toast.show({
        type: "success",
        text1: "Mot de passe modifier.",
        text2:
          "Le mot de passe a été bien modifier. Veuillez revenir à la page d'authentification.",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Mot de passe non modifier",
        text2:
          "Il y a une erreur lors du changement du mot de passe. Veuillez recommencer.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* En-tête : Bouton Retour et Titre */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Changer de mot de passe</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            Veuillez saisir votre mot de passe actuel, puis votre nouveau mot de
            passe et le confirmer.
          </Text>

          {/* Carte blanche contenant les champs */}
          <View style={styles.card}>
            {/* Champ : Nouveau mot de passe */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nouveau mot de passe</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={!showNew}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#A3B8B0"
                />
                <View style={styles.iconRightContainer}>
                  {newPassword.length > 0 && (
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#10A976"
                      style={styles.validIcon}
                    />
                  )}
                  <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                    <Ionicons
                      name={showNew ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#719082"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Critères de sécurité */}
              <View style={styles.criteriaContainer}>
                <View style={styles.criterionRow}>
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={hasMinLength ? "#10A976" : "#719082"}
                  />
                  <Text
                    style={[
                      styles.criterionText,
                      hasMinLength && styles.criterionMet,
                    ]}
                  >
                    Minimum 8 caractères
                  </Text>
                </View>
                <View style={styles.criterionRow}>
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={hasUpperCase ? "#10A976" : "#719082"}
                  />
                  <Text
                    style={[
                      styles.criterionText,
                      hasUpperCase && styles.criterionMet,
                    ]}
                  >
                    Inclure une majuscule
                  </Text>
                </View>
                <View style={styles.criterionRow}>
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={hasNumber ? "#10A976" : "#719082"}
                  />
                  <Text
                    style={[
                      styles.criterionText,
                      hasNumber && styles.criterionMet,
                    ]}
                  >
                    Inclure un chiffre
                  </Text>
                </View>
              </View>
            </View>

            {/* Champ : Confirmer le nouveau mot de passe */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Confirmer le nouveau mot de passe
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={!showConfirm}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#A3B8B0"
                />
                <View style={styles.iconRightContainer}>
                  {confirmPassword.length > 0 &&
                    confirmPassword === newPassword && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#10A976"
                        style={styles.validIcon}
                      />
                    )}
                  <TouchableOpacity
                    onPress={() => setShowConfirm(!showConfirm)}
                  >
                    <Ionicons
                      name={showConfirm ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#719082"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Bouton de validation principal */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleValidation}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Valider le changement</Text>
          </TouchableOpacity>

          {/* Lien de retour secondaire */}
          <TouchableOpacity
            style={styles.footerLinkContainer}
            activeOpacity={0.7}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.footerLinkText}>
              <Text style={styles.backArrow}>&lt; </Text>Retour à la connexion
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F9F6", // Fond vert très clair cohérent avec le thème AkanyBudget
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  headerTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: FieldsColors.green,
  },
  description: {
    fontSize: FontSizes.small,
    color: "#557065",
    lineHeight: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#1A332B",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF4F0", // Vert d'eau très clair pour les champs
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D2E8DF",
    paddingHorizontal: 14,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.small,
    color: "#1A332B",
  },
  iconRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  validIcon: {
    marginRight: 10,
  },
  criteriaContainer: {
    marginTop: 8,
    paddingLeft: 4,
  },
  criterionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  criterionText: {
    fontSize: FontSizes.xsmall,
    color: "#719082",
    marginLeft: 6,
  },
  criterionMet: {
    color: "#10A976",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: FieldsColors.green, // Vert principal AkanyBudget
    borderRadius: 14,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: FieldsColors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: FontSizes.small,
    fontWeight: "bold",
  },
  footerLinkContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerLinkText: {
    color: FieldsColors.green,
    fontSize: FontSizes.small,
    fontWeight: "600",
  },
  backArrow: {
    fontWeight: "bold",
  },
});
