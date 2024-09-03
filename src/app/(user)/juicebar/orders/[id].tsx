import { useLocalSearchParams, Stack } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useUpdateOrderSubscription } from "@/src/api/orders/subscription";
import { useOrderDetails } from "@/src/api/juicebar/orders";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();

  const id = parseFloat(typeof idString === "string" ? idString : "");

  const { data: order, isLoading, error } = useOrderDetails(id);

  console.log(order);

  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>failed to fetch products</Text>;
  }

  if (!order) {
    return <Text>Not Found</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />
      <FlatList
        data={order.juicebar_order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}
