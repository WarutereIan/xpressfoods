import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { ProductListItem } from "@/src/components/ProductListItem";
import { useProductList } from "@/src/api/products";
import { ProductListCard } from "@/src/components/ProductListCard";

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
      renderItem={({ item }) => <ProductListCard product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
