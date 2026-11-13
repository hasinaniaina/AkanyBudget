import { FontSizes } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Depense from "./add/depense";
import Revenu from "./add/revenu";
import Transfert from "./add/transfert";

interface CustomBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSave?: (operation: any) => void;
}

export default function CustomBottomSheet({
  visible,
  onClose,
  onSave,
}: CustomBottomSheetProps) {
  const [montant, setMontant] = useState("0");
  const [categorie, setCategorie] = useState("Salaire");
  const [date, setDate] = useState("03 / 11 / 2026");
  const [compte, setCompte] = useState("Mobile Money");
  const [libelle, setLibelle] = useState("");
  const [type, setType] = useState<"Dépense" | "Revenu" | "Transfert">(
    "Dépense",
  );

  // 1. État pour stocker la hauteur dynamique du clavier
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    // Écoute de l'ouverture et de la fermeture du clavier
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const subShow = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const subHide = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      subShow.remove();
      subHide.remove();
    };
  }, []);

  if (!visible) return null;

  const handleSave = () => {
    const newOperation = {
      type,
      montant: parseFloat(montant) || 0,
      categorie,
      date,
      compte,
      libelle,
    };
    if (onSave) onSave(newOperation);
    onClose();
  };

  return (
    <>
      {/* Arrière-plan sombre cliquable */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* On applique un padding bottom dynamique équivalent à la hauteur du clavier */}
        <View
          style={[styles.absoluteOverlay, { paddingBottom: keyboardHeight }]}
        >
          <View style={styles.sheetContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.sheetContent}>
                {/* Petite barre grise supérieure de glissement */}
                <View style={styles.dragHandle} />

                {/* En-tête : Titre et Bouton de fermeture */}
                <View style={styles.header}>
                  <Text style={styles.title}>Nouvelle Opération</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close" size={18} color="#557065" />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  {/* 1. TYPE D'OPÉRATION */}
                  <Text style={styles.label}>TYPE D'OPÉRATION</Text>
                  <View style={styles.typeContainer}>
                    {(["Dépense", "Revenu", "Transfert"] as const).map(
                      (item) => {
                        const isActive = type === item;
                        return (
                          <TouchableOpacity
                            key={item}
                            style={[
                              styles.typeButton,
                              isActive && styles.activeTypeButton,
                            ]}
                            onPress={() => setType(item)}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={[
                                styles.typeText,
                                isActive && styles.activeTypeText,
                              ]}
                            >
                              {item}
                            </Text>
                          </TouchableOpacity>
                        );
                      },
                    )}
                  </View>

                  {type == "Dépense" && <Depense />}
                  {type == "Revenu" && <Revenu />}
                  {type == "Transfert" && <Transfert />}

                  {/* BOUTON DE VALIDATION */}
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSave}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.submitButtonText}>
                      Enregistrer l'opération
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  absoluteOverlay: {
    position: "absolute",
    top: 0,
    width: width,
    height: height + 30,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(26, 35, 48, 0.75)",
  },
  sheetContainer: {
    width: "100%",
    maxHeight: "100%",
  },
  sheetContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#DDE5E1",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
    color: "#1A332B",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F0F5F2",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: FontSizes.small,
    fontWeight: "700",
    color: "#719082",
    marginBottom: 6,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  typeContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F9F6",
    borderRadius: 24,
    padding: 4,
    marginBottom: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTypeButton: {
    backgroundColor: "#0A5C36",
  },
  typeText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#557065",
  },
  activeTypeText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#F8FBFA",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    alignItems: "center",
  },
  amountInput: {
    flex: 1,
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#1A332B",
    height: "100%",
    paddingVertical: 0,
  },
  currencySymbol: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#719082",
  },
  selectInput: {
    flexDirection: "row",
    backgroundColor: "#F8FBFA",
    borderWidth: 1,
    borderColor: "#E2ECE7",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: FontSizes.small,
    fontWeight: "600",
    color: "#1A332B",
  },
  row: {
    flexDirection: "row",
  },
  flex1: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: FontSizes.small,
    color: "#1A332B",
    height: "100%",
    paddingVertical: 0,
  },
  submitButton: {
    backgroundColor: "#0A5C36",
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#0A5C36",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
