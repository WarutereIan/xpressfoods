import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Menu" }} />
      <Stack.Screen name="mainprices" options={{ title: "Main Prices" }} />
      <Stack.Screen name="autocare" options={{ title: "Main Prices" }} />
    </Stack>
  );
}
