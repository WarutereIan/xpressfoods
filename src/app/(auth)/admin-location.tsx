import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useInsertUserProfile } from "@/src/api/user";
import { useAuth } from "@/src/providers/AuthProvider";
import { router } from "expo-router";

const LocationSelectionScreen = () => {
  const [zone, setZone] = useState("Tilisi");
  const [area, setArea] = useState("");

  const { userName, session, refreshSession } = useAuth();
  const { mutate: insertProfile } = useInsertUserProfile();

  const onPress = () => {
    if (!zone) {
      return Alert.alert("Please Provide Location Details");
    }

    insertProfile(
      {
        name: userName,
        location: zone,
        area: zone,
        user_id: session?.user.id,
        group: "ADMIN",
        admin_app: "carwash",
      },
      {
        onSuccess() {
          refreshSession();
          router.navigate("/");
        },
        onError(error) {
          return Alert.alert(error.message);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/location-icon.png")}
        style={styles.icon}
      />

      <Text style={styles.title}>Select Your Location</Text>
      {/* <Text style={styles.subtitle}>
        Swithch on your location to stay in tune with what's happening in your
        area
      </Text> */}

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Your Zone</Text>
        <Picker
          selectedValue={zone}
          onValueChange={(itemValue) => setZone(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Tilisi" value="Tilisi" />
          <Picker.Item label="Other" value="Other" />
          {/* Add more zones as needed */}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        {/*   <Text style={styles.label}>Your Area</Text> */}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={onPress}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 30,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LocationSelectionScreen;
