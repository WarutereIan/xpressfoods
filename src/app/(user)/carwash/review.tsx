import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo

const ReviewSummaryScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Review Summary</Text>

      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Date</Text>
          <Text style={styles.value}>4 AUG 2024 10:00AM</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Car</Text>
          <Text style={styles.value}>SUV</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Service Type</Text>
          <Text style={styles.value}>Self Service</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Basic Wash</Text>
          <Text style={styles.value}>KES 300</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Leather Care</Text>
          <Text style={styles.value}>KES 500</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>KES 800</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm Payment</Text>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8BC34A",
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "#666",
  },
  value: {
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
  totalLabel: {
    color: "#666",
    fontWeight: "bold",
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#8BC34A",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReviewSummaryScreen;
