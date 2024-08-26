import { useCarwash } from "@/src/providers/CarwashProvider";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";

const ServiceItem = ({ name, price }) => (
  <>
    <Text style={styles.serviceName}>{name}</Text>
    <Text style={styles.servicePrice}>{price}</Text>
  </>
);

const AutoCareServicesScreen = () => {
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [highlightedServices, setHighlightedServices] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(true);

  const { setMoreServices, getCarMake } = useCarwash();

  const carMake = getCarMake();

  const carClass = carMake.class;

  let services = [];

  const servicesSaloon = [
    {
      name: "Engine Steam Wash",
      price: "KSH 1,500",
      service: "engine_steam_wash",
      service_price: 1500,
      id: 1,
    },
    {
      name: "Vacuuming & Shampooing",
      price: "KSH 2,000",
      service: "vacuuming_and_shampooing",
      service_price: 2000,
      id: 2,
    },
    {
      name: "Vacuuming ( Dry )",
      price: "KSH 200",
      service: "vacuuming_dry",
      service_price: 200,
      id: 3,
    },
    {
      name: "Leather Care",
      price: "KSH 500",

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
      price: "KSH 2,000",
      service: "machine_polish",
      service_price: 2000,
      id: 6,
    },
    {
      name: "Hand Polish",
      price: "KSH 800",
      service: "machine_polish",
      service_price: 800,
      id: 11,
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
      price: "KSH 4,000",
      service: "aircon_check_refill",
      service_price: 4000,
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
  const servicesSUV = [
    {
      name: "Engine Steam Wash",
      price: "KSH 2,000",
      service: "engine_steam_wash",
      service_price: 2000,
      id: 1,
    },
    {
      name: "Vacuuming & Shampooing",
      price: "KSH 2,500",
      service: "vacuuming_and_shampooing",
      service_price: 2500,
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
      price: "KSH 700",
      service: "leather_care",
      service_price: 700,
      id: 4,
    },
    {
      name: "Waxing",
      price: "KSH 3,000",
      service: "waxing",
      service_price: 3000,
      id: 5,
    },
    {
      name: "Machine Polish",
      price: "KSH 3,000",
      service: "machine_polish",
      service_price: 3000,
      id: 6,
    },
    {
      name: "Hand Polish",
      price: "KSH 1,000",
      service: "machine_polish",
      service_price: 1000,
      id: 11,
    },
    {
      name: "Buffing",
      price: "KSH 5,000",
      service: "buffing",
      service_price: 5000,
      id: 7,
    },
    {
      name: "Aircon Check & Refill",
      price: "KSH 4000",
      service: "aircon_check_refill",
      service_price: 4000,
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

  carClass == "Saloon" ? (services = servicesSaloon) : (services = servicesSUV);

  const confirmDetails = () => {
    while (!isUpdating) {
      let finalList: any[] = [];

      selectedServices?.map((selectedService: any) => {
        finalList.push({
          serviceName: selectedService.service,
          carType: carMake.class,
          carModel: carMake.model,
          price: selectedService.service_price,
          title: selectedService.name,
        });
      });

      setMoreServices(finalList);

      setIsUpdating(true);

      return;
    }
  };

  useEffect(() => {
    setIsUpdating(false);
  }, [selectedServices]);

  const removeServiceFromList = (name: string) => {
    //search for service name and service in respective arrays, then remove them
    //for highlighted service
    const highlighted = [...highlightedServices];
    const selected = [...selectedServices];

    let objIndex = -1;

    selected.map((obj, index) => {
      if (obj.service == name) {
        objIndex = index;
      }
    });

    if (objIndex > -1) {
      selected.splice(objIndex, 1);
      setSelectedServices([...selected]);
    }

    highlighted.splice(highlighted.indexOf(name), 1);

    setHighlightedServices([...highlighted]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.backButton}
          source={require(`@/assets/images/carwashlogo.png`)}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>More Auto Care Services</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {services.map((service, index) => (
          <TouchableOpacity
            style={[
              styles.serviceItem,
              highlightedServices.includes(service.service) &&
                styles.highlightedItem,
            ]}
            onPress={() => {
              if (highlightedServices.includes(service.service)) {
                //get index of th object in the array

                setIsUpdating(true);
                removeServiceFromList(service.service);
              } else {
                setHighlightedServices([
                  ...highlightedServices,
                  service.service,
                ]);
                setIsUpdating(true);
                setSelectedServices([...selectedServices, service]);
              }
            }}
          >
            <ServiceItem name={service.name} price={service.price} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Link href={"/(user)/carwash/booking"} asChild>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={confirmDetails}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Link>
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
    marginBottom: 10,
    marginTop: 60,
    paddingLeft: 20,
  },
  backButton: {
    width: 100,
    height: 100,
    //borderRadius: 20,
    //backgroundColor: "#ccc",
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
    marginHorizontal: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AutoCareServicesScreen;
