import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text } from "react-native";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "Details" }} />
      <Text>Product Details</Text>
    </View>
  );
};

export default ProductDetailsScreen;
