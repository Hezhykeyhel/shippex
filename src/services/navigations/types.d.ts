import { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParameterList = {
  SplashScreen: undefined;
  IntroductionScreen: undefined;
  LoginScreen: undefined;
  ShipmentsLandingPage: {
    full_name: string;
    home_page: string;
    message: string;
  };
  Scan: undefined;
  Wallet: undefined;
  BottomTabs: any;
  Profile: undefined;
};

export type RootNavigationProps<Screen extends keyof RootStackParameterList> =
  NativeStackScreenProps<RootStackParameterList, Screen>;
export type NavType = keyof RootStackParameterList;
