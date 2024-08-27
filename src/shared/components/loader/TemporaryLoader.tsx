/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Modal, StatusBar, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";


import { Text, TextProps } from "../Typography";
import { palette } from "@/shared/theme/palette";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import SrfValue from "@/shared/utils/functions/SrfValue";
import { hitchpaylogo } from "@/shared/assets/images";

type TemporaryLoaderProps = SafeAreaViewProps & {
  text?: string;
  textColor?: TextProps;
  visible: boolean;
};

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: palette.modalLightBg,
    zIndex: 999_999_999_999_999,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function TemporaryLoader(props: TemporaryLoaderProps) {
  const { text, textColor, visible } = props;
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (visible) {
      timeoutId = setTimeout(() => {
        setShowText(true);
      }, 4000);
    } else {
      setShowText(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  return (
    <>
   <StatusBar
        animated
        backgroundColor={palette.modalLightBg}
        barStyle={"light-content"}
        translucent
      />
      {visible && (
        <Modal transparent={true} visible={visible}>
          <View style={styles.container}>
            {/* <LottieView
              autoPlay
              loop
              resizeMode="cover"
              source={loader}
              style={{ width: 400, height: 400 }}
            /> */}
            <Animatable.Image
            animation="zoomIn"
            iterationCount="infinite"
            iterationDelay={50}
                  style={{
                    marginTop:SrfValue(100),
                    height: SrfValue(162),
                    tintColor:palette.primaryColor,
                    width: SrfValue(162),
                  }}
                  source={hitchpaylogo}
                />
            {/* {showText && (
             
                <Text marginVertical="md" variant="medium16" {...textColor}>
                  {text || `Please hold on...`}
                </Text>
            )} */}
          </View>
        </Modal>
      )}
    </>
  );
}
