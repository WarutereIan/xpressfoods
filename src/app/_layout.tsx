import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/src/components/useColorScheme";
import CartProvider from "../providers/CartProvider";
import QueryProvider from "../providers/QueryProviders";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CarwashProvider from "../providers/CarwashProvider";
import AuthProvider from "../providers/AuthProvider";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import NotificationProvider from "../providers/NotificationProvider";
import { Pressable } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/Gilroy-Regular.ttf"),
    //SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    Gilroy: require("../../assets/fonts/Gilroy-Regular.ttf"),
    GilroyBold: require("../../assets/fonts/Gilroy-Bold.ttf"),
    Montserrat: require("@expo-google-fonts/montserrat/Montserrat_400Regular.ttf"),
    MontserratBold: require("@expo-google-fonts/montserrat/Montserrat_700Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <QueryProvider>
            <NotificationProvider>
              <CarwashProvider>
                <CartProvider>
                  <AutocompleteDropdownContextProvider>
                    <Stack
                      screenOptions={{
                        /* headerRight: () => (
                          <Link href="/profile" asChild>
                            <Pressable>
                              {({ pressed }) => (
                                <FontAwesome
                                  name="shopping-cart"
                                  size={25}
                                  color={"green"}
                                  style={{
                                    marginRight: 15,
                                    opacity: pressed ? 0.5 : 1,
                                  }}
                                />
                              )}
                            </Pressable>
                          </Link>
                        ), */
                        headerShown: false,
                      }}
                    >
                      <Stack.Screen
                        name="(user)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(auth)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(admin)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="welcome"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="profile"
                        options={{ presentation: "modal", headerShown: false }}
                      />
                      <Stack.Screen
                        name="(utility-screens)"
                        options={{ headerShown: false }}
                      />
                    </Stack>
                  </AutocompleteDropdownContextProvider>
                </CartProvider>
              </CarwashProvider>
            </NotificationProvider>
          </QueryProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
