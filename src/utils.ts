import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { User } from "./models/user";
import { getAllUsers, insertVerificationCode } from "./services/user";

export const phoneNumberRegex =
  /^(?:\+?261|0)(32|33|34|38|39|40|41|42|43|44|45|46|47|48|49)\d{7}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const getVerificationCode = () => {
  // Générer un code de vérification aléatoire à 6 chiffres
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  // Ici, vous pouvez ajouter la logique pour envoyer le code par e-mail ou SMS.
  insertVerificationCode(code);
  return code;
};

export const sendEmailInBackground = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  try {
    // Remplacez cette URL par l'adresse de votre propre serveur backend
    const response = await fetch(
      "http://192.168.1.118:3000/api/send-verification-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer votre_token_si_necessaire'
        },
        body: JSON.stringify({
          to: email,
          subject: "Code de vérification - AkanyBudget",
          message: `Votre code de confirmation est : ${code}`,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("E-mail envoyé avec succès en arrière-plan !");
    } else {
      console.log("Erreur lors de l'envoi de l'e-mail :", data);
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
};

export function generateId(length: number = 32): string {
  // Génère des octets aléatoires et les convertit en chaîne hexadécimale
  const randomBytes = Crypto.getRandomBytes(length);
  const token = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return token;
}

// Fonction pour sauvegarder le token après authentification réussie
export async function saveUserSession(userId: string): Promise<boolean> {
  try {
    // 1. Générer un jeton de session local unique
    const localSessionToken = Crypto.randomUUID();
    // 2. Le stocker de manière sécurisée sur le téléphone
    await SecureStore.setItemAsync("local_session_token", localSessionToken);
    await SecureStore.setItemAsync("logged_user_id", userId);

    console.log("Connecté hors ligne avec succès !");
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du token :", error);
    return false;
  }
}

export async function handleLogout() {
  await SecureStore.deleteItemAsync("local_session_token");
  await SecureStore.deleteItemAsync("logged_user_id");
  // Rediriger ensuite l'utilisateur vers l'écran de connexion
}

export async function getUserConnected(): Promise<User | null> {
  const localSessionToken = await SecureStore.getItemAsync(
    "local_session_token",
  );
  const userId = await SecureStore.getItemAsync("logged_user_id");

  if (localSessionToken && userId) {
    const users = getAllUsers();
    users.map((user) => {
      if (user.id == userId) {
        return user;
      }
    });
  }

  return null;
}

export const formatDate = (rawDate: Date): string => {
  const day = String(rawDate.getDate()).padStart(2, "0");
  const month = String(rawDate.getMonth() + 1).padStart(2, "0");
  const year = rawDate.getFullYear();
  return `${day} / ${month} / ${year}`;
};
