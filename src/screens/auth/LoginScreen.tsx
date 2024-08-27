import { authLogin } from "@/api";
import { RootNavigationProps } from "@/navigation/types";
import { ImageIcon } from "@/shared/assets/icons/ImageIcon";
import { imageIconPack } from "@/shared/assets/icons/imageIconPack";
import { Box } from "@/shared/components";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { showToast } from "@/shared/components/Toast/showToast";
import { Text } from "@/shared/components/Typography";
import { palette } from "@/shared/theme/palette";
import SrfValue from "@/shared/utils/functions/SrfValue";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
const LoginScreen = ({ navigation }: RootNavigationProps<"LoginScreen">) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formvalue, setFormvalue] = useState({
    userName: "",
    hashedPassword: "",
    urlLink: "https://www.brandimic.com",
  });
  const { width } = Dimensions.get("window");
  const [isPasFocused, setIsPasFocused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!modalRef && Platform.OS === "android") {
      StatusBar.setBackgroundColor(palette.primaryColor);
    }
  }, [modalRef]);

  const isDisabled =
    !!formvalue.hashedPassword.trim() && !!formvalue.hashedPassword.trim();

  const handleModalLoginModal = () => {
    modalRef?.current?.present();
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(palette.primaryBlack);
    }
  };

  async function handleLogin() {
    console.log(formvalue);
    Keyboard.dismiss();
    if (!formvalue.userName.trim()) {
      showToast({ message: "Please enter your User Name" });
      return;
    }
    if (!formvalue.hashedPassword.trim()) {
      showToast({ message: "Please enter your password" });
      return;
    }
    setIsLoading(true);
    try {
      const response = await authLogin(
        formvalue.userName,
        formvalue.hashedPassword,
      );
      console.log(response);
      setIsLoading(false);
      navigation.replace("BottomTabs", {
        screen: "ShipmentsLandingScreen",
        payload: response,
      });
    } catch (error: unknown | any) {
      setIsLoading(false);
      showToast({
        message: `Unable to login, ${error?.message}`,
        type: "danger",
      });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.primaryColor }}>
      <Box flex={1} backgroundColor={"primaryColor"}>
        <Box
          alignSelf={"center"}
          flex={1}
          width={width >= 500 ? "85%" : "100%"}>
          <Box flex={1} justifyContent={"center"} alignItems={"center"}>
            {/* <ImageIcon
              source={imageIconPack.shipments}
              style={{ width: SrfValue(208), height: SrfValue(36) }}
            /> */}
          </Box>
          <Box marginHorizontal="md" marginBottom="md">
            <PrimaryButton
              onPress={handleModalLoginModal}
              title="Login"
              color="primaryColor"
              backgroundColor="whiteColor"
            />
          </Box>
        </Box>
        <BottomSheetModal ref={modalRef}>
          <Box
            flex={1}
            justifyContent={"flex-end"}
            backgroundColor={"primaryBlack"}>
            <Box
              backgroundColor={"primaryColor"}
              height={"100%"}
              width={"93%"}
              borderTopRightRadius={"md"}
              alignSelf={"center"}
              borderTopLeftRadius={"md"}
            />
            <Box
              backgroundColor={"whiteColor"}
              position={"absolute"}
              height={"98.5%"}
              width={"100%"}
              padding={"md"}
              borderTopRightRadius={"sm"}
              borderTopLeftRadius={"sm"}
              flex={1}>
              <Box
                alignSelf={"center"}
                flex={1}
                width={width >= 500 ? "85%" : "100%"}>
                <TouchableOpacity
                  style={{ width: SrfValue(100) }}
                  onPress={() => modalRef?.current?.dismiss()}>
                  <Box
                    marginVertical="md"
                    flexDirection="row"
                    alignItems="center"
                    columnGap="sm">
                    <ImageIcon name="chevron" size="md" color="primaryColor" />
                    <Text variant="regular16" color="primaryColor">
                      Cancel
                    </Text>
                  </Box>
                </TouchableOpacity>
                <Box rowGap={"md"} marginBottom={"md"} marginHorizontal={"sm"}>
                  <Box>
                    <Text variant="bold16">Login</Text>
                  </Box>
                  <Box>
                    <Text color={"textColor2"} variant={"regular16"}>
                      Please enter your First, Last name and your phone number
                      in order to register
                    </Text>
                  </Box>
                </Box>
                <Box rowGap={"md"} marginHorizontal={"sm"} marginTop={"lg"}>
                  <TextInput
                    onChangeText={(text: string) => {
                      setFormvalue({ ...formvalue, ...{ urlLink: text } });
                    }}
                    editable={false}
                    placeholder="URL"
                    value={formvalue.urlLink}
                    placeholderTextColor={"#a7a3b3"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{
                      height: SrfValue(56),
                      color: palette.textColor,
                      backgroundColor: "#efefef",
                      borderRadius: SrfValue(8),
                      paddingHorizontal: SrfValue(16),
                      fontSize: SrfValue(16),
                      letterSpacing: 0.7,
                    }}
                  />
                  <TextInput
                    onChangeText={(text: string) => {
                      setFormvalue({ ...formvalue, ...{ userName: text } });
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Username / Email"
                    value={formvalue.userName}
                    placeholderTextColor={"#a7a3b3"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{
                      height: SrfValue(56),
                      color: palette.textColor,
                      backgroundColor: "#efefef",
                      borderRadius: SrfValue(8),
                      borderWidth: isFocused ? SrfValue(1.5) : 0,
                      borderColor: isFocused
                        ? palette.primaryColor
                        : palette.transparent,
                      marginVertical: SrfValue(6),
                      paddingHorizontal: SrfValue(16),
                      fontSize: SrfValue(16),
                      letterSpacing: 0.7,
                    }}
                  />
                  <TextInput
                    onChangeText={(text: string) => {
                      setFormvalue({
                        ...formvalue,
                        ...{ hashedPassword: text },
                      });
                    }}
                    secureTextEntry
                    placeholder="Password"
                    value={formvalue.hashedPassword}
                    onFocus={() => setIsPasFocused(true)}
                    onBlur={() => setIsPasFocused(false)}
                    placeholderTextColor={"#a7a3b3"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{
                      height: SrfValue(56),
                      color: palette.textColor,
                      backgroundColor: "#efefef",
                      borderWidth: isPasFocused ? SrfValue(1.5) : 0,
                      borderColor: isPasFocused
                        ? palette.primaryColor
                        : palette.transparent,
                      borderRadius: SrfValue(8),
                      paddingHorizontal: SrfValue(16),
                      fontSize: SrfValue(16),
                      letterSpacing: 0.7,
                    }}
                  />
                </Box>
                <Box
                  position={"absolute"}
                  bottom={0}
                  width={"100%"}
                  alignSelf={"center"}
                  marginBottom={"md"}>
                  {isLoading && (
                    <ActivityIndicator
                      style={{
                        position: "absolute",
                        right: "5%",
                        top: "25%",
                        zIndex: 10,
                      }}
                      size={"small"}
                      color={palette.white}
                    />
                  )}
                  <PrimaryButton
                    onPress={handleLogin}
                    title={"Login"}
                    disabled={!isDisabled || isLoading}
                    color={isDisabled ? "whiteColor" : "darkGrey"}
                    backgroundColor={isDisabled ? "primaryColor" : "grayLight"}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </BottomSheetModal>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
