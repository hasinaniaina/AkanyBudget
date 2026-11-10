import { FieldsColors, FontSizes } from "@/constants/theme";
import { User } from "@/models/user";
import { getAllUsers } from "@/services/user";
import {
  emailRegex,
  getVerificationCode,
  passwordRegex,
  phoneNumberRegex,
  sendEmailInBackground,
} from "@/utils";
import { Ionicons } from "@expo/vector-icons"; // Assurez-vous d'avoir installé @expo/vector-icons
import { router } from "expo-router";
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

export default function RegisterScreen() {
  const [user, setUser] = useState<User>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const allUsers = getAllUsers();

  const [isAccepted, setIsAccepted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  function showToast(type: "success" | "error", text1: string, text2: string) {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  }

  function createUser() {
    if (
      user.name == "" ||
      user.phone == "" ||
      user.email == "" ||
      user.password == ""
    ) {
      showToast(
        "error",
        "Erreur",
        "Veuillez remplir tous les champs du formulaire.",
      );
    } else if (
      errorMessages.name ||
      errorMessages.phone ||
      errorMessages.email ||
      errorMessages.password
    ) {
      showToast(
        "error",
        "Erreur",
        "Veuillez corriger les erreurs dans le formulaire.",
      );
    } else {
      const code = getVerificationCode();
      sendEmailInBackground({ email: user.email, code: code });

      router.push({
        pathname: "/verification",
        params: { userParams: JSON.stringify(user), view: "createAccount" },
      });
      // Ici, vous pouvez ajouter la logique pour créer le compte de l'utilisateur.
      console.log("Compte créé avec succès !");
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajusté pour iOS et Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Titre et Sous-titre */}
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>
            Rejoignez AkanyBudget et commencez à gérer vos finances dès
            aujourd'hui.
          </Text>

          {/* Champ Nom complet */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre nom et prénom"
              placeholderTextColor="#A0AAB2"
              value={user.name}
              onChangeText={(name) => {
                if (name.trim() === "") {
                  setErrorMessages({
                    ...errorMessages,
                    name: "Le nom complet est requis",
                  });
                } else {
                  setErrorMessages({ ...errorMessages, name: "" });
                }

                setUser({ ...user, name: name });
              }}
            />
            <Text style={styles.errorText}>{errorMessages.name}</Text>
          </View>

          {/* Champ Téléphone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Téléphone</Text>
            <View style={styles.inputIconContainer}>
              <Ionicons
                name="call-outline"
                size={18}
                color="#0A5C36"
                style={styles.leftIcon}
              />
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="034 12 345 67"
                placeholderTextColor="#A0AAB2"
                keyboardType="phone-pad"
                value={user.phone}
                onChangeText={(phone) => {
                  let phoneAlreadySaved = false;

                  allUsers.map((user) => {
                    if (phone == user.phone) {
                      setErrorMessages({
                        ...errorMessages,
                        phone: "le numéro de télephone est déjà repertorié.",
                      });
                      phoneAlreadySaved = true;
                    }
                  });

                  if (!phoneAlreadySaved) {
                    if (phoneNumberRegex.test(phone)) {
                      setErrorMessages({ ...errorMessages, phone: "" });
                    } else {
                      setErrorMessages({
                        ...errorMessages,
                        phone: "Numéro de téléphone invalide",
                      });
                    }
                  }
                  setUser({ ...user, phone: phone });
                }}
              />
            </View>

            <Text style={styles.errorText}>{errorMessages.phone}</Text>
          </View>

          {/* Champ E-mail */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="exemple@email.com"
              placeholderTextColor="#A0AAB2"
              keyboardType="email-address"
              value={user.email}
              onChangeText={(email) => {
                let emailAlreadySaved = false;

                allUsers.map((user) => {
                  if (email == user.email) {
                    setErrorMessages({
                      ...errorMessages,
                      email: "Email déjà repertorié.",
                    });
                    emailAlreadySaved = true;
                  }
                });

                if (!emailAlreadySaved) {
                  if (emailRegex.test(email)) {
                    setErrorMessages({ ...errorMessages, email: "" });
                  } else {
                    setErrorMessages({
                      ...errorMessages,
                      email: "Adresse e-mail invalide",
                    });
                  }
                }
                setUser({ ...user, email: email.toLowerCase() });
              }}
            />

            <Text style={styles.errorText}>{errorMessages.email}</Text>
          </View>

          {/* Champ Mot de passe */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.inputIconContainer}>
              <TextInput
                style={[
                  styles.input,
                  { flex: 1, borderWidth: 0, height: "90%", paddingLeft: 0 },
                ]}
                placeholder="Minimum 8 caractères"
                placeholderTextColor="#A0AAB2"
                secureTextEntry={!isPasswordVisible}
                value={user.password}
                onChangeText={(password) => {
                  if (passwordRegex.test(password)) {
                    setErrorMessages({ ...errorMessages, password: "" });
                  } else {
                    setErrorMessages({
                      ...errorMessages,
                      password:
                        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
                    });
                  }
                  setUser({ ...user, password: password });
                }}
              />
              {isPasswordVisible ? (
                <Ionicons
                  name="eye-outline"
                  size={18}
                  color="#0A5C36"
                  style={styles.rightIcon}
                  onPress={() => setIsPasswordVisible(false)}
                />
              ) : (
                <Ionicons
                  name="eye-off-outline"
                  size={18}
                  color="#0A5C36"
                  style={styles.rightIcon}
                  onPress={() => setIsPasswordVisible(true)}
                />
              )}
            </View>

            <Text style={styles.errorText}>{errorMessages.password}</Text>
          </View>

          {/* Conditions d'utilisation */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            activeOpacity={0.8}
            onPress={() => {
              setIsAccepted(!isAccepted);
            }}
          >
            <View
              style={[styles.checkbox, isAccepted && styles.checkboxChecked]}
            >
              {isAccepted && (
                <Ionicons name="checkmark" size={12} color="#FFF" />
              )}
            </View>
            <Text style={styles.termsText}>
              J'accepte les conditions d'utilisation et la politique de
              confidentialité.
            </Text>
          </TouchableOpacity>

          {/* Bouton Créer mon compte */}
          <TouchableOpacity
            style={[
              styles.button,
              isAccepted == false ? styles.buttonDisabled : styles.buttonActive,
            ]}
            activeOpacity={0.8}
            disabled={isAccepted == false}
            onPress={() => {
              if (isAccepted) {
                createUser();
              } else {
                console.log("Veuillez accepter les conditions d'utilisation.");
              }
            }}
          >
            <Text style={styles.buttonText}>Créer mon compte</Text>
          </TouchableOpacity>

          {/* Lien de connexion */}
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => {
              router.push("/login");
            }}
          >
            <Text style={styles.loginText}>
              Déjà un compte ?<Text style={styles.loginLink}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9F6",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: FontSizes.xlarge,
    fontWeight: "bold",
    color: "#0A5C36",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FontSizes.small,
    color: "#557A68",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: FontSizes.small,
    fontWeight: "500",
    color: "#0A5C36",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4E8DE",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    fontSize: FontSizes.small,
    color: "#333333",
  },
  inputIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4E8DE",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  inputWithIcon: {
    flex: 1,
    borderWidth: 0,
    height: "100%",
  },

  errorText: {
    color: FieldsColors.red,
    fontSize: FontSizes.xsmall,
    marginTop: 4,
    paddingHorizontal: 12,
  },

  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#0A5C36",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: "#0A5C36",
  },
  termsText: {
    flex: 1,
    fontSize: FontSizes.small,
    color: "#557A68",
    lineHeight: 18,
  },
  button: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: FieldsColors.grenDisabled,
  },

  buttonActive: {
    backgroundColor: "#0A5C36",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: FontSizes.small,
    fontWeight: "bold",
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  loginText: {
    fontSize: FontSizes.small,
    color: "#557A68",
  },
  loginLink: {
    fontWeight: "bold",
    color: "#0A5C36",
  },
});
