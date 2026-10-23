import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
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

// Récupération de la hauteur totale de l'écran du téléphone actuel
const screenHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!identifier.trim() || !password) {
      return;
    }

    // À connecter à ton système d'authentification
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.screen}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajusté pour iOS et Android
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Logo et nom */}
            <ImageBackground
              source={require("@/assets/images/landscape.jpeg")}
              style={styles.landscape}
            >
              <View style={styles.brand}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require("@/assets/images/logo.png")}
                    style={styles.logo}
                  />
                </View>

                <Text style={styles.brandName}>
                  Akany<Text style={styles.brandNameGreen}>Budget</Text>
                </Text>

                <Text style={styles.tagline}>
                  Gérez aujourd'hui, délivrez demain.
                </Text>
              </View>
            </ImageBackground>
            <View style={styles.fakeView}></View>

            {/* Formulaire */}
            <View style={styles.formCard}>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={21} color="#388F80" />

                <TextInput
                  style={styles.input}
                  placeholder="E-mail ou numéro de téléphone"
                  placeholderTextColor="#86B5AA"
                  value={identifier}
                  onChangeText={setIdentifier}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  autoComplete="username"
                  returnKeyType="next"
                />

                <Ionicons name="chevron-down" size={17} color="#388F80" />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={21}
                  color="#388F80"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  placeholderTextColor="#86B5AA"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="current-password"
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityLabel={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "chevron-down"}
                    size={19}
                    color="#388F80"
                  />
                </TouchableOpacity>
              </View>

              {/* Connexion */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={["#10A976", "#07815D"]}
                  style={styles.loginGradient}
                >
                  <Text style={styles.loginButtonText}>Se connecter</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Mot de passe oublié */}
              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => {
                  // Naviguer vers l'écran de récupération
                }}
              >
                <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>

              {/* Création de compte */}
              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.75}
                onPress={() => {
                  router.push("/register");
                }}
              >
                <Text style={styles.registerText}>Créer un compte</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EAF8EF",
  },

  screen: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#EAF8EF",
    borderWidth: 0,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 24,
    paddingBottom: 20,
  },

  /* Logo */
  brand: {
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 0,
  },

  logoContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  brandName: {
    fontSize: 31,
    fontWeight: "800",
    color: "#087653",
    letterSpacing: -1.1,
    marginTop: 0,
  },

  brandNameGreen: {
    color: "#28AC70",
  },

  tagline: {
    color: "#69B7A5",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },

  /* Paysage */
  landscape: {
    position: "absolute",
    width: "100%",
    height: screenHeight * 0.7,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },

  fakeView: {},

  mountainBackLeft: {
    position: "absolute",
    top: 15,
    left: -35,
    width: 230,
    height: 145,
    backgroundColor: "#B8E8C4",
    borderRadius: 100,
    transform: [{ rotate: "-20deg" }],
  },

  mountainBackRight: {
    position: "absolute",
    top: 5,
    right: -55,
    width: 250,
    height: 155,
    backgroundColor: "#C4EED0",
    borderRadius: 110,
    transform: [{ rotate: "18deg" }],
  },

  hillBack: {
    position: "absolute",
    top: 105,
    left: -40,
    width: "120%",
    height: 160,
    backgroundColor: "#70C887",
    borderTopLeftRadius: 140,
    borderTopRightRadius: 100,
    transform: [{ rotate: "-3deg" }],
  },

  hillFront: {
    position: "absolute",
    top: 155,
    left: -40,
    width: "125%",
    height: 130,
    backgroundColor: "#329B5A",
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },

  tree: {
    position: "absolute",
    alignItems: "center",
    zIndex: 3,
  },

  treeTop: {
    width: 42,
    height: 65,
    backgroundColor: "#16824A",
    borderRadius: 24,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  treeTrunk: {
    width: 7,
    height: 17,
    backgroundColor: "#79543B",
  },

  /* Maisons */
  house: {
    position: "absolute",
    width: 67,
    alignItems: "center",
    zIndex: 4,
  },

  roof: {
    width: 0,
    height: 0,
    borderLeftWidth: 39,
    borderRightWidth: 39,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#8B573E",
  },

  houseBody: {
    width: 63,
    height: 44,
    backgroundColor: "#F6E5B6",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  window: {
    width: 12,
    height: 13,
    backgroundColor: "#8DD5E1",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  door: {
    width: 13,
    height: 25,
    backgroundColor: "#A36A47",
    alignSelf: "flex-end",
  },

  /* Formulaire */
  formCard: {
    marginHorizontal: 12,
    paddingHorizontal: 19,
    paddingTop: 20,
    paddingBottom: 23,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.97)",
    borderWidth: 1,
    borderColor: "#E0F2E9",
    shadowColor: "#145B43",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },

  inputContainer: {
    height: 48,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E2F2ED",
    backgroundColor: "#FCFFFD",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 11,
    gap: 10,
  },

  input: {
    flex: 1,
    minWidth: 0,
    height: "100%",
    color: "#245C4D",
    fontSize: 12,
    paddingVertical: 0,
  },

  loginButton: {
    height: 51,
    borderRadius: 13,
    overflow: "hidden",
    marginTop: 9,
    elevation: 2,
  },

  loginGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  forgotButton: {
    alignSelf: "flex-start",
    marginTop: 16,
    marginBottom: 10,
    paddingVertical: 1,
  },

  forgotText: {
    color: "#54A99B",
    fontSize: 12,
    fontWeight: "600",
  },

  registerButton: {
    height: 49,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#DFF1EC",
    backgroundColor: "#FCFFFD",
  },

  registerText: {
    color: "#278A78",
    fontSize: 15,
    fontWeight: "700",
  },
});
