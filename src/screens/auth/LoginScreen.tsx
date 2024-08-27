import { RootNavigationProps } from "@/services/navigations/types";
import { ImageIcon } from "@/shared/assets/icons/ImageIcon";
import { imageIconPack } from "@/shared/assets/icons/imageIconPack";
import { Box } from "@/shared/components";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { showToast } from "@/shared/components/Toast/showToast";
import { Text } from "@/shared/components/Typography";
import { useLogin } from "@/shared/services/api";
import theme, { Theme } from "@/shared/theme";
import { palette } from "@/shared/theme/palette";
import SrfValue from "@/shared/utils/functions/SrfValue";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const LoginScreen = ({ navigation }: RootNavigationProps<"LoginScreen">) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userFields, setUserFields] = useState({
    usr: "",
    pwd: "",
    urlLink: "https://www.brandimic.com",
  });
  const { width } = Dimensions.get("window");
  const [isPasFocused, setIsPasFocused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const modalRef = useRef<BottomSheetModal>(null);
  const snappoints = useMemo(() => ["95%", "95%"], []);
  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop opacity={0.5} pressBehavior="close" {...props} />
  );
  const isDisabled = !!userFields.pwd.trim() && !!userFields.pwd.trim();

  const openLoginModal = () => {
    modalRef?.current?.present();
  };

  async function handleLogin() {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const response = await useLogin(userFields.usr, userFields.pwd);
      await AsyncStorage.setItem("loginResponse", JSON.stringify(response));
      setIsLoading(false);
      navigation.replace("BottomTabs", {
        screen: "ShipmentsLandingPage",
      });
    } catch (error: unknown | any) {
      setIsLoading(false);
      showToast({
        message: "Unable to process your request, please try again",
      });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.primaryColor }}>
      <Box flex={1} backgroundColor="primaryColor">
        <Box alignSelf="center" flex={1} width={width >= 500 ? "85%" : "100%"}>
          <Box flex={1} justifyContent="center" alignItems="center">
            <Image
              source={imageIconPack.shippex}
              style={{ width: SrfValue(208), height: SrfValue(36) }}
            />
          </Box>
          <Box marginHorizontal="md" marginBottom="md">
            <PrimaryButton
              onPress={openLoginModal}
              label="Login"
              labelProps={{
                color: "primaryColor",
                variant: "bold14",
              }}
              background="whiteColor"
            />
          </Box>
        </Box>
        <BottomSheetModal
          ref={modalRef}
          snapPoints={snappoints}
          backdropComponent={renderBackdrop}>
          <Box flex={1}>
            <Box flex={1}>
              <TouchableOpacity
                style={{
                  alignItems: "flex-start",
                }}
                onPress={() => modalRef?.current?.dismiss()}>
                <Box padding="md" flexDirection="row">
                  <ImageIcon name="chevron" size="md" color="primaryColor" />
                  <Text
                    marginHorizontal="md"
                    variant="regular16"
                    color="primaryColor">
                    Cancel
                  </Text>
                </Box>
              </TouchableOpacity>
              <Box marginBottom="md" paddingHorizontal="md">
                <Box>
                  <Text variant="bigHeader">Login</Text>
                </Box>
                <Box>
                  <Text color="textColor2" variant="regular16">
                    Please enter your First, Last name and your phone number in
                    order to register
                  </Text>
                </Box>
              </Box>
              <Box paddingHorizontal="md" marginTop="lg">
                <TextInput
                  onChangeText={(text: string) => {
                    setUserFields({ ...userFields, ...{ urlLink: text } });
                  }}
                  editable={false}
                  placeholder="URL"
                  value={userFields.urlLink}
                  placeholderTextColor={"#a7a3b3"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    height: SrfValue(56),
                    backgroundColor: "#F4F2F8",
                    borderRadius: SrfValue(8),
                    marginBottom: 20,
                    paddingHorizontal: SrfValue(16),
                    ...(theme.lightTheme.textVariants
                      .medium16 as unknown as Theme),
                    color: palette.primaryColor,
                  }}
                />
                <TextInput
                  onChangeText={(text: string) => {
                    setUserFields({ ...userFields, ...{ usr: text } });
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Username / Email"
                  value={userFields.usr}
                  placeholderTextColor="#a7a3b3"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    height: SrfValue(56),
                    backgroundColor: "#F4F2F8",
                    borderRadius: SrfValue(8),
                    borderWidth: isFocused ? SrfValue(1.5) : 0,
                    marginBottom: 20,
                    borderColor: isFocused
                      ? palette.primaryColor
                      : palette.transparent,
                    marginVertical: SrfValue(6),
                    paddingHorizontal: SrfValue(16),
                    ...(theme.lightTheme.textVariants
                      .medium16 as unknown as Theme),
                    color: palette.primaryColor,
                  }}
                />
                <TextInput
                  onChangeText={(text: string) => {
                    setUserFields({
                      ...userFields,
                      ...{ pwd: text },
                    });
                  }}
                  secureTextEntry
                  placeholder="Password"
                  value={userFields.pwd}
                  onFocus={() => setIsPasFocused(true)}
                  onBlur={() => setIsPasFocused(false)}
                  placeholderTextColor={"#a7a3b3"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{
                    height: SrfValue(56),
                    backgroundColor: "#F4F2F8",
                    borderWidth: isPasFocused ? SrfValue(1.5) : 0,
                    borderColor: isPasFocused
                      ? palette.primaryColor
                      : palette.transparent,
                    borderRadius: SrfValue(8),
                    paddingHorizontal: SrfValue(16),
                    ...(theme.lightTheme.textVariants
                      .medium16 as unknown as Theme),
                    color: palette.primaryColor,
                  }}
                />
              </Box>
              <Box
                position="absolute"
                bottom={0}
                width="100%"
                paddingHorizontal="md"
                alignSelf="center"
                marginBottom="md">
                <PrimaryButton
                  onPress={handleLogin}
                  label="Login"
                  isLoading={isLoading}
                  labelProps={{
                    color: isDisabled ? "white" : "disabledColor",
                    variant: "bold14",
                  }}
                  disabled={!isDisabled || isLoading}
                  background={isDisabled ? "primaryColor" : "primaryFaded"}
                />
              </Box>
            </Box>
          </Box>
        </BottomSheetModal>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
