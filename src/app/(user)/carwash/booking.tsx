import { useCarwash } from "@/src/providers/CarwashProvider";
import { Link, router, useSegments } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Appearance,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingScreen = () => {
  const { getServices, total, changeDeliveryType, set_DeliveryTime } =
    useCarwash();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState("date");
  const [delivery, setDelivery] = useState<string>("pick_up");

  const colorScheme = Appearance.getColorScheme();

  const segments = useSegments();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);

    if (Platform.OS === "android") {
      if (mode === "date") {
        // After setting the date, show the time picker
        setMode("time");
        setShowDatePicker(true);
      } else {
        // After setting the time, hide the picker
        setMode("date");
        setShowDatePicker(false);
      }
    }
  };

  const confirmDetails = () => {
    if (total == 0) {
      return Alert.alert("Attention", "Please Select a Service");
    }
    set_DeliveryTime(date.toDateString());
    changeDeliveryType(delivery);
    router.navigate(`${segments[0]}/carwash/payment`);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
    setMode("date");
  };

  const changeDelivery = (deliveryType: string) => {
    changeDeliveryType(deliveryType);
  };

  const { autoServices, services } = useCarwash();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/carwashlogo.png")} />
      </View>

      <ScrollView>
        {services.map((service) => {
          return (
            <View style={styles.serviceItem}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.servicePrice}>KSH {service.price}</Text>
            </View>
          );
        })}
        {autoServices.map((service) => {
          return (
            <View style={styles.serviceItem}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.servicePrice}>KSH {service.price}</Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>KSH {total}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            delivery == "pick_up"
              ? styles.selectedButton
              : styles.unselectedButton
          }
          onPress={() => setDelivery("pick_up")}
        >
          <Text style={styles.buttonText}>Pick Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            delivery == "self_service"
              ? styles.selectedButton
              : styles.unselectedButton
          }
          onPress={() => setDelivery("self_service")}
        >
          <Text style={styles.buttonText}>Self Service</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
        <Text style={styles.dateButtonText}>
          {date.toLocaleDateString()}{" "}
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      <TouchableOpacity style={styles.continueButton} onPress={confirmDetails}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  placedBooking: {
    backgroundColor: "#8BC34A",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  serviceContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  serviceItem: {
    marginBottom: 10,
  },
  serviceTitle: {
    fontWeight: "bold",
  },
  serviceDescription: {
    color: "gray",
  },
  servicePrice: {
    color: "#8BC34A",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalText: {
    fontWeight: "bold",
  },
  totalPrice: {
    color: "#8BC34A",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  unselectedButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
  },
  selectedButton: {
    backgroundColor: "#8BC34A",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateTimeBox: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  dateTimeLabel: {
    color: "gray",
  },
  dateTimeValue: {
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#8BC34A",
    padding: 15,
    borderRadius: 5,
  },
  continueButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  dateButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  dateButtonText: {
    fontWeight: "bold",
  },
});

export default BookingScreen;
