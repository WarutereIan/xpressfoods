import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

const ServiceItem = ({ name, price, isHighlighted }) => (
  <View style={[styles.serviceItem, isHighlighted && styles.highlightedItem]}>
    <Text style={styles.serviceName}>{name}</Text>
    <Text style={styles.servicePrice}>{price}</Text>
  </View>
);

const AutoCareServicesScreen = () => {
  const services = [
    { name: "Engine Steam Wash", price: "KSH 1,500" },
    { name: "Vacuuming & Shampooing", price: "KSH 1,500" },
    { name: "Vacuuming ( Dry )", price: "KSH 300" },
    { name: "Leather Care", price: "KSH 500", highlighted: true },
    { name: "Waxing", price: "KSH 2,000" },
    { name: "Machine Polish", price: "KSH 1,500" },
    { name: "Buffing", price: "KSH 4,000" },
    { name: "Aircon Check & Refill", price: "KSH -" },
    { name: "Carpet Cleaning", price: "KSH -" },
    { name: "Home & Office Cleaning", price: "KSH -" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.backButton} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>More Auto Care Services</Text>
          </View>
        </View>

        {services.map((service, index) => (
          <ServiceItem
            key={index}
            name={service.name}
            price={service.price}
            isHighlighted={service.highlighted}
          />
        ))}
        <Link href={"/(user)/carwash/booking"} asChild>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#9ACD32",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  highlightedItem: {
    backgroundColor: "#9ACD32",
  },
  serviceName: {
    fontSize: 16,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  continueButton: {
    backgroundColor: "#9ACD32",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AutoCareServicesScreen;
