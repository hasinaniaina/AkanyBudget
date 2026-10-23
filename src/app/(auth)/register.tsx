import { Ionicons } from "@expo/vector-icons"; // Assurez-vous d'avoir installé @expo/vector-icons
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
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
            value={fullName}
            onChangeText={setFullName}
          />
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
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        {/* Champ E-mail */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="exemple@email.com"
            placeholderTextColor="#A0AAB2"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
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
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Ionicons
              name="eye-off-outline"
              size={18}
              color="#0A5C36"
              style={styles.rightIcon}
            />
          </View>
        </View>

        {/* Conditions d'utilisation */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          activeOpacity={0.8}
          onPress={() => setIsAccepted(!isAccepted)}
        >
          <View style={[styles.checkbox, isAccepted && styles.checkboxChecked]}>
            {isAccepted && <Ionicons name="checkmark" size={12} color="#FFF" />}
          </View>
          <Text style={styles.termsText}>
            J'accepte les conditions d'utilisation et la politique de
            confidentialité.
          </Text>
        </TouchableOpacity>

        {/* Bouton Créer mon compte */}
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
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
            Déjà un compte ? <Text style={styles.loginLink}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9F6",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0A5C36",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#557A68",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
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
    fontSize: 14,
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
    fontSize: 12,
    color: "#557A68",
    lineHeight: 18,
  },
  button: {
    backgroundColor: "#0A5C36",
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "#0A5C36",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#557A68",
  },
  loginLink: {
    fontWeight: "bold",
    color: "#0A5C36",
  },
});
