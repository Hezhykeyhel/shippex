import { RootNavigationProps } from "@/services/navigations/types";
import { imageIconPack } from "@/shared/assets/icons/imageIconPack";
import { palette, PaletteType } from "@/shared/theme/palette";
import SrfValue from "@/shared/utils/functions/SrfValue";
import React, { useEffect, useState } from "react";
import { Animated, Image, StatusBar, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }: RootNavigationProps<"SplashScreen">) => {
  const scale = new Animated.Value(1);
  const scaleY = new Animated.Value(1);
  const translateY = new Animated.Value(0);
  const animationColor = new Animated.Value(0);
  const rotateY = new Animated.Value(0);

  const initAnimation = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 4,
        duration: 1500,
        useNativeDriver: false,
      }),

      Animated.timing(rotateY, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 100,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.timing(translateY, {
          toValue: -500,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.timing(animationColor, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      StatusBar.setHidden(false);
      navigation.replace("LoginScreen");
    });
  };

  useEffect(() => {
    StatusBar.setHidden(true);
    setTimeout(() => {
      initAnimation();
    }, 2000);
  }, []);

  const background_color = animationColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#2f50c1"],
  });

  const style = {
    transform: [{ scale }, { scaleY }, { translateY }],
  };

  return (
    <>
      <StatusBar backgroundColor={palette.primaryColor} />
      <Animated.View
        style={[
          styles.animation_container,
          { backgroundColor: background_color },
        ]}>
        <Animated.Image
          source={imageIconPack.applogo}
          style={[styles.animatedImage, style]}
        />
      </Animated.View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  animatedImage: {
    height: SrfValue(30),
    width: SrfValue(30),
  },
  animation_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
