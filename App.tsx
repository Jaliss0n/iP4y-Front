import * as Font from "expo-font";
import { Routes } from "./routes";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { ThemeContextProvider } from "./ThemeContext";

// const theme = {
//   ...MD3LightTheme, // or MD3DarkTheme
//   roundness: 2,
//   colors: {
//     ...MD3LightTheme.colors,
//     primary: '#6d1f9b',
//     secondary: '#97148C',
//     tertiary: '#ffffff',
//   },
// };

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove thirs if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to renderr
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeContextProvider>
      <Routes />
    </ThemeContextProvider>

    // <PaperProvider theme={theme}>
    // </PaperProvider>
  );
}
