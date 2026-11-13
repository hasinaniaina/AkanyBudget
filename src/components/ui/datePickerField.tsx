import { useState } from "react";
import { Platform, StyleSheet as RNStyleSheet, View } from "react-native"; // ou de 'react-native' selon vos imports
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

interface DatePickerFieldProps {
  label?: string;
  onDateChange: (formattedDate: string) => void; // Fonction pour mettre à jour l'état dans votre formulaire parent
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
}

export default function DatePickerField({
  label = "DATE",
  onDateChange,
  showPicker,
  setShowPicker,
}: DatePickerFieldProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Gérer le clic sur une date dans le calendrier natif
  const onChange = (selectedDate?: DateType) => {
    // Sur Android, le picker se ferme tout seul. Sur iOS, on gère l'affichage.
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    console.log(selectedDate);

    // if (selectedDate) {
    //   setCurrentDate(selectedDate);
    //   const formatted = formatDate(selectedDate);

    //   onDateChange(formatted);
    //   setShowPicker(false);
    // }
  };

  return (
    <View style={styles.container}>
      {/* POPUP DU CALENDRIER NATIF */}
      {showPicker && (
        <DateTimePicker
          date={currentDate}
          mode="single"
          onChange={({ date }) => {
            onChange(date);
          }}
        />
      )}
    </View>
  );
}

const styles = RNStyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#719082",
    marginBottom: 6,
    marginTop: 10,
    letterSpacing: 0.5,
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
    fontSize: 14,
    fontWeight: "600",
    color: "#1A332B",
  },
});
