import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import { useCarwash } from "@/src/providers/CarwashProvider";

const ReviewSummaryScreen = () => {
  const {
    delivery_time,
    services,
    getDeliveryType,
    total,
    checkout,
    payment_mode,
  } = useCarwash();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Review Summary</Text>

      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Date</Text>
          <Text style={styles.value}>{delivery_time}</Text>
        </View>

        {services.map((service) => {
          return (
            <View style={styles.row}>
              <Text style={styles.label}>Car</Text>
              <Text style={styles.value}>{service.carType}</Text>
            </View>
          );
        })}

        <View style={styles.row}>
          <Text style={styles.label}>Service Type</Text>
          <Text style={styles.value}>
            {getDeliveryType() == "pick_up" ? "Pick Up" : "Self Service"}
          </Text>
        </View>
        <View style={styles.divider} />
        {services.map((service) => {
          return (
            <View style={styles.row}>
              <Text style={styles.label}>{service.title}</Text>
              <Text style={styles.value}>KES {service.price}</Text>
            </View>
          );
        })}

        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>KES {total}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Payment Method</Text>
          <Text style={styles.totalValue}>{payment_mode}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={checkout}>
        <Text style={styles.confirmText}>Confirm Booking</Text>
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
