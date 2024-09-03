import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  ImageBackground,
} from "react-native";

import { useMyOrderList } from "@/src/api/juicebar/orders";
import OrderListItem from "../components/OrderListItem";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>failed to fetch products</Text>;
  }

  return (
    <View style={{ backgroundColor: "#8B4513", height: "100%" }}>
      <ImageBackground
        source={require("@/assets/images/abstract_wm.jpeg")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View
          style={{ backgroundColor: "rgba(139, 69, 19,0.9)", height: "100%" }}
        >
          <View
            style={{ alignItems: "center", marginVertical: 10, padding: 20 }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: "900",
                //fontFamily: "MontserratBold",
              }}
            >
              We've got history..
            </Text>
          </View>

          <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
