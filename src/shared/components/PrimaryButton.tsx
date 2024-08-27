import { TouchableOpacityProps, TouchableOpacity } from 'react-native'
import React from 'react'
import { RestyleTextProps, Text } from './Typography/Text';
import { VariantProps, backgroundColor, border, createRestyleComponent, createVariant, layout, opacity, position, shadow, spacing, visible } from '@shopify/restyle';
import { Theme } from '../theme';
import { Box, BoxProps } from './Layout/Box';
import { PaletteType } from '../theme/palette';
import SrfValue from '../utils/functions/SrfValue';

type PrimaryButtonProps = {
  disabled?: boolean;
  color?:PaletteType
  backgroundColor?:PaletteType
  touchableOpacityProps?: TouchableOpacityProps;
  onPress?: TouchableOpacityProps['onPress']; title: string;
}

type RestyleProps = BoxProps & VariantProps<Theme, "buttonVariants">;

const PrimaryButton = ({ disabled,backgroundColor="primaryBlack", onPress, title, touchableOpacityProps,color="whiteColor", ...rest }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      onPress={onPress}
      {...touchableOpacityProps}
    >
      <Box
        alignItems="center"
        flexDirection="row"
        width={"100%"}
        height={SrfValue(55)}
        justifyContent={"center"}
        borderWidth={0.5}
      borderRadius={"sm"}
        backgroundColor={backgroundColor}
        {...rest}
      >
        <Text letterSpacing={0.7} variant={"bold16"} color={color}>{title}</Text>
      </Box>
    </TouchableOpacity>
  )
}

export default PrimaryButton