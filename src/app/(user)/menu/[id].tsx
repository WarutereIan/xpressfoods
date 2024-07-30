import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from "react-native";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { useProduct } from "@/src/api/products";
import { ActivityIndicator } from "react-native";
import RemoteImage from "@/src/components/RemoteImage";
import { AntDesign } from "@expo/vector-icons";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();

  const id = parseFloat(typeof idString === "string" ? idString : "");

  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const [opened, setOpened] = useState(false);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>failed to fetch products</Text>;
  }

  const addToCart = () => {
    addItem(product, selectedSize);
    router.push("/cart");
  };

  function toggleAccordion() {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "easeIn", property: "opacity" },
      update: { type: "linear", springDamping: 0.3, duration: 250 },
    });
    setOpened(!opened);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />

      <RemoteImage path={product.image} fallback="" style={styles.image} />

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>1kg</Text>

        <Text style={styles.price}>${product.price}</Text>

        <TouchableWithoutFeedback onPress={toggleAccordion}>
          <View style={styles.header}>
            <Text style={styles.title}>title</Text>
            <AntDesign name={opened ? "caretup" : "caretdown"} size={16} />
          </View>
        </TouchableWithoutFeedback>

        {opened && (
          <View style={[styles.content]}>
            <Text style={styles.details}>details</Text>
          </View>
        )}

        <Button onPress={addToCart} text="Add to Cart" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  productName: {
    fontFamily: "MontserratBold",
    fontSize: 24,
    marginTop: 10,
  },
  productDescription: {
    fontFamily: "Montserrat",
    fontSize: 16,
    marginTop: 5,
  },

  image: {
    width: "100%",
    aspectRatio: 1.2,
    borderRadius: 25,
  },
  price: {
    //fontWeight: "bold",
    fontSize: 24,
    fontFamily: "MontserratBold",

    textAlign: "center",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  details: {
    opacity: 0.65,
  },
  title: {
    textTransform: "capitalize",
  },
  content: {
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProductDetailsScreen;
