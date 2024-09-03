import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import Button from "@/src/components/Button";

const BottomModal = ({ total, onPress }) => {
  return (
    <View style={styles.bottomSheet}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "MontserratBold",
        }}
      >
        Order Details
      </Text>
      <TextInput
        placeholder="Delivery Note and Address 😊"
        style={styles.input}
      />
      <Text style={{ fontFamily: "MontserratBold", fontSize: 16 }}>Total:</Text>
      <Text style={{ fontFamily: "MontserratBold", fontSize: 16 }}>
        ${total}
      </Text>
      <Button text="Place Order" onPress={onPress} />
    </View>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    backgroundColor: "#ada8a8",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  input: {
    width: "100%",
    marginVertical: 15,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bcbcbc",
    paddingHorizontal: 15,
  },
});
