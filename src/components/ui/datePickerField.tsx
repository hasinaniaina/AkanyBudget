import { FieldsColors } from "@/constants/theme";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

// Configuration du calendrier en français
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Jan.",
    "Fév.",
    "Mar.",
    "Avr.",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

interface DatePickerInterface {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}

export default function DatePickerField({
  modalVisible,
  setModalVisible,
  selectedDate,
  setSelectedDate,
}: DatePickerInterface) {
  // Date actuelle au format YYYY-MM-DD

  // Sélection d'une date
  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        {/* Popup calendrier */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sélectionner une date</Text>

              <Calendar
                current={selectedDate}
                onDayPress={onDayPress}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: FieldsColors.green,
                  },
                }}
                enableSwipeMonths={true}
                theme={{
                  todayTextColor: FieldsColors.green,
                  arrowColor: FieldsColors.green,
                  textMonthFontWeight: "bold",
                  textDayFontSize: 15,
                  textMonthFontSize: 17,
                }}
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  container: {
    flex: 1,
  },
  dateInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: FieldsColors.green,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
