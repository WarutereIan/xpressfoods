import { useAuth } from "@/src/providers/AuthProvider";
import { useCarwash } from "@/src/providers/CarwashProvider";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const BookingScreen = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [carBrand, setCarBrand] = useState("");

  const router = useRouter();

  const { setCarMake } = useCarwash();

  const { session } = useAuth();

  const confirmDetails = () => {
    if (selectedClass.length == 0 || carBrand.length == 0) {
      return Alert.alert("Attention", "Please enter all Details");
    }
    setCarMake({ class: selectedClass, model: carBrand });
    router.navigate("/(user)/carwash/mainprices");
  };

  const viewBookings = () => {
    //check if user logged is logged in
    if (!session) {
      return Alert.alert(
        "Attention",
        "You need to be logged in for user history"
      );
    }
    router.navigate("/(user)/carwash/mybookings");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/offer.png")}
        style={styles.jeepImage}
      />

      <View style={styles.bookingForm}>
        <View style={styles.ultraDetailingBadge}>
          <Image source={require("@/assets/images/carwashlogo.png")} />
        </View>

        <Text style={styles.bookingTitle}>Effortless</Text>
        <Text style={styles.bookingSubtitle}>Booking</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedClass}
            onValueChange={(itemValue) => setSelectedClass(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Class" value="" />
            <Picker.Item label="Saloon" value="Saloon" />
            <Picker.Item label="SUV" value="SUV" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setCarBrand(text)}
          placeholder="Car Brand"
        />

        <TouchableOpacity style={styles.bookButton} onPress={confirmDetails}>
          <Text style={styles.bookButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingsButton} onPress={viewBookings}>
          <Text style={styles.bookButtonText}>My Bookings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    justifyContent: "center",
  },
  offerCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  offerText: {
    color: "white",
    fontSize: 18,
  },
  discountText: {
    color: "#7CFC00",
    fontSize: 36,
    fontWeight: "bold",
  },
  subText: {
    color: "white",
    fontSize: 14,
  },
  jeepImage: {
    width: "100%",
    height: 150,
    resizeMode: "stretch",
    borderRadius: 15,
    marginBottom: 10,
  },
  bookingForm: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  ultraDetailingBadge: {
    //backgroundColor: "#333",
    borderRadius: 20,
    padding: 10,
    //alignSelf: "flex-start",
    marginBottom: 10,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  bookingTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bookingSubtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8bc34a",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: "#8bc34a",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  bookingsButton: {
    backgroundColor: "#8bc34a",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
});

export default BookingScreen;
