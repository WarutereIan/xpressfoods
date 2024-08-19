import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

const index = () => {
  const { loading, session, profile, isAdmin } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)/carwashAdmin"} />;
  }

  if (profile?.group === "ADMIN") {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <Link href={"/(user)"} asChild>
          <Button text="User" />
        </Link>
        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>
      </View>
    );
  }

  return <Redirect href="/(user)" />;
};

export default index;
