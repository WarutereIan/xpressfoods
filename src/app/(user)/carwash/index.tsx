import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const BookingScreen = () => {
  const [selectedClass, setSelectedClass] = useState("");
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/special-offer-banner.png")}
        style={styles.jeepImage}
      />

      <View style={styles.bookingForm}>
        <View style={styles.ultraDetailingBadge}>
          <Text style={styles.badgeText}>ULTRA DETAILING CAR WASH</Text>
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
            <Picker.Item label="Economy" value="economy" />
            <Picker.Item label="Standard" value="standard" />
            <Picker.Item label="Luxury" value="luxury" />
          </Picker>
        </View>

        <TextInput style={styles.input} placeholder="Car Brand" />

        <Link href={"/(user)/carwash/mainprices"} asChild>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Continue</Text>
          </TouchableOpacity>
        </Link>
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
    resizeMode: "contain",
  },
  bookingForm: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  ultraDetailingBadge: {
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
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
    color: "#7CFC00",
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
    backgroundColor: "#7CFC00",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
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
