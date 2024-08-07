import { useCarwash } from "@/src/providers/CarwashProvider";
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

const ServiceItem = ({ name, price, isHighlighted, onSelect }) => (
  <TouchableOpacity
    style={[styles.serviceItem, isHighlighted && styles.highlightedItem]}
    onPress={onSelect}
  >
    <Text style={styles.serviceName}>{name}</Text>
    <Text style={styles.servicePrice}>{price}</Text>
  </TouchableOpacity>
);

const AutoCareServicesScreen = () => {
  const [selectedService, setSelectedService] = useState<number>(200);

  const { addService, getCarMake } = useCarwash();

  const carMake = getCarMake();

  const confirmDetails = () => {
    addService({
      serviceName: services[selectedService - 1].service,
      carType: carMake.class,
      carModel: carMake.model,
      price: services[selectedService - 1].service_price,
      title: services[selectedService - 1].name,
    });
  };

  const services = [
    {
      name: "Engine Steam Wash",
      price: "KSH 1,500",
      service: "engine_steam_wash",
      service_price: 1500,
      id: 1,
    },
    {
      name: "Vacuuming & Shampooing",
      price: "KSH 1,500",
      service: "vacuuming_and_shampooing",
      service_price: 1500,
      id: 2,
    },
    {
      name: "Vacuuming ( Dry )",
      price: "KSH 300",
      service: "vacuuming_dry",
      service_price: 300,
      id: 3,
    },
    {
      name: "Leather Care",
      price: "KSH 500",
      highlighted: true,
      service: "leather_care",
      service_price: 500,
      id: 4,
    },
    {
      name: "Waxing",
      price: "KSH 2,000",
      service: "waxing",
      service_price: 2000,
      id: 5,
    },
    {
      name: "Machine Polish",
      price: "KSH 1,500",
      service: "machine_polish",
      service_price: 1500,
      id: 6,
    },
    {
      name: "Buffing",
      price: "KSH 4,000",
      service: "buffing",
      service_price: 4000,
      id: 7,
    },
    {
      name: "Aircon Check & Refill",
      price: "KSH 2000",
      service: "aircon_check_refill",
      service_price: 2000,
      id: 8,
    },
    {
      name: "Carpet Cleaning",
      price: "KSH 1000",
      service: "carpet_cleaning",
      service_price: 1000,
      id: 9,
    },
    {
      name: "Home & Office Cleaning",
      price: "KSH 1500",
      service: "home_and_office_cleaning",
      service_price: 1500,
      id: 10,
    },
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
            key={service.id}
            name={service.name}
            price={service.price}
            isHighlighted={selectedService == service.id}
            onSelect={() => setSelectedService(service.id)}
          />
        ))}
        <Link href={"/(user)/carwash/booking"} asChild>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={confirmDetails}
          >
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
