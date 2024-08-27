import React, { useEffect, useRef, useState } from "react";
import { Box, BoxProps } from "../Layout/Box";
import { Text, TextProps } from "../Typography";
import {
  Animated,
  Dimensions,
  KeyboardType,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import SrfValue from "@/shared/utils/functions/SrfValue";
import { PaletteType, palette } from "@/shared/theme/palette";
import { ImageIcon } from "@/shared/assets/icons/ImageIcon";
import { triggerShakeAnimation } from "@/shared/utils/helpers";
import NewErrorText from "@/shared/utilities/Error/NewErrorText";
import { RFValue } from "react-native-responsive-fontsize";

type SimpleInputProps = TextInputProps & {
  value?: string | number;
  inputProps?: TextInputProps;
  label?: string;

  placeholder?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  isPassword?: boolean;
  editable?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  inputBoxProps?: BoxProps;
  labelProps?: TextProps;
  onFocus?: () => void;
  errorMessage?: null | undefined | string | boolean;
  onBlur?:
    | ((event: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  placeholderTextColor?: PaletteType;
  inputColor?: PaletteType;
};

const SimpleInput = ({
  inputProps,isPassword,
  value = "",
  onChangeText,
  inputColor="darkGrey",
  keyboardType = "default",
  labelProps,
  label,onFocus = () => {},  errorMessage = null,
  onBlur = event => {},
  placeholderTextColor = "textColor2",
  maxLength,placeholder,
  inputBoxProps,
  editable,
}: SimpleInputProps) => {
    const ref = React.useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(isPassword);
    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (errorMessage) {
        triggerShakeAnimation(animValue);
      }
    }, [animValue, errorMessage]);
  return (
    <Box
    rowGap={"xs"}>
      <Box>
        <Text textTransform={"capitalize"} variant={"regular12"} {...labelProps} >{label}</Text>
      </Box>
      <Box borderRadius={"sm"} borderWidth={0.5} {...inputBoxProps}>
        <TextInput
        ref={ref}
        secureTextEntry={showPassword}
          onBlur={event => {
            onBlur(event);
            setIsFocused(false);
          }}
          onChangeText={text => {
            onChangeText?.(text);
          }}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          value={value}
          autoCapitalize="none"
          keyboardType={keyboardType}
          editable={editable}
          autoCorrect={false}
          maxLength={maxLength}
          style={{
            height: SrfValue(48),
            color:palette.textColor,
            paddingHorizontal: SrfValue(16),
            fontSize: RFValue(13),
            backgroundColor:"transparent",
            letterSpacing: 0.7,
          }}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          {...inputProps}
        />
        
            {isPassword && (
                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(!showPassword);
                    
                  }}
                  style={{
                    position: "absolute",
                    right: SrfValue(15),
                    top: SrfValue(15)
                  }}>
                  <ImageIcon
                    color={inputColor}
                    name={!showPassword ? "eyeclosed" : "eyeopened"}
                    size="md"
                  />
                </TouchableOpacity>
              )}
      </Box>
        {errorMessage && <NewErrorText error={errorMessage} />}
    </Box>
  );
};

export default SimpleInput;
