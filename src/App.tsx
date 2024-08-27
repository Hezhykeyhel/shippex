import React, { useEffect } from "react";
import { ThemeProvider } from "@shopify/restyle";
import theme from "./shared/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";
import FlashMessage from "react-native-flash-message";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Navigations from "./services/navigations";
import SplashScreen from "react-native-splash-screen";

function Main() {
  return (
    <ThemeProvider theme={theme.lightTheme}>
      <BottomSheetModalProvider>
        <Navigations />
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView>
      <ErrorBoundary>
        <Main />
        <FlashMessage position="top" />
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
};

export default App;
