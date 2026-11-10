import CountdownTimer from "@/components/auth/verification/countDownTimer";
import { User } from "@/models/user";
import {
  deleteLastVerificationCode,
  getLastVerificationCode,
  insertUser,
} from "@/services/user";
import { generateId } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
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

export default function VerifyEmailScreen() {
  const { userParams, view } = useLocalSearchParams();
  const user: User = JSON.parse(userParams as string);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Passer automatiquement au champ suivant si un chiffre est saisi
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Vérifier si le code est complet (6 chiffres)
    if (newCode.every((digit) => digit !== "")) {
      const enteredCode = newCode.join("");
      const lastCode = getLastVerificationCode();

      if (Number(enteredCode) === Number(lastCode)) {
        deleteLastVerificationCode();

        if (view == "createAccount") {
          const unique_id = generateId();
          user.id = unique_id;
          insertUser(user);

          router.push({
            pathname: "/(tabs)",
            params: { userParams: JSON.stringify(user) },
          });
        } else if (view == "forgetPassword") {
          router.push({
            pathname: "/(auth)/passwordChange",
            params: { userParams: JSON.stringify(user) },
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Code incorrect !",
          text2: "Code invalide ou expiré.",
        });
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Revenir au champ précédent si l'utilisateur appuie sur Retour arrière (Backspace)
    if (e.nativeEvent.key === "Backspace" && index > 0 && code[index] === "") {
      inputRefs.current[index - 1]?.focus();
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
          {/* Bouton Retour */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#0A5C36" />
          </TouchableOpacity>

          {/* En-tête : Titre et description */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Vérifiez votre e-mail</Text>
            <Text style={styles.subtitle}>
              Nous avons envoyé un code de vérification à six chiffres à
              <Text style={styles.boldText}>&nbsp;{user.email}</Text>.
            </Text>
          </View>

          {/* Champs de saisie du code (6 cases) */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={styles.codeInputBox}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleInputChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                placeholder="-"
                placeholderTextColor="#A0AAB2"
              />
            ))}
          </View>

          {/* Compteur de temps */}
          <CountdownTimer email={user.email} />
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
    paddingVertical: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 16,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A5C36",
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#557A68",
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "bold",
    color: "#1A332B",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  codeInputBox: {
    width: 45,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0A5C36",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A332B",
  },
  timerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#719082",
    marginBottom: 20,
  },
  resendButton: {
    alignItems: "center",
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0A5C36",
  },
});
