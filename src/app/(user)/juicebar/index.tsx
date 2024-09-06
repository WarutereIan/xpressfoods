import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCart } from "@/src/providers/JuiceBarProvider";
import { router } from "expo-router";
import { PizzaSize } from "@/src/types";
import { useProductList } from "@/src/api/juicebar/products";
import RemoteImage from "@/src/components/RemoteImage";

const categories = ["Shakes", "Coffee", "Juice", "Smoothies"];

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const smoothies = [
  {
    id: "1",
    name: "Strawberry Smoothie",
    price: 10,
    image: "@/assets/images/STRAWBERRY.jpg",
    //need category
    category: "smoothies",
    imageLoad: require("@/assets/images/STRAWBERRY.jpg"),
  },
  {
    id: "2",
    name: "Mango Smoothie",
    price: 15,
    image: "@/assets/images/STRAWBERRY.jpg",
    category: "smoothies",
    imageLoad: require("@/assets/images/STRAWBERRY.jpg"),
  },
  {
    id: "3",
    name: "Green Smoothie",
    price: 12,
    image: "@/assets/images/STRAWBERRY.jpg",
    category: "smoothies",
    imageLoad: require("@/assets/images/STRAWBERRY.jpg"),
  },
];

const StrawberrySmoothieCard = ({ item, onPress }) => {
  let { name, price, image } = item;

  return (
    <TouchableOpacity onPress={onPress} style={styles3.card}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#8B4513", "white"]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.2, y: 0.7 }}
      />
      <RemoteImage path={item.image} fallback="" style={styles3.image} />
      {/*  <Image source={item.imageLoad} style={styles3.image} /> */}
      <View style={styles3.content}>
        {item.name.split(" ").map((word, index) => (
          <Text key={index} style={styles3.title}>
            {word}
          </Text>
        ))}

        <Text style={styles3.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

/* const SmoothieCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={item.image} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardPrice}>${item.price}</Text>
    </View>
    <TouchableOpacity style={styles.favoriteButton}>
      <Ionicons name="heart-outline" size={24} color="#000" />
    </TouchableOpacity>
  </TouchableOpacity>
); */
/* const SmoothieCard = ({ item }) => {
  let { name, price, image } = item;

  return (
    <View style={styles2.card}>
      <Image source={image} style={styles2.image} />
      <View style={styles2.infoContainer}>
        <Text style={styles2.name}>{name}</Text>
        <Text style={styles2.price}>${price}</Text>
      </View>
      <TouchableOpacity style={styles2.favoriteButton}>
        <Ionicons name="heart-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};
 */
const SmoothieDetail = ({ item, visible, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();

  const addToCart = () => {
    addItem(item, selectedSize, quantity);

    return router.push("/(user)/juicebar/cart");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient
            // Background Linear Gradient
            colors={["#8B4513", "white"]}
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.3, y: 0.4 }}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <RemoteImage
            path={item.image}
            fallback=""
            style={styles.detailImage}
          />
          {/*   <Image source={item.imageLoad} style={styles.detailImage} /> */}
          <Text style={styles.detailTitle}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.5/5</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.detailPrice}>Price ${item.price}</Text>

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  backgroundColor: "#8B4513",
                  borderRadius: 5,
                }}
                onPress={() => {
                  if (quantity == 1) return;
                  setQuantity(quantity - 1);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "900",
                    //marginHorizontal: 10,
                  }}
                >
                  {" "}
                  -{" "}
                </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "900" }}>
                {quantity}
              </Text>
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  backgroundColor: "#8B4513",
                  borderRadius: 5,
                }}
                onPress={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "900" }}
                >
                  {" "}
                  +{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.detailDescription}>{item.description}</Text>

          <Text style={{ marginBottom: 10, fontSize: 15, fontStyle: "italic" }}>
            Selected Size: {selectedSize}
          </Text>

          <View style={styles.sizes}>
            {sizes.map((size) => (
              <Pressable
                onPress={() => {
                  setSelectedSize(size);
                }}
                style={[
                  styles.sizes,
                  {
                    backgroundColor:
                      selectedSize === size ? "#8B4513" : "white",
                  },
                ]}
                key={size}
              >
                <Text
                  style={[
                    styles.sizeText,
                    { color: selectedSize === size ? "white" : "grey" },
                    {},
                  ]}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>

          <TouchableOpacity style={styles.buyButton} onPress={addToCart}>
            <Text style={styles.buyButtonText}>Add to Basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const VerticalCategoryButton = ({ category, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.categoryButton,
      isSelected && styles.selectedCategory,
      { transform: [{ rotate: "0deg" }] },
    ]}
    onPress={onPress}
  >
    <Text
      style={[styles.categoryButtonText, { transform: [{ rotate: "0deg" }] }]}
    >
      {category}
    </Text>
  </TouchableOpacity>
);

const App = () => {
  const { data: products, error, isLoading } = useProductList();

  const [selectedCategory, setSelectedCategory] = useState("Smoothies");
  const [selectedSmoothie, setSelectedSmoothie] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState<any[] | undefined>(
    products?.filter((product) => product.category == "smoothies")
  );

  useEffect(() => {
    setProductCategories();
  }, [selectedCategory]);

  //fn to set selected products
  const setProductCategories = () => {
    let selected = products?.filter(
      (product) => product.category == selectedCategory.toLowerCase()
    );
    setSelectedProducts(selected);
  };

  /* let selectedProducts = products?.filter(
    (product) => product.category == selectedCategory
  ); */

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>failed to fetch products</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={styles.welcomeText}>Welcome!</Text>

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => {
                return router.navigate("/(user)/juicebar/cart");
              }}
            >
              <Ionicons name="basket" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => {
                return router.navigate("/(user)/juicebar/orders");
              }}
            >
              <Ionicons name="menu" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.categoryTitle}>{selectedCategory}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.leftColumn}>
          {categories.map((category) => (
            <VerticalCategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onPress={() => {
                setSelectedCategory(category);

                console.log(selectedProducts);
              }}
            />
          ))}
        </View>
        <View style={styles.separator} />
        <View style={styles.rightColumn}>
          <FlatList
            data={selectedProducts}
            renderItem={({ item }) => (
              <StrawberrySmoothieCard
                item={item}
                onPress={() => setSelectedSmoothie(item)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      {selectedSmoothie && (
        <SmoothieDetail
          item={selectedSmoothie}
          visible={!!selectedSmoothie}
          onClose={() => setSelectedSmoothie(null)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8B4513",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    borderRadius: 5,
    //width: 5,
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,

    height: "110%",
  },
  header: {
    backgroundColor: "#6B3E26",
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftColumn: {
    width: 80,
    backgroundColor: "#6B3E26",
    paddingVertical: 20,

    //alignItems: "flex-end",
    justifyContent: "space-evenly",
  },
  rightColumn: {
    flex: 1,
    backgroundColor: "#8B4513",
    padding: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  separator: {
    width: 3,
    backgroundColor: "#FFF",
    marginRight: 10,
  },
  categoryButton: {
    width: "100%",
    height: 110,
    justifyContent: "center",
    alignItems: "center",

    //marginBottom: 20,
  },
  selectedCategory: {
    backgroundColor: "#8B4513",
    borderRadius: 5,
  },
  categoryButtonText: {
    color: "#FFF",
    fontSize: 12,
    justifyContent: "flex-end",
    textAlign: "justify",
    fontWeight: "800",
    overflow: "hidden",
    //textDecorationLine: "line-through",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    overflow: "hidden",
  },
  cardImage: {
    width: 80,
    height: 80,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardPrice: {
    fontSize: 14,
    color: "#666",
  },
  favoriteButton: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  detailImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
    color: "#5c310f",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
  },
  detailPrice: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
    color: "#5c310f",
  },
  detailDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    fontWeight: "600",
  },
  buyButton: {
    backgroundColor: "#8B4513",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
  },
});

const styles3 = StyleSheet.create({
  card: {
    //background-image: linear-gradient("180deg", "red", "yellow"),
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 200,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    //width: "80%",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  content: {
    //alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 0,
    flexBasis: "100%",
    color: "#5c310f",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5c310f",
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default App;
