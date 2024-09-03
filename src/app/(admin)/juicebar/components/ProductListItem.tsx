import { View, Text, Image, StyleSheet, Pressable } from "react-native";

import { Link, useSegments } from "expo-router";
import { Product } from "@/src/types";
import RemoteImage from "@/src/components/RemoteImage";
import Colors from "@/src/constants/Colors";

type ProductListItemProps = {
  product: Product;
};

export const defaultPizzaImage = "";

export const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  

  return (
    <Link href={`/${segments[0]}/juicebar/menu/${product.id}`} asChild>
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
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 5,
  },
  separator: {
    marginVertical: 10,
    height: 0.1,
    width: "80%",
  },
  price: { color: Colors.light.tint, fontWeight: "600", fontSize: 16 },
  image: {
    width: "100%",
    height: 150,
  },
  container: {
    backgroundColor: "#E2E2E2",
    padding: 5,
    borderRadius: 10,
    flex: 1,

    textAlign: "center",
    width: "100%",
  },
});
