import React, { useEffect } from "react";
import { ThemeProvider } from "@shopify/restyle";
import theme, { Theme } from "./shared/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";
import FlashMessage from "react-native-flash-message";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Navigations from "./services/navigations";
import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";
import { palette } from "./shared/theme/palette";

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
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <GestureHandlerRootView>
      <ErrorBoundary>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="dark-content"
        />
        <Main />
        <FlashMessage
          duration={3000}
          position="top"
          titleStyle={{
            ...(theme.lightTheme.textVariants.regular16 as unknown as Theme),
            color: palette.white,
          }}
        />
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
};

export default App;
