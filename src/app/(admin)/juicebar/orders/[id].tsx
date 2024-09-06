import { useLocalSearchParams, Stack } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { OrderStatus, OrderStatusList } from "@/src/types";
import Colors from "@/src/constants/Colors";

import OrderListItem from "@/src/components/juicebar/components/OrderListItem";
import { useOrderDetails, useUpdateOrder } from "@/src/api/juicebar/orders";
import OrderItemListItem from "@/src/components/juicebar/components/OrderItemListItem";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();

  const id = parseFloat(typeof idString === "string" ? idString : "");

  const { mutate: updateOrder } = useUpdateOrder();

  const updateStatus = async (status: OrderStatus) => {
    updateOrder({ id, status: status });
  };

  const { data: order, isLoading, error } = useOrderDetails(id);

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
    <View
      style={{ padding: 10, gap: 20, backgroundColor: "brown", height: "100%" }}
    >
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />
      <Text style={{ fontWeight: "600", textAlign: "center", fontSize: 16 }}>
        {" "}
        Order Items:
      </Text>
      <FlatList
        data={order.juicebar_order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}
