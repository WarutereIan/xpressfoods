import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import { Link } from "expo-router";
import { useCarwash } from "@/src/providers/CarwashProvider";

const PaymentMethodsScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const { setPaymentMode } = useCarwash();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Payment Methods</Text>

      <TouchableOpacity
        style={[
          styles.methodButton,
          selectedMethod === "CASH" && styles.selectedMethod,
        ]}
        onPress={() => setSelectedMethod("CASH")}
      >
        <Text style={styles.methodText}>Cash</Text>
        <Ionicons name="card-outline" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.methodButton,
          selectedMethod === "MPESA" && styles.selectedMethod,
        ]}
        onPress={() => setSelectedMethod("mpesa")}
      >
        <Text style={styles.methodText}>M-PESA</Text>
      </TouchableOpacity>

      <Link href={"/(user)/carwash/review"} asChild>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            setPaymentMode(selectedMethod);
          }}
        >
          <Text style={styles.continueText}>Continue</Text>
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
  methodButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  selectedMethod: {
    borderColor: "#8BC34A",
    borderWidth: 2,
  },
  methodText: {
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#8BC34A",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  continueText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentMethodsScreen;
