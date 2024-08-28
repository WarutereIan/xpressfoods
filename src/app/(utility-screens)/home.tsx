import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";

import CarwashSvg from "@/assets/images/services/carwash.svg";
import { useAuth } from "@/src/providers/AuthProvider";

const services = [
  {
    name: "ULTRA DETAILING CAR WASH",
    image: require("@/assets/images/services/carwash.png"),
    isLive: true,
    onPress: () => {
      router.navigate("/(user)/carwash");
    },
    CarwashSvg,
  },
  {
    name: "Jirani",
    image: require("@/assets/images/services/jirani.png"),
    isLive: false,
  },
  {
    name: "JUICE BAR",
    image: require("@/assets/images/services/juice-bar.png"),
    isLive: false,
  },
  {
    name: "OSHA",
    image: require("@/assets/images/services/osha.png"),
    isLive: false,
  },
];

const HomeScreen = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/services/services-bg.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>What can we do for you today?</Text>
        </View>
        <View style={styles.servicesContainer}>
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceItem}
              onPress={service.onPress}
            >
              <Image source={service.image} style={styles.serviceImage} />
              {!service.isLive && (
                <View style={styles.serviceOverlay}>
                  <Text style={styles.serviceName}>Coming Soon</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {/*  <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.servicesContainer}
        /> */}
        {/* <View style={styles.footer}>
            <Text style={styles.footerText}>BY WATEKI</Text>
          </View> */}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  header: {
    padding: 20,
    marginTop: 70,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "500",
    color: "white",
    lineHeight: 40,
    fontFamily: "GilroyBold",
  },
  servicesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
    marginTop: 20,
  },
  serviceItem: {
    width: "45%",
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 50,
    overflow: "hidden",
  },
  serviceImage: {
    width: "auto",
    height: "auto",
    //padding: 50,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  serviceOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
  },
  serviceName: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 12,
  },
});

export default HomeScreen;
