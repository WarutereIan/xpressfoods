import { View, FlatList, ActivityIndicator, Text } from "react-native";

import { ProductListItem } from "@/src/components/ProductListItem";

import { useProductList } from "@/src/api/products";
import { ProductListCard } from "@/src/components/ProductListCard";
import HomeCard from "@/src/components/HomeCard";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>failed to fetch products</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <HomeCard />}
      //numColumns={1}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      //columnWrapperStyle={{ gap: 10 }}
    />
  );
}
