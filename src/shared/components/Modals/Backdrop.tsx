import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Box } from "../Layout/Box";
import { Pressable } from "react-native";



export const Backdrop = ({
  animatedIndex,
  onPress,
  showIndex = 0,
  style,
  backdropChildren,
}: BottomSheetBackdropProps & {
  onPress?: () => void;
  showIndex?: number;
  backdropChildren?: React.ReactNode | React.ReactNode[];
}) => {




  return (
    <Box style={style}>

        <Pressable
          onPress={onPress}
          style={{
            // backgroundColor: "transparent",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}>
          {backdropChildren}
        </Pressable>

    </Box>
  );
};
