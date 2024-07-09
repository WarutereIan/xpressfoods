import { View, Text, Image, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

export const ProductListItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  price: { color: Colors.light.tint, fontWeight: "bold" },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
});
