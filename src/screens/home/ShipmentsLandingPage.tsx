import { RootNavigationProps } from "@/services/navigations/types";
import { ImageIcon } from "@/shared/assets/icons/ImageIcon";
import { imageIconPack } from "@/shared/assets/icons/imageIconPack";
import { Box } from "@/shared/components";
import { SearchBar } from "@/shared/components/textInput/searchBar";
import { Text } from "@/shared/components/Typography";
import { getShipmentList, getShipmentStatusList } from "@/shared/services/api";
import { palette } from "@/shared/theme/palette";
import SrfValue from "@/shared/utils/functions/SrfValue";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type StatusListType = {
  _assign: null;
  _comments: null;
  _liked_by: null;
  _user_tags: null;
  color: string;
  creation: string;
  docstatus: 0;
  idx: number;
  ischecked: boolean;
  modified: string;
  modified_by: string;
  name: string;
  owner: string;
  status: string;
};

const ShipmentsLandingPage = ({
  navigation,
  route,
}: RootNavigationProps<"ShipmentsLandingPage">) => {
  const { width } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(false);
  const [allIsChecked, setAllIsChecked] = useState(false);
  const [statusList, setStatusList] = useState<StatusListType[]>([]);
  const [filterstatusList, setFilterStatusList] = useState<StatusListType[]>(
    [],
  );
  const [selectedTags, setSelectedTags] = useState([]);

  const [filterPayload, setFilterPayload] = useState<StatusListType[]>([]);
  const [shipments, setShipments] = useState([]);

  const modalRef = useRef<BottomSheetModal>(null);
  const snappoints = useMemo(() => ["45%", "45%"], []);
  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop opacity={0.5} pressBehavior="close" {...props} />
  );

  const tags = [
    { title: "Received", id: 1 },
    { title: "Putaway", id: 2 },
    { title: "Delivered", id: 3 },
    { title: "Canceled", id: 4 },
    { title: "Rejected", id: 5 },
    { title: "Lost", id: 6 },
    { title: "On Hold", id: 7 },
  ];

  const handleGetStatus = async () => {
    setIsLoading(true);
    try {
      const response = await getShipmentStatusList();
      const newList = response.message.map((item: any) => ({
        ...item,
        ...{ ischecked: false },
      }));
      setStatusList(newList);
      setFilterStatusList(newList);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchShipments = async (searchTerm = []) => {
    try {
      const response = await getShipmentList(searchTerm);
      setShipments(response);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const [loginResponse, setLoginResponse] = useState<any>();
  const response = async () => {
    const payload = await AsyncStorage.getItem("loginResponse");
    if (payload !== null) {
      setLoginResponse(JSON.parse(payload));
    } else {
      setLoginResponse({});
    }
  };

  useEffect(() => {
    response();
    handleGetStatus();
    fetchShipments();
  }, []);

  const handleFilterBySearch = (v = "") => {
    const newList = statusList.filter(item => {
      if (
        item.name.toLowerCase().includes(v.trim().toLowerCase()) ||
        item.owner.toLowerCase().includes(v.trim().toLowerCase()) ||
        item.modified_by.toLowerCase().includes(v.trim().toLowerCase())
      ) {
        return item;
      }
      return 0;
    });
    setFilterStatusList(newList);
  };

  const handleMarkAll = () => {
    const newList = filterstatusList.map(item => ({
      ...item,
      ischecked: !allIsChecked, // Toggle ischecked based on allIsChecked
    }));

    setFilterStatusList(newList);
    setAllIsChecked(!allIsChecked); // Toggle allIsChecked
  };

  const handleMarkOne = id => {
    let newList = filterstatusList.map((item, index) => {
      if (id === index) {
        return { ...item, ...{ ischecked: !item.ischecked } };
      }
      return item;
    });
    const isevery = newList.every(item => item.ischecked);

    setAllIsChecked(isevery);
    setFilterStatusList(newList);
  };

  const renderHeader = () => {
    return (
      <Box
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row">
        <ImageIcon name="frame" size="xl" />
        <Image
          source={imageIconPack.shippex}
          resizeMode="contain"
          style={{
            width: SrfValue(93),
            height: SrfValue(16),
            tintColor: palette.primaryColor,
          }}
        />
        <ImageIcon name="notification" size="xl" />
      </Box>
    );
  };
  const greetings = () => {
    return (
      <Box>
        <Text color="textColor2" variant="medium16">
          Hello,
        </Text>
        <Text color="backgroundblack" variant="header">
          {loginResponse?.full_name}
        </Text>
      </Box>
    );
  };
  const filterAndScan = () => {
    return (
      <Box
        width="100%"
        marginTop="xs"
        flexDirection="row"
        justifyContent="space-between">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => modalRef?.current?.present()}
          style={{
            backgroundColor: palette.grayLight,
            justifyContent: "center",
            alignItems: "center",
            columnGap: SrfValue(8),
            borderRadius: SrfValue(10),
            flexDirection: "row",
            width: "48%",
            height: SrfValue(58),
          }}>
          <ImageIcon size="md" name="filter" />
          <Text variant="regular16">Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: palette.primaryColor,
            justifyContent: "center",
            alignItems: "center",
            columnGap: SrfValue(8),
            borderRadius: SrfValue(10),
            flexDirection: "row",
            width: "48%",
            height: SrfValue(58),
          }}>
          <ImageIcon size="md" color="whiteColor" name="doscan" />
          <Text variant={"regular16"} color={"whiteColor"}>
            Add Scan
          </Text>
        </TouchableOpacity>
      </Box>
    );
  };
  const renderShipmentDetails = () => {
    const renderItem = ({ item, index }: StatusListType) => {
      return (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="grayLight"
          borderRadius="sm"
          padding="sm"
          paddingHorizontal={"md"}>
          <Box>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleMarkOne(index)}>
              <ImageIcon
                name={item.ischecked ? "checkedbox" : "checkbox"}
                size="md"
              />
            </TouchableOpacity>
          </Box>
          <Box>
            <ImageIcon name="box" size="logo-iconsize" />
          </Box>
          <Box>
            <Text
              textTransform="uppercase"
              color="textColor2"
              variant="regular12">
              {item.name}
            </Text>
            <Text variant="medium16" fontWeight="600">
              23456798765
            </Text>
            <Box flexDirection="row" alignItems="center" columnGap="xs">
              <Text color="textColor2" variant="regular12">
                Cairo
              </Text>
              <ImageIcon name="arrow" size="xs" />
              <Text color="textColor2" variant="regular12">
                Alexandra
              </Text>
            </Box>
          </Box>
          <Box>
            <Box
              borderWidth={1}
              borderRadius="sm"
              paddingVertical="sm"
              paddingHorizontal="md"
              backgroundColor="primaryColor10"
              borderColor="whiteColor">
              <Text
                style={{ color: item.color }}
                variant="regular10"
                fontWeight="500"
                textTransform="uppercase">
                RECEIVED
              </Text>
            </Box>
          </Box>
          <Box>
            <TouchableOpacity>
              <Box backgroundColor="whiteColor" padding="xs" borderRadius="sm">
                <ImageIcon name="arrowexpand" size="sm" />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      );
    };
    return (
      <Box marginTop="sm" rowGap="sm">
        <Box flexDirection="row" justifyContent="space-between">
          <Box>
            <Text variant="bold16">Shipment</Text>
          </Box>
          <TouchableOpacity onPress={handleMarkAll} activeOpacity={0.7}>
            <Box flexDirection="row" alignItems="center" columnGap="sm">
              <ImageIcon
                name={allIsChecked ? "checkedbox" : "checkbox"}
                size="md"
              />
              <Text variant="regular18" color="primaryColor">
                {!allIsChecked ? "Mark All" : "Unmark All"}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <FlatList
          contentContainerStyle={{ rowGap: SrfValue(10) }}
          ListFooterComponent={<Box height={SrfValue(330)} />}
          data={filterstatusList}
          refreshControl={
            <RefreshControl
              onRefresh={handleGetStatus}
              refreshing={isLoading}
            />
          }
          renderItem={renderItem}
        />
      </Box>
    );
  };

  const renderTags = ({ item }) => {
    const isSelected = selectedTags.includes(item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          justifyContent: "space-between",
          width: "32%",
        }}
        onPress={() => {
          setSelectedTags(prev => {
            if (isSelected) {
              return prev.filter(tagId => tagId !== item.id);
            } else {
              return [...prev, item.id];
            }
          });
        }}>
        <Box
          backgroundColor="grayLight"
          borderColor={isSelected ? "filterColor" : "grayLight"} // Change color if selected
          width="90%"
          padding="md"
          borderWidth={isSelected ? 2 : 0}
          marginHorizontal="sm"
          borderRadius="md"
          justifyContent="center"
          alignItems="center">
          <Text>{item.title}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box flex={1} backgroundColor="whiteColor" padding="md">
      <Box
        rowGap="md"
        alignSelf="center"
        flex={1}
        paddingTop="lg"
        width={width >= 500 ? "87%" : "100%"}>
        {renderHeader()}
        {greetings()}
        <SearchBar getSearchInput={c => handleFilterBySearch(c)} />
        {filterAndScan()}
        {renderShipmentDetails()}
      </Box>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={snappoints}
        backdropComponent={renderBackdrop}>
        <TouchableWithoutFeedback
          onPress={() => {
            modalRef?.current?.dismiss();
            setFilterPayload([]);
          }}>
          <Box
            height="100%"
            backgroundColor="whiteColor"
            zIndex="modal"
            borderTopLeftRadius="lg"
            borderTopRightRadius="lg">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingHorizontal="lg"
              padding="md"
              borderBottomWidth={0.5}
              borderBottomColor="textColor2">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  modalRef?.current?.dismiss();
                  setFilterPayload([]);
                }}>
                <Text color="primaryColor" variant="medium14">
                  Cancel
                </Text>
              </TouchableOpacity>
              <Text variant="medium14">Filters</Text>
              <TouchableOpacity>
                <Text color="primaryColor" variant="medium14">
                  Done
                </Text>
              </TouchableOpacity>
            </Box>
            <Text variant="medium14" padding="md">
              SHIPMENT STATUS
            </Text>
            <FlatList
              contentContainerStyle={{
                justifyContent: "space-between",
                paddingHorizontal: 5,
                gap: 10,
                marginTop: 4,
              }}
              numColumns={3}
              data={tags}
              renderItem={renderTags}
            />
          </Box>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
    </Box>
  );
};

export default ShipmentsLandingPage;
