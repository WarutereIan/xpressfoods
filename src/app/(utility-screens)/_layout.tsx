import React from "react";
import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";
import Colors from "@/src/constants/Colors";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { useColorScheme } from "react-native";

const AuthLayout = () => {
  const { session } = useAuth();

  const colorScheme = useColorScheme();

  if (!session) {
    return <Redirect href={"/"} />;
  }

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default AuthLayout;
