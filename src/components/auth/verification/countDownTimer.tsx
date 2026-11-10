import {
  deleteLastVerificationCode,
  insertVerificationCode,
} from "@/services/user";
import { getVerificationCode, sendEmailInBackground } from "@/utils";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CountdownTimer({ email }: { email: string }) {
  const [timeLeft, setTimeLeft] = useState(60); // 60 secondes au départ
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Si le temps est écoulé, on active la possibilité de renvoyer
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    // Décompte chaque seconde
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  // Fonction pour relancer le compte à rebours (lors du clic sur "Renvoyer")
  const handleResendCode = () => {
    setTimeLeft(60);
    setCanResend(false);
    deleteLastVerificationCode();
    const newCode = getVerificationCode();
    insertVerificationCode(newCode);
    sendEmailInBackground({ email: email, code: newCode });
    console.log("Code renvoyé !");
  };

  // Formatage des secondes en format MM:SS (ex: 00:59)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

      {/* Bouton Renvoyer le code (grisé et cliquable seulement à 00:00) */}
      <TouchableOpacity
        style={[styles.resendButton, !canResend && styles.disabledButton]}
        onPress={handleResendCode}
        disabled={!canResend}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.resendText, !canResend && styles.disabledTextText]}
        >
          Renvoyer le code
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  timerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#719082",
    marginBottom: 16,
  },
  resendButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  resendText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0A5C36",
  },
  disabledTextText: {
    color: "#A0AAB2",
  },
});
