import { useCarwash } from "@/src/providers/CarwashProvider";
import { Link, useRouter, useSegments } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
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
  const [selectedService, setSelectedService] = useState(100);

  const { addService, getCarMake, clearServices } = useCarwash();

  const carMake = getCarMake();

  const carClass = carMake.class;

  const router = useRouter();

  let services = [];

  const servicesSaloon = [
    {
      id: 1,
      title: "Basic Wash",
      description: "• Body Wash • Tyre Wash",
      price: "KSH 300",
      service: "basic_wash",
      service_price: 300,
    },
    {
      id: 2,
      title: "SuperWash",
      description: "• Basic Wash • Interior Care\n• Vacuum • Dashboard Polish",
      price: "KSH 2000",
      service: "super_wash",
      service_price: 2000,
    },
    {
      id: 3,
      title: "Deluxe Wash",
      description: "Super Wash • Auto Detailing",
      price: "KSH 3,000",
      service: "deluxe_wash",
      service_price: 3000,
    },
  ];
  const servicesSUV = [
    {
      id: 1,
      title: "Basic Wash",
      description: "• Body Wash • Tyre Wash",
      price: "KSH 400",
      service: "basic_wash",
      service_price: 400,
    },
    {
      id: 2,
      title: "SuperWash",
      description: "• Basic Wash • Interior Care\n• Vacuum • Dashboard Polish",
      price: "KSH 4000",
      service: "super_wash",
      service_price: 4000,
    },
    {
      id: 3,
      title: "Deluxe Wash",
      description: "Super Wash • Auto Detailing",
      price: "KSH 5,000",
      service: "deluxe_wash",
      service_price: 5000,
    },
  ];

  carClass == "Saloon" ? (services = servicesSaloon) : (services = servicesSUV);

  const segments = useSegments();

  const confirmDetailsOnContinue = () => {
    if (selectedService == 100) {
      clearServices();
      return router.navigate(`${segments[0]}/carwash/booking`);
    }

    addService({
      serviceName: services[selectedService - 1].service,
      carType: carMake.class,
      carModel: carMake.model,
      price: services[selectedService - 1].service_price,
      title: services[selectedService - 1].title,
    });

    router.navigate("/(user)/carwash/booking");
  };
  const confirmDetails = () => {
    if (selectedService != 100)
      return addService({
        serviceName: services[selectedService - 1].service,
        carType: carMake.class,
        carModel: carMake.model,
        price: services[selectedService - 1].service_price,
        title: services[selectedService - 1].title,
      });
    return clearServices();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={require("@/assets/images/carwashlogo.png")} />
        </View>

        {services.map((service) => (
          <ServiceOption
            key={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            isSelected={selectedService === service.id}
            onSelect={() => {
              selectedService === service.id
                ? setSelectedService(100)
                : setSelectedService(service.id);
            }}
          />
        ))}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={confirmDetailsOnContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <Link href={"/(user)/carwash/autocare"} asChild>
          <TouchableOpacity
            style={styles.moreServicesButton}
            onPress={confirmDetails}
          >
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
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
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
