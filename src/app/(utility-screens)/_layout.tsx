import React from "react";
import { Link, Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";
import Colors from "@/src/constants/Colors";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { Pressable, useColorScheme } from "react-native";
import { Feather } from "@expo/vector-icons";

const AuthLayout = () => {
  const { session } = useAuth();

  const colorScheme = useColorScheme();

  if (!session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerLeft: () => (
          <Link href="/" asChild>
            <Pressable>
              {({ pressed }) => (
                <Feather
                  name="home"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
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
    ></Stack>
  );
};

export default AuthLayout;
