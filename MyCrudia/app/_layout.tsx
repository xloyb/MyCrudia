import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useColorScheme } from "@/components/useColorScheme";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Login from "./screens/Login";
import { Button, GestureResponderEvent } from "react-native";

const PageRedirect = createNativeStackNavigator();

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { authState, onLogout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState?.authenticated) {
      router.replace("/(tabs)");
    }
  }, [authState?.authenticated]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {authState?.authenticated ? (
        <Stack>
          {/* <Stack.Screen name="Index" options={{
              headerRight: () => (
                <Button title="Logout" onPress={onLogout} />
              ),
            }} /> */}
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "MyCrudia",
              headerShown: false,
              headerRight: () => <Button title="Logout" onPress={onLogout} />,
            }}
          />
          {/* 
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> 
          */}
        </Stack>
      ) : (
        <PageRedirect.Navigator>
          <PageRedirect.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </PageRedirect.Navigator>
      )}
    </ThemeProvider>
  );
}
