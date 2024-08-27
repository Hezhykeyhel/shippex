import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { Box, BoxProps } from "@/shared/components";
import { Text } from "@/shared/components/Typography";
import { palette } from "@/shared/theme/palette";
import SrfValue from "@/shared/utils/functions/SrfValue";
import NewErrorText from "@/shared/utilities/Error/NewErrorText";
import { ImageIcon } from "@/shared/assets/icons/ImageIcon";
import { triggerShakeAnimation } from "@/shared/utils/helpers";
import { SearchBar } from "./searchBar";

interface DropDownPickerProps {
  list: Array<{ id: string; value: string }>;
  placeholder: string;
  label: string;
  wrapperProps?: BoxProps;
  isComplexList?: boolean;
  isLoading?: boolean;
  borderWidth?: number;
  ComplexChildren?: JSX.Element | JSX.Element[];
  errorMessage?: boolean | string;
  getSelectedValue: (value: string | number) => void;
}

export const DropDownPicker = ({
  list,
  getSelectedValue,
  placeholder,
  label,ComplexChildren,
  errorMessage = false,
  isComplexList = false,
  isLoading = false,
  borderWidth=1,
  wrapperProps,
}: DropDownPickerProps) => {
  const [value, setvalue] = useState("");
  const [filteredList, setFilteredList] = useState<
    { id: string; value: string }[]
  >([]);
  const smallSnapPoints = useMemo(() => ["45%", "45%"], []);
  const longSnapPoints = useMemo(() => ["75%", "75%"], []);
  const renderBackdrop = (backdrop: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...backdrop} opacity={0.7} pressBehavior="close" />
  );
  const showAppModalRef = useRef<BottomSheetModal>(null);

  const handleFilterBySearch = v => {
    const newList = list.filter(item => {
      if (item.value.toLowerCase().includes(v.toLowerCase())) {
        return item;
      }
      return 0;
    });
    setFilteredList(newList);
  };
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      setvalue("--------------");
    } else {
      setvalue(placeholder);
    }
  }, [isLoading]);

  useEffect(() => {
    setFilteredList(list);
    if (list.length === 0) {
      setvalue("");
    }
  }, [list]);

  useEffect(() => {
    if (errorMessage) {
      triggerShakeAnimation(animValue);
    }
  }, [animValue, errorMessage]);

  return (
    <Box>
      <TouchableOpacity
      style={{
        borderWidth:1,
        borderColor:errorMessage ? palette.red : palette.whiteColor
      }}
        disabled={list.length === 0 || isLoading}
        onPress={() => {
          Keyboard.dismiss();
          showAppModalRef.current?.present();
        }}>
          <Text
              letterSpacing={0.5}
              marginBottom="xs"
              variant="regular12">
              {label}
            </Text>
        <Box
          alignItems="center"
          backgroundColor="grayLight"
          borderColor="textColor"
          borderRadius="sm"
          borderWidth={borderWidth}
          flexDirection="row"
          height={SrfValue(45)}
          {...wrapperProps}
          justifyContent="space-between"
          paddingHorizontal="md">
          <Box>
            
            <Text
            
              color={value.trim() ? "textColor" : "textColor2"}
              variant={value.trim().length < 20 ? "regular14" : "regular12"}>
              {value.trim() ? value : placeholder}
            </Text>
          </Box>
          <Box>
            <Box alignItems="center" justifyContent="center" marginRight="xs">
              {isLoading ? (
                <ActivityIndicator color={palette.primaryColor} size="small" />
              ) : (
                <ImageIcon  name="arrowhead" size="sm" />
              )}
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
      {errorMessage && <NewErrorText error={errorMessage} />}
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: palette.whiteColor,
        }}
        ref={showAppModalRef}
        snapPoints={list.length > 6 ? longSnapPoints : smallSnapPoints}>
        <Box>
          <Box alignItems="center" paddingHorizontal="mmd">
            <Text mb="sml" variant="bold14">
              {label}
            </Text>
          </Box>
          {list.length > 10 && (
            <Box margin="md" marginTop="none">
              <SearchBar
                getSearchInput={t => handleFilterBySearch(t)}
                height={SrfValue(54)}
                marginTop={0}
                placeholder="Search"
              />
            </Box>
          )}
        </Box>
        <BottomSheetFlatList
          contentContainerStyle={{
            paddingBottom: 200,
            justifyContent: "center",
          }}
          data={filteredList}
          keyExtractor={(item, index) => index.toString()}
          // ListEmptyComponent={<RenderEmptyComponent />}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setvalue(item.value);
                getSelectedValue(item);
                showAppModalRef.current?.close();
              }}>
              {isComplexList && (ComplexChildren)} 
               { !isComplexList && <Box
                backgroundColor={
                  index % 2 === 0 ? "grayLight" : "transparent"
                }
                flexWrap={"wrap"}
                height={SrfValue(55)}
                justifyContent="center"
                paddingHorizontal="md"
                >
                
                    <Text  lineHeight={SrfValue(25)} variant={"regular12" }>
                      {item.value}
                    </Text>
              </Box>}
            </TouchableOpacity>
          )}
        />
      </BottomSheetModal>
    </Box>
  );
};
