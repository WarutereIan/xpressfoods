import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useProductList } from "../api/products";
import { ProductListItem } from "./ProductListItem";
import { ProductListCard } from "./ProductListCard";

const HomeCard = () => {
  const { data: products, error, isLoading } = useProductList();

  //get only the top 2 products for now
  let prods;
  if (products) {
    prods = [products[0], products[1]];
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exclusive Offer</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        {products?.map((product, index) => {
          return <ProductListItem product={product} />;
        })}
      </ScrollView>
      {/*  <FlatList
          data={products}
          style={{ flex: 1 }}
          renderItem={({ item }) => <ProductListCard product={item} />}
          //initialNumToRender={2}
          horizontal={true}
          contentContainerStyle={{ paddingRight: 10 }}
          //columnWrapperStyle={{ gap: 10 }}
        /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "green",
  },
  cardsContainer: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "space-between",
  },
});

export default HomeCard;
