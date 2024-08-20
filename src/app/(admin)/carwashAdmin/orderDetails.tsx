import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

const ActiveBookingsScreen = () => {

    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/carwashlogo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Active Bookings</Text>

        <View style={styles.bookingCard}>
          <Text style={styles.date}>4/12/2023</Text>
          <Text style={styles.carModel}>Toyota Prado</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Service Type</Text>
            <Text style={styles.value}>pick - Up</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Basic Wash</Text>
            <Text style={styles.value}>KES 500</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.progressButton]}>
              <Text style={styles.buttonText}>Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.completedButton]}>
              <Text style={styles.buttonText}>Completed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => {
            router.push("/(user)/carwashAdmin/bookingHistory");
          }}
        >
          <Text style={styles.historyButtonText}>Booking History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollView: {
    flex: 1,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  carModel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  waitingButton: {
    backgroundColor: "#8bc34a",
  },
  progressButton: {
    backgroundColor: "#f44336",
  },
  completedButton: {
    backgroundColor: "#4caf50",
  },
  bottomContainer: {
    padding: 20,
  },
  historyButton: {
    backgroundColor: "#8bc34a",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  historyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ActiveBookingsScreen;
