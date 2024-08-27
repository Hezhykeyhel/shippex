import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParameterList } from "./types";
import SplashScreen from "../../shared/screens/splashScreen/SplashScreen";
import Scan from "@/screens/home/Scan";
import Wallet from "@/screens/home/Wallet";
import Profile from "@/screens/home/Profile";
import LoginScreen from "@/screens/auth/LoginScreen";
import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator<RootStackParameterList>();

function RootNavigation() {
  return (
    <Stack.Navigator
      // initialRouteName="LandingPage"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "pop",
        animation: "fade",
        // animationDuration: 150,
      }}>
      {/* <Stack.Screen component={SplashScreen} name="SplashScreen" />
       */}
      <Stack.Screen component={SplashScreen} name="SplashScreen" />
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={BottomTabs} name="BottomTabs" />
      <Stack.Screen component={Scan} name="Scan" />
      <Stack.Screen component={Wallet} name="Wallet" />
      <Stack.Screen component={Profile} name="Profile" />
    </Stack.Navigator>
  );
}

export default RootNavigation;
