import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const BookingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.placedBooking}>Place Booking</Text>
      </View>

      <View style={styles.serviceContainer}>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceTitle}>Basic Wash</Text>
          <Text style={styles.serviceDescription}>- Body Wash + Tyre Wash</Text>
          <Text style={styles.servicePrice}>KSH 300</Text>
        </View>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceTitle}>Leather Care</Text>
          <Text style={styles.servicePrice}>KSH 500</Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>KSH 800</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.pickUpButton}>
          <Text style={styles.buttonText}>Pick Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selfServiceButton}>
          <Text style={styles.buttonText}>Self Service</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeBox}>
          <Text style={styles.dateTimeLabel}>Date</Text>
          <Text style={styles.dateTimeValue}>4 AUG</Text>
        </View>
        <View style={styles.dateTimeBox}>
          <Text style={styles.dateTimeLabel}>Time</Text>
          <Text style={styles.dateTimeValue}>10:00AM</Text>
        </View>
      </View>

      <Link href={"/(user)/carwash/payment"} asChild>
        <TouchableOpacity style={styles.continueButton}>
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
});

export default BookingScreen;
