import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

const Stack = createNativeStackNavigator();

import { useColorScheme } from '@/components/useColorScheme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './screens/Home';
import { Button } from 'react-native';
import Login from './screens/Login';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Layout />
      </ThemeProvider>
  </AuthProvider>
  // return <AuthProvider> <Layout></Layout></AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  return (
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => (
                <Button title="Logout" onPress={onLogout} />
              ),
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
  );
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { authState, onLogout } = useAuth(); 

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => (
                <Button title="Logout" onPress={onLogout} />
              ),
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </ThemeProvider>
  );
}

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//       </Stack>
//     </ThemeProvider>
//   );
// }
