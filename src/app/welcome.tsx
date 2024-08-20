import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/jiraniBg.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        {/* <Image
          source={require("./path-to-your-carrot-icon.png")}
          style={styles.icon}
        /> */}
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subText}>to our store</Text>
        <Text style={styles.descriptionText}>
          Get your groceries in as fast as one hour
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.navigate("/(auth)/sign-up");
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "800",
    color: "white",
  },
  subText: {
    fontSize: 36,
    fontWeight: "800",
    color: "white",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 19,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
