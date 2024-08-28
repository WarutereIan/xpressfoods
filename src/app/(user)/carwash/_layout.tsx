import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="mainprices" options={{ headerShown: false }} />
      <Stack.Screen name="autocare" options={{ headerShown: false }} />
      <Stack.Screen name="booking" options={{ headerShown: false }} />
      <Stack.Screen name="mybookings" options={{ headerShown: false }} />
      <Stack.Screen name="review" options={{ headerShown: false }} />
      <Stack.Screen name="finalScreen" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
    </Stack>
  );
}
