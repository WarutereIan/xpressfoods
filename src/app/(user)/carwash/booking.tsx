import { useCarwash } from "@/src/providers/CarwashProvider";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingScreen = () => {
  const { getServices, total, changeDeliveryType, set_DeliveryTime } =
    useCarwash();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState("date");
  const [delivery, setDelivery] = useState<string>("pick_up");

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
    set_DeliveryTime(date.toDateString());
    changeDeliveryType(delivery);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
    setMode("date");
  };

  const changeDelivery = (deliveryType: string) => {
    changeDeliveryType(deliveryType);
  };

  let services = getServices();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.placedBooking}>Place Booking</Text>
      </View>

      {services.map((service) => {
        return (
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.servicePrice}>KSH {service.price}</Text>
          </View>
        );
      })}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>KSH {total}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.pickUpButton}
          onPress={() => setDelivery("pick_up")}
        >
          <Text style={styles.buttonText}>Pick Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selfServiceButton}
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
          display="default"
          onChange={onDateChange}
        />
      )}

      <Link href={"/(user)/carwash/payment"} asChild>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={confirmDetails}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Link>
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
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pickUpButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  selfServiceButton: {
    backgroundColor: "#8BC34A",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
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
