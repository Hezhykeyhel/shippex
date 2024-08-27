import { createTheme, useTheme as useRestyleTheme } from "@shopify/restyle";
import { Dimensions } from "react-native";

import darkMode from "./darkMode";
import { palette } from "./palette";
import type { PaddingSizesObjectType } from "./types";
import SrfValue from "../utils/functions/SrfValue";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

const lightTheme = createTheme({
  borderRadii: {
    lg: SrfValue(32),
    sml: SrfValue(24),
    md: SrfValue(16),
    mmd: SrfValue(14),
    none: 0,
    sm: SrfValue(8),
    xl: SrfValue(64),
    xs: SrfValue(4),
  },

  breakpoints: {
    largeScreen: 412,
    phone: 0,
    tablet: 768,
  },

  buttonGradients: {
    // primary: [palette.secondaryColor, palette.secondary6, palette.primaryColor],
    // secondary: [palette.gradientBlueTop, palette.gradientBlueBottom],
    // tatiary: [palette.gradientGreenTop, palette.gradientGreenBottom],
  },
  buttonSizes: {
    lg: {
      paddingHorizontal: "xl",
      paddingVertical: "lg",
    },
    md: {
      paddingHorizontal: "lg",
      paddingVertical: "md",
    },
    none: {
      paddingHorizontal: "none",
      paddingVertical: "none",
    },
    sm: {
      paddingHorizontal: "md",
      paddingVertical: "sm",
    },
    xl: {
      paddingHorizontal: "xxl",
      paddingVertical: "xl",
    },
    xs: {
      paddingHorizontal: "sm",
      paddingVertical: "xs",
    },
  } as PaddingSizesObjectType,

  buttonVariants: {
    defaults: {
      borderRadius: "sm",
    },
    filled: {
      backgroundColor: "primaryColor",
    },
    ghost: {
      backgroundColor: "paleGrey50",
    },
    none: {},
    outlined: {
      borderColor: "paleGrey",
      borderWidth: 1,
    },
    transparent: {
      backgroundColor: "transparent",
    },
  },

  colors: {
    ...palette,
    imageBackgroundTint: palette.primaryColor,
    mainBackground: palette.whiteColor,
    textColorInverted: palette.whiteColor,
    primarybackground: palette.white,
    primarythemecolor: palette.backgroundblack,
  },

  fontSizes: {
    caption: SrfValue(12),
    h1: SrfValue(32),
    h2: SrfValue(24),
    h3: SrfValue(20),
    h4: SrfValue(18),
    h5: SrfValue(16),
    h6: SrfValue(14),
    p: SrfValue(14),
    s: SrfValue(6),
  },

  iconSizes: {
    "logo-iconsize": {
      height: SrfValue(40),
      width: SrfValue(40),
    },
    lg: {
      height: SrfValue(32),
      width: SrfValue(32),
    },
    m: {
      height: SrfValue(12),
      width: SrfValue(12),
    },
    mm: {
      height: SrfValue(16),
      width: SrfValue(17),
    },
    md: {
      height: SrfValue(24),
      width: SrfValue(24),
    },
    s: {
      height: SrfValue(4),
      width: SrfValue(4),
    },
    sml: {
      height: SrfValue(20),
      width: SrfValue(20),
    },
    sm: {
      height: SrfValue(16),
      width: SrfValue(16),
    },
    xl: {
      height: SrfValue(48),
      width: SrfValue(48),
    },
    xll: {
      height: SrfValue(32),
      width: SrfValue(99),
    },
    xlll: {
      height: SrfValue(38),
      width: SrfValue(140),
    },

    xxl: {
      height: SrfValue(64),
      width: SrfValue(64),
    },
    xs: {
      height: SrfValue(8),
      width: SrfValue(8),
    },
    xsl: {
      height: SrfValue(108),
      width: SrfValue(120),
    },
    pspxl: {
      height: SrfValue(80),
      width: SrfValue(80),
    },
    xxxl: {
      height: SrfValue(138),
      width: SrfValue(180),
    },
    xxxxl: {
      height: SrfValue(183),
      width: SrfValue(177),
    },
  },

  spacing: {
    lg: SrfValue(32),
    xlg: SrfValue(48),
    md: SrfValue(16),
    mmd: SrfValue(20),
    none: 0,
    smd: SrfValue(12),
    sm: SrfValue(8),
    sml: SrfValue(24),
    ss: SrfValue(6),
    ssm: SrfValue(8),
    xl: SrfValue(64),
    xs: SrfValue(4),
    xxl: SrfValue(128),
    xxxl: SrfValue(228),
    xxs: SrfValue(2),
    xxxs: SrfValue(1),
    rs: SrfValue(-200),
    rlg: SrfValue(-100),
    rr: SrfValue(-30),
  },

  textInputSizes: {
    lg: {
      paddingHorizontal: "lg",
      paddingVertical: "lg",
    },
    md: {
      paddingHorizontal: "md",
      paddingVertical: "md",
    },
    none: {
      paddingHorizontal: "none",
      paddingVertical: "none",
    },
    sm: {
      paddingHorizontal: "sm",
      paddingVertical: "sm",
    },
    xl: {
      paddingHorizontal: "xl",
      paddingVertical: "xl",
    },
    xs: {
      paddingHorizontal: "xs",
      paddingVertical: "xs",
    },
  } as PaddingSizesObjectType,

  textInputVariants: {
    defaults: {
      borderRadius: "sm",
      fontSize: SrfValue(14),
    },
    filled: {
      backgroundColor: "paleGrey50",
      color: "primaryBlack",
    },
    none: {},
    outlined: {
      borderColor: "paleGrey",
      borderWidth: 1,
    },
    transparent: {
      backgroundColor: "transparent",
    },
  },

  textVariants: {
    body: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      fontWeight: "400",
    },
    bold10: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 10,
      fontWeight: "600",
    },
    bold12: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 12,
      fontWeight: "600",
    },
    bold14: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 14,
      fontWeight: "600",
    },
    bold16: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 16,
      fontWeight: "600",
    },
    button: {
      color: "mainBackground",
      fontFamily: "Poppins-SemiBold",
      fontSize: 18,
      fontWeight: "600",
    },
    defaults: {},
    header: {
      color: "textColor",
      fontFamily: "Poppins-SemiBold",
      fontSize: 24,
      fontWeight: "600",
    },
    header2: {
      color: "textColor",
      fontFamily: "Poppins-SemiBold",
      fontSize: 26,
      fontWeight: "600",
    },
    header3: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 20,
      fontWeight: "700",
    },
    medium8: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 8,
      fontWeight: "600",
    },
    medium10: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 10,
      fontWeight: "600",
    },
    medium12: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      fontWeight: "600",
    },
    medium14: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 14,

      fontWeight: "600",
    },
    medium16: {
      color: "textColor",
      fontFamily: "Poppins-Medium",
      fontSize: 16,

      fontWeight: "600",
    },
    medium18: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 18,
      fontWeight: "600",
    },
    medium20: {
      color: "textColor",
      fontFamily: "Poppins-Bold",
      fontSize: 20,
      fontWeight: "600",
    },
    regular8: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 8,
      fontWeight: "400",
    },
    regular10: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 10,
      fontWeight: "400",
    },
    regular12: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 12,

      fontWeight: "400",
    },
    regular14: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 14,

      fontWeight: "400",
    },
    regular16: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      fontWeight: "400",
    },
    regular18: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 18,
      fontWeight: "400",
    },
    regular20: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 20,
      fontWeight: "400",
    },
    regular24: {
      color: "textColor",
      fontFamily: "Poppins-Regular",
      fontSize: 24,
      fontWeight: "400",
    },
    normal14: {
      color: "textColor",
      fontFamily: "Poppins-Normal",
      fontSize: 14,

      fontWeight: "400",
    },
    subHeading: {
      color: "textColor",
      fontFamily: "Poppins-SemiBold",
      fontSize: 18,
      fontWeight: "600",
    },
    bigHeader: {
      color: "textColor",
      fontFamily: "Poppins-SemiBold",
      fontSize: 34,
      fontWeight: "600",
    },
  },

  zIndices: {
    modal: 100,
    overlay: 10,
  },
});

export type Theme = typeof lightTheme;

export const useTheme = () => useRestyleTheme<Theme>();

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    ...darkMode.colors,
  },
};

export default { darkTheme, lightTheme };
