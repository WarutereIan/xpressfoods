import React from "react";
import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";
import Colors from "@/src/constants/Colors";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { useColorScheme } from "react-native";

const AuthLayout = () => {
  const { session, profile } = useAuth();

  const colorScheme = useColorScheme();

  console.log(profile);

  if (profile != null && session != null) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="admin-location" options={{ headerShown: false }} />
      <Stack.Screen name="select-location" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
