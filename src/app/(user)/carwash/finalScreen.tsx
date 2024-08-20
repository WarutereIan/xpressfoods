import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CarWashingServiceBookedScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.congratulationsText}>
        Your Service Has Been Successfully Booked!
      </Text>
      <Text style={styles.bookingText}></Text>
      <Text style={styles.checkText}></Text>
      <TouchableOpacity
        style={styles.receiptButton}
        onPress={() => {
          router.navigate("/(user)/carwash/mybookings");
        }}
      >
        <Text style={styles.receiptButtonText}>View My Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bookingsButton}
        onPress={() => {
          router.navigate("/(user)/carwash");
        }}
      >
        <Text style={styles.bookingsButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
    padding: 5,
  },
  bookingText: {
    fontSize: 18,
    marginBottom: 8,
  },
  checkText: {
    fontSize: 16,
    marginBottom: 24,
  },
  receiptButton: {
    backgroundColor: "#8bc34a",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  receiptButtonText: {
    color: "white",
    fontSize: 16,
  },
  bookingsButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookingsButtonText: {
    fontSize: 16,
  },
});

export default CarWashingServiceBookedScreen;
