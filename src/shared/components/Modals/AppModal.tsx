/* eslint-disable no-nested-ternary */
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { ForwardedRef, RefObject, useCallback, useMemo } from "react";
import { palette } from "@/shared/theme/palette";
import SrfValue from "@/shared/utils/functions/SrfValue";
import { Text, TextProps } from "../Typography";
import { Box } from "../Layout/Box";
import { Backdrop } from "./Backdrop";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export type AppModalTypeType =
  | "bottom"
  | "small-bottom"
  | "long-bottom"
  | "centered-small"
  | "very-long-bottom"
  | "fullscreen";
type StatusModalType = {
  showAppModalRef?: RefObject<BottomSheetModal>;
  type: AppModalTypeType;
  titleProps?: TextProps;
  onBackdropPress?: () => void;

  enableContentPanningGesture?: boolean;
  enablePanDownToClose?: boolean;
  backdropClose?: boolean;
  title?: string;
  children?: JSX.Element | JSX.Element[];
};

const AppModal = ({
  showAppModalRef,
  title,backdropClose=true,
  enablePanDownToClose,
  onBackdropPress,
  children,
  type,
  titleProps,
  enableContentPanningGesture,
  ...rest
}: StatusModalType,
) => {
    // const bottomInset =
    // type === "centered" ||
    // type === "long-centered" ||
    // type === "centered-small" ||
    // type === "very-long-centered"
    //   ? 0
    //   : undefined;
  const modalTypes = {
    "very-long-centered": ["80%", "70%"],
    "small-bottom": ["40%", "60%"],
    "centered-small": ["50%", "25%"],
    bottom: ["50%", "65%"],
    "long-bottom": ["70%", "80%"],
    "very-long-bottom": ["92%"],
    fullscreen: ["95%", "100%"],
  };
  const getDetached = (type: AppModalTypeType) =>

    type === "centered-small" ||
    type === "small-bottom" ||
    type === "very-long-bottom" ||
    type === "long-bottom";

    const getMargined = (type: AppModalTypeType) =>
        type === "centered-small";
      
  const snapPoints = useMemo(() => modalTypes[type], [type]);
  const bottomInset =
    type === "centered-small" ||
    type === "long-bottom" ||
    type === "small-bottom" ||
    type === "very-long-bottom"
      ? 0
      : undefined;
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <Backdrop
        onPress={() => {
          if (onBackdropPress) {
            onBackdropPress();
            return;
          }
          if (backdropClose) {
            // @ts-expect-error current not defined on ref
            showAppModalRef?.current.dismiss();
            
          }
         
        }}
        {...props}
      />
    ),
    [showAppModalRef, onBackdropPress],
  );

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      // backgroundStyle={{
      //   backgroundColor: palette.darkGrey,
      // }}
      bottomInset={bottomInset}
      detached={getDetached(type)}
      handleIndicatorStyle={{display:"none"}}
      enableContentPanningGesture={enableContentPanningGesture}
      keyboardBehavior="fillParent"
      enablePanDownToClose={enablePanDownToClose}
      keyboardBlurBehavior="restore"
      backgroundStyle={{
        borderRadius: SrfValue(15),
      }}
      style={{
        flex: 1,
        marginHorizontal: getMargined(type) ? SrfValue(30) : undefined,
      }}
      ref={showAppModalRef}
      snapPoints={snapPoints}
      {...rest}
      >
      {title && (
        <Box >
          <Text textAlign={"center"} variant={"medium16"} {...titleProps}>
            {title}
          </Text>
        </Box>
      )}
      {children}
    </BottomSheetModal>
  );
};

export default React.memo(AppModal);
