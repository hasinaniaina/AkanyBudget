import { FontSizes } from "@/constants/theme";
import { getAllUsers } from "@/services/user";
import { getVerificationCode, sendEmailInBackground } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");

  const handleResetPassword = () => {
    const users = getAllUsers();
    let emailFound = false;
    users.map((user) => {
      if (user.email == identifier) {
        const code = getVerificationCode();
        sendEmailInBackground({ email: user.email, code: code });

        emailFound = true;

        router.push({
          pathname: "/(auth)/verification",
          params: { userParams: JSON.stringify(user), view: "forgetPassword" },
        });
      }
    });

    if (!emailFound) {
      Toast.show({
        type: "error",
        text1: "Email invalide",
        text2: "L'email n'est pas répertorié.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* En-tête : Titre et description */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Mot de passe oublié</Text>
            <Text style={styles.subtitle}>
              Veuillez saisir votre adresse e-mail ou votre numéro de téléphone
              pour réinitialiser votre mot de passe.
            </Text>
          </View>

          {/* Formulaire de saisie */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#0A5C36"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="E-mail ou téléphone"
                placeholderTextColor="#86B5AA"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Bouton d'envoi avec dégradé */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleResetPassword}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#10A976", "#07815D"]}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.submitButtonText}>Réinitialiser</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Lien de retour à la connexion */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>
                <Text style={styles.backArrow}>‹ </Text> Retour à la connexion
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F9F6",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    paddingVertical: 40,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: "#0A5C36",
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: FontSizes.small,
    color: "#557A68",
    lineHeight: 20,
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4E8DE",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.small,
    color: "#1A332B",
  },
  submitButton: {
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#10A976",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 4,
  },
  gradientButton: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: FontSizes.small,
    fontWeight: "bold",
  },
  backButton: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#0A5C36",
  },
  backArrow: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
