import { Theme, useTheme } from "../../../shared/theme";
import { VFC } from "react";
import { SvgProps } from "react-native-svg";
import { palette } from "../../../shared/theme/palette";
import React from 'react'
import { SvgIconPackType, svgIconPack } from "./svgiconPack";

export type SvgIconProps = Omit<SvgProps,"color"> & {
    name: SvgIconPackType;
    size?: keyof Theme["iconSizes"];
    color?: keyof Theme["colors"];
};

const SvgIcon: VFC<SvgIconProps> = props => {
    const {name,size="xs", color="white",...rest} =   props;

    const theme = useTheme();
    const Icon = svgIconPack[name];
    const iconSize = theme.iconSizes[size];

    return <Icon  {...iconSize} fill = {palette[color]} {...rest} />;

}

export {SvgIcon};