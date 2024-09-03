import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";

import { Link } from "expo-router";
//import { defaultPizzaImage } from "./ProductListItem";
import { FontAwesome } from "@expo/vector-icons";
import { CartItem } from "@/src/types";
import { useCart } from "@/src/providers/JuiceBarProvider";
import RemoteImage from "@/src/components/RemoteImage";
import Colors from "@/src/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#b56a35", "#2e1809"]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 0.7 }}
      />
      <RemoteImage
        path={cartItem.product.image}
        fallback=""
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
          <Text style={{ color: "white" }}>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    height: "120%",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
    color: "white",
  },
  price: {
    color: "white",
    fontWeight: "500",
  },
});

export default CartListItem;
