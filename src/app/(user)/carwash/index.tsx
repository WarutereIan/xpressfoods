import { useAuth } from "@/src/providers/AuthProvider";
import { useCarwash } from "@/src/providers/CarwashProvider";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import DropdownInput, { Dropdown } from "react-native-element-dropdown";

import { Cars } from "@/assets/data/cars";

const BookingScreen = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [carBrand, setCarBrand] = useState("");

  const [value, setValue] = useState<any>(null);

  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState<any>(Cars);

  const router = useRouter();

  const { setCarMake } = useCarwash();

  const { session } = useAuth();

  const handleSearch = (text: string) => {
    // Filter items based on search text
    const filteredItems = data.filter((item) =>
      item["Identification.Model Year"]
        .toLowerCase()
        .includes(text.toLowerCase())
    );

    // If no matches found, add the search text as a new item
    let newItem: any[] = [];
    if (filteredItems.length === 0) {
      newItem.push({
        "Identification.Model Year": text,
        "Identification.ID": text,
      });
    }

    setData([...data, ...newItem]);
  };

  const confirmDetails = () => {
    setCarBrand(value);

    if (selectedClass.length == 0 || carBrand.length == 0) {
      return Alert.alert("Attention", "Please enter all Details");
    }
    setCarMake({ class: selectedClass, model: carBrand });
    router.navigate("/(user)/carwash/mainprices");
  };

  const viewBookings = () => {
    //check if user logged is logged in
    if (!session) {
      return Alert.alert(
        "Attention",
        "You need to be logged in for user history"
      );
    }
    router.navigate("/(user)/carwash/mybookings");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/offer.png")}
        style={styles.jeepImage}
      />

      <View style={styles.bookingForm}>
        <View style={styles.ultraDetailingBadge}>
          <Image source={require("@/assets/images/carwashlogo.png")} />
        </View>
        <Text style={styles.bookingTitle}>Effortless</Text>
        <Text style={styles.bookingSubtitle}>Booking</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedClass}
            onValueChange={(itemValue) => setSelectedClass(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Class" value="" />
            <Picker.Item label="Saloon" value="Saloon" />
            <Picker.Item label="SUV" value="SUV" />
          </Picker>
        </View>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "8bc34a" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="Identification.ID"
          valueField="Identification.Model Year"
          placeholder={!isFocus ? "Select Car Model" : "..."}
          searchPlaceholder="Search or type to add..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item["Identification.Model Year"]);
            setCarBrand(value);
            //setIsFocus(false);
          }}
          onChangeText={(text) => handleSearch(text)}
        />
        {/* {value && <Text style={styles.selectedItem}>Selected: {value}</Text>} */}

        <TouchableOpacity style={styles.bookButton} onPress={confirmDetails}>
          <Text style={styles.bookButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingsButton} onPress={viewBookings}>
          <Text style={styles.bookButtonText}>My Bookings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    justifyContent: "center",
  },
  offerCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  offerText: {
    color: "white",
    fontSize: 18,
  },
  discountText: {
    color: "#7CFC00",
    fontSize: 36,
    fontWeight: "bold",
  },
  subText: {
    color: "white",
    fontSize: 14,
  },
  jeepImage: {
    width: "100%",
    height: 150,
    resizeMode: "stretch",
    borderRadius: 15,
    marginBottom: 10,
  },
  bookingForm: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  ultraDetailingBadge: {
    //backgroundColor: "#333",
    borderRadius: 20,
    padding: 10,
    //alignSelf: "flex-start",
    marginBottom: 10,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  bookingTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bookingSubtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8bc34a",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: "#8bc34a",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  bookingsButton: {
    backgroundColor: "#8bc34a",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  dropdown: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 10,
  },
  placeholderStyle: {
    color: "#aaa",
    fontSize: 16,
  },
  selectedTextStyle: {
    color: "#333",
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: "#333",
  },
});

export default BookingScreen;
