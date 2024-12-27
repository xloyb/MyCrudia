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
              headerShown: true,
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

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//   const { authState, onLogout } = useAuth();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//           <AuthProvider>

// {authState?.authenticated ? (
//           <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//         </Stack>
//         ) : (
// <PageRedirect.Navigator>
//   <PageRedirect.Screen name="Login" component={Login} />
// </PageRedirect.Navigator>
// )}
//   );

//           </AuthProvider>

//     </ThemeProvider>
//   );
// }

// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/components/useColorScheme';
// import { useAuth } from './context/AuthContext';
// import { Button } from 'react-native';

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//     const { authState, onLogout } = useAuth();

//     return (
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         {authState?.authenticated ? (
//           <React.Fragment>
//             <Stack.Screen
//               name="(tabs)"
//               options={{
//                 headerShown: false,
//                 headerRight: () => (
//                   <Button title="Logout" onPress={onLogout} />
//                 ),
//               }}
//             />
//             <Stack.Screen
//               name="modal"
//               options={{
//                 presentation: 'modal',
//               }}
//             />
//           </React.Fragment>
//         ) : (
//           <Stack.Screen
//             name="login"
//             options={{ headerShown: false }}
//           />
//         )}
//       </Stack>
//     </ThemeProvider>
//     );
// }
