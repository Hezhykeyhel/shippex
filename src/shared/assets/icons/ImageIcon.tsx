import { FC } from "react";
import { Image, ImageProps } from "react-native";

import { Theme, useTheme } from "@/shared/theme";
import { ImageIconPackType, imageIconPack } from "./imageIconPack";


export type ImageIconProps = {
  name?: ImageIconPackType;
  size?: keyof Theme["iconSizes"];
  source?: ImageProps["source"];
  color?: keyof Theme["colors"];
  style?: ImageProps["style"];
  imageProps?: Omit<ImageProps, "source" | "style">;
};

const ImageIcon: FC<ImageIconProps> = props => {
  const { name, source, style, imageProps, size = "sm", color } = props;

  const theme = useTheme();

  const icon = imageIconPack[name];
  const iconSize = theme.iconSizes[size];
  const iconColor = color ? theme.colors[color] : undefined;

  return (
    <Image
      fadeDuration={0}
      resizeMode="contain"
      source={source || icon}
      style={[
        {
          ...iconSize,
          tintColor: iconColor,
        },
        style,
      ]}
      {...imageProps}
    />
  );
};

export { ImageIcon };
