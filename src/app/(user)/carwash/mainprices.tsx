import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

const ServiceOption = ({ title, description, price, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[styles.serviceOption, isSelected && styles.selectedOption]}
    onPress={onSelect}
  >
    <View>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </View>
    <Text style={styles.servicePrice}>{price}</Text>
  </TouchableOpacity>
);

const ServicesScreen = () => {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: 1,
      title: "Basic Wash",
      description: "• Body Wash • Tyre Wash",
      price: "KSH 300",
    },
    {
      id: 2,
      title: "Super Wash",
      description: "• Basic Wash • Interior Care\n• Vacuum • Dashboard Polish",
      price: "KSH 2,000",
    },
    {
      id: 3,
      title: "Deluxe Wash",
      description: "Super Wash • Auto Detailing",
      price: "KSH 3,000",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.backButton} />
          <Text style={styles.headerTitle}>Main Services</Text>
        </View>

        {services.map((service) => (
          <ServiceOption
            key={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            isSelected={selectedService === service.id}
            onSelect={() => setSelectedService(service.id)}
          />
        ))}

        <Link href={"/(user)/carwash/booking"} asChild>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/(user)/carwash/autocare"} asChild>
          <TouchableOpacity style={styles.moreServicesButton}>
            <Text style={styles.buttonText}>More Auto Care Services</Text>
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
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  serviceOption: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#9ACD32",
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  continueButton: {
    backgroundColor: "#9ACD32",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  moreServicesButton: {
    backgroundColor: "#9ACD32",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ServicesScreen;
