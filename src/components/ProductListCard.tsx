import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Product } from "../types";
import Colors from "../constants/Colors";
import { Link, useSegments } from "expo-router";
import RemoteImage from "./RemoteImage";

type ProductListItemProps = {
  product: Product;
};

export const defaultPizzaImage = "";

export const ProductListCard = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles2.card}>
        <RemoteImage
          path={product.image}
          //have a default fallback image
          fallback=""
          style={styles2.image}
          resizeMode="contain"
        />
        <View style={styles2.textContainer}>
          <Text style={styles2.title}>{product.name}</Text>
          <Text style={styles2.quantity}>1 kg</Text>
        </View>

        <View style={styles2.priceContainer}>
          <Text style={styles2.price}>${product.price}</Text>
          <TouchableOpacity style={styles2.addButton}>
            <Text style={styles2.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
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

const styles2 = StyleSheet.create({
  card: {
    maxWidth: "50%",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    //elevation: 3,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  textContainer: {},
  title: {
    fontSize: 18,
    //fontWeight: "regular",
    fontFamily: "MontserratBold",
  },
  quantity: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    //fontWeight: "bold",
    marginRight: 30,
    fontFamily: "Montserrat",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
