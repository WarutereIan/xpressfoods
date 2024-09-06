import { Text, FlatList, ActivityIndicator } from "react-native";

import { useAdminOrderList } from "@/src/api/juicebar/orders";
import { useInsertOrderSubscription } from "@/src/api/juicebar/orders/subscription";
import OrderListItem from "../../../../../components/juicebar/components/OrderListItem";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>failed to fetch products</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
}
