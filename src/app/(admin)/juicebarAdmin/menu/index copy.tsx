import { View, FlatList, Text, ActivityIndicator } from "react-native";

import { ProductListCard } from "@/src/components/ProductListCard";
import { useProductList } from "@/src/api/juicebar/products";
import { ProductListItem } from "../../../../components/juicebar/components/ProductListItem";

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
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
