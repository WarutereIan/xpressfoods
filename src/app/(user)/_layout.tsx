import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { Link, Redirect, Stack, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { useAuth } from "@/src/providers/AuthProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
}) {
  return <Feather size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  {
    /* <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null, headerShown: false }} />

      <Tabs.Screen
        name="carwash"
        options={{
          title: "Carwash",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
        }}
      />
    </Tabs> */
  }

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <Feather
                  name="settings"
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
      <Stack.Screen name="index" options={{ headerShown: true, title: "" }} />
      <Stack.Screen
        name="carwash"
        options={{ headerShown: false, title: "" }}
      />
    </Stack>
  );
}
