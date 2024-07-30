import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Product } from "../types";
import Colors from "../constants/Colors";
import { Link, useSegments } from "expo-router";
import RemoteImage from "./RemoteImage";

type ProductListItemProps = {
  product: Product;
};

export const defaultPizzaImage = "";

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          //have a default fallback image
          fallback=""
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  separator: {
    marginVertical: 10,
    height: 0.1,
    width: "80%",
  },
  price: { color: Colors.light.tint, fontWeight: "bold" },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  container: {
    backgroundColor: "#E2E2E2",
    padding: 5,
    borderRadius: 10,
    flex: 1,
    maxWidth: "50%",
    textAlign: "center",
  },
});
