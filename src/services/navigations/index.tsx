import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootNavigation from "./RootNavigation";

function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}

export default Navigation;
