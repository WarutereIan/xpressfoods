import { useRouter, useSegments } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  const segments = useSegments();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/carwashlogo.png")}
          style={styles.logo}
        />
        <Text style={styles.logoText}>
          ULTRA{"\n"}DETAILING{"\n"}CAR WASH
        </Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push("/(user)/carwashAdmin/dashboard");
          }}
        >
          <Text style={styles.menuItem}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/(user)/carwashAdmin/bookingHistory");
          }}
        >
          <Text style={styles.menuItem}>Booking History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/(user)/carwashAdmin/paymentHistory");
          }}
        >
          <Text style={styles.menuItem}>Payment History</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/(user)/carwashAdmin/dashboard");
        }}
      >
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  logoText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  menuContainer: {
    alignSelf: "stretch",
  },
  menuItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#8bc34a",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
