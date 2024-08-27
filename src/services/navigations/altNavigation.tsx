import { createNavigationContainerRef, StackActions } from "@react-navigation/native";


export const navigationRef = createNavigationContainerRef();





export function NavReplace(referer: { stack: any; screen: any; params: any }) {
  const { screen, params = {}, stack } = referer;
  if (navigationRef.isReady()) {
    if (stack) {
      navigationRef.dispatch(StackActions.replace(stack, { screen, params }));
      return;
    }
    navigationRef.dispatch(StackActions.replace(screen, params));
  } else {
    // console.warn("Navigation reference is not ready");
  }
}
