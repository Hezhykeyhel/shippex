import {
  ActivityIndicator,
  GestureResponderEvent,
  PressableProps,
} from "react-native";
import Animated from "react-native-reanimated";
import { Box } from "./Layout/Box";
import { palette, PaletteType } from "../theme/palette";
import { Text, TextProps } from "./Typography";
import { useTheme } from "../theme";
import Pressable from "./Pressable";

const AnimatedBox = Animated.createAnimatedComponent(Box);

export type ButtonProps = PressableProps & {
  background?: PaletteType;
  iconSize?: number;
  isLoading?: boolean;
  disabled?: boolean;
  label: string;
  labelProps?: TextProps;
  variant?: PaletteType;
};

/**
 * Custom `BaseButton` component with two variants (primary & secondary)
 * inherits Pressable Props
 * @see {@link PressableProps}
 */
function BaseButton({
  background = "primaryColor",
  iconSize = 16,
  isLoading = false,
  disabled = false,
  label,
  labelProps,
  variant = "primaryColor",
  onPress,
  ...rest
}: ButtonProps) {
  const { spacing } = useTheme();
  const handlePress = (event?: GestureResponderEvent | undefined) => {
    if (isLoading) return;
    if (onPress) {
      onPress(event);
    }
  };
  return (
    <Pressable
      alignItems="center"
      backgroundColor={background}
      borderRadius="sm"
      disabled={disabled}
      justifyContent="center"
      onPress={handlePress}
      paddingVertical="md"
      type="scale"
      {...rest}>
      {isLoading ? (
        <AnimatedBox flexDirection="row" key={`${isLoading}`}>
          <Text color="white" variant="medium14">
            {isLoading && "Please wait...  "}
          </Text>
          <ActivityIndicator size={24} color={palette.white} />
        </AnimatedBox>
      ) : (
        <AnimatedBox
          alignItems="center"
          flexDirection="row"
          justifyContent="center">
          <Text
            color="whiteColor"
            textAlign="justify"
            variant="medium14"
            {...labelProps}>
            {label}
          </Text>
        </AnimatedBox>
      )}
    </Pressable>
  );
}

export default BaseButton;
