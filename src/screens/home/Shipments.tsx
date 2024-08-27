import { RootNavigationProps } from "@/services/navigations/types";
import { ImageIcon } from "@/shared/assets/icons/ImageIcon";
import { imageIconPack } from "@/shared/assets/icons/imageIconPack";
import { Box } from "@/shared/components";
import { SearchBar } from "@/shared/components/textInput/searchBar";
import { Text } from "@/shared/components/Typography";
import { getShipmentList, getShipmentStatusList } from "@/shared/services/api";
import { palette } from "@/shared/theme/palette";
import SrfValue from "@/shared/utils/functions/SrfValue";
import React, { useEffect, useState } from "react";
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

const Shipments = ({ navigation, route }: RootNavigationProps<"Shipments">) => {
  const { width } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(false);
  const [allIsChecked, setAllIsChecked] = useState(false);
  const [statusList, setStatusList] = useState<StatusListType[]>([]);
  const [filterstatusList, setFilterStatusList] = useState<StatusListType[]>(
    [],
  );
  const [filterPayload, setFilterPayload] = useState<StatusListType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [shipments, setShipments] = useState([]);

  const [tags, setTags] = useState([
    { title: "Received", id: 1 },
    { title: "Putaway", id: 2 },
    { title: "Delivered", id: 3 },
    { title: "Canceled", id: 4 },
    { title: "Rejected", id: 5 },
    { title: "Lost", id: 6 },
    { title: "On Hold", id: 7 },
  ]);

  const { full_name } = route.params || "Ibrahim Shaker";

  const handleGetStatus = async () => {
    setIsLoading(true);
    try {
      const response = await getShipmentStatusList();
      const newList = response.message.map(item => ({
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

  const fetchShipments = async (searchTerm= []) => {
    try {
      const response = await getShipmentList(searchTerm);
      setShipments(response);
    } catch (error) {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    handleGetStatus();
    fetchShipments();
  }, []);


  console.log(shipments);
  
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
    if (!allIsChecked) {
      const newList = filterstatusList.map(item => ({
        ...item,
        ...{ ischecked: true },
      }));
      setFilterStatusList(newList);
      setAllIsChecked(true);
      return;
    }
    const newList = statusList.map(item => ({
      ...item,
      ...{ ischecked: false },
    }));
    setStatusList(newList);
    setAllIsChecked(false);
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

  // const handleExpanded () => {

  // }

  const renderMainHeader = () => {
    return (
      <Box
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={"row"}>
        <ImageIcon name="frame" size="xl" />
        <Image
          source={imageIconPack.shippex}
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
  const renderGreeting = () => {
    return (
      <Box>
        <Text color={"textColor2"}>Hello</Text>
        <Text fontSize={RFValue(28)} fontWeight={"600"}>
          {full_name}
        </Text>
      </Box>
    );
  };
  const renderFilterAndScan = () => {
    return (
      <Box
        width={"100%"}
        marginTop={"xs"}
        flexDirection={"row"}
        justifyContent={"space-between"}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
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
          <Text variant={"regular16"}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
  const renderShipmentList = () => {
    const renderItem = ({ item, index }: StatusListType) => {
      return (
        <Box
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          backgroundColor={"grayLight"}
          borderRadius={"sm"}
          padding={"sm"}
          paddingHorizontal={"md"}>
          <Box>
            <TouchableOpacity onPress={() => handleMarkOne(index)}>
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
              textTransform={"uppercase"}
              color={"textColor2"}
              variant={"regular12"}>
              {item.name}
            </Text>
            <Text variant={"medium16"} fontWeight={"600"}>
              23456798765
            </Text>
            <Box flexDirection={"row"} alignItems={"center"} columnGap={"xs"}>
              <Text color={"textColor2"} variant={"regular12"}>
                Cairo
              </Text>
              <ImageIcon name="arrow" size="xs" />
              <Text color={"textColor2"} variant={"regular12"}>
                Alexandra
              </Text>
            </Box>
          </Box>
          <Box>
            <Box
              borderWidth={1}
              borderRadius={"sm"}
              padding={"xs"}
              backgroundColor={"primaryColor10"}
              borderColor={"whiteColor"}>
              <Text
                style={{ color: item.color }}
                variant={"regular10"}
                fontWeight={"500"}
                textTransform={"uppercase"}>
                Received
              </Text>
            </Box>
          </Box>
          <Box>
            <TouchableOpacity>
              <Box
                backgroundColor={"whiteColor"}
                padding={"xs"}
                borderRadius={"sm"}>
                <ImageIcon name="arrowexpand" size="sm" />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      );
    };
    return (
      <Box marginTop={"sm"} rowGap={"sm"}>
        <Box flexDirection={"row"} justifyContent={"space-between"}>
          <Box>
            <Text fontWeight={"600"} variant={"bold22"}>
              Shipment
            </Text>
          </Box>
          <Box flexDirection={"row"} alignItems={"center"} columnGap={"sm"}>
            <TouchableOpacity onPress={handleMarkAll}>
              <ImageIcon
                name={allIsChecked ? "checkedbox" : "checkbox"}
                size="md"
              />
            </TouchableOpacity>
            <Text variant={"regular18"} color={"primaryColor"}>
              {!allIsChecked ? "Mark All" : "Unmark All"}
            </Text>
          </Box>
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
    return (
      <TouchableOpacity
        onPress={() => {
          setFilterPayload(prev => [...prev, item.title]);
        }}>
        <Box
          backgroundColor={"grayLight"}
          padding={"md"}
          paddingVertical={"none"}
          marginHorizontal={"sm"}
          borderRadius={"sm"}
          justifyContent={"center"}
          alignItems={"center"}
          height={SrfValue(56)}>
          <Text>{item.title}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box flex={1} backgroundColor={"whiteColor"} padding={"md"}>
      <Box
        rowGap={"md"}
        alignSelf={"center"}
        flex={1}
        width={width >= 500 ? "87%" : "100%"}>
        {renderMainHeader()}
        {renderGreeting()}
        {<SearchBar getSearchInput={c => handleFilterBySearch(c)} />}
        {renderFilterAndScan()}
        {renderShipmentList()}
      </Box>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setFilterPayload([]);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
            setFilterPayload([]);
          }}>
          <Box
            flex={1}
            justifyContent={"flex-end"}
            backgroundColor={"modalBgColor"}>
            <Box
              height={"37%"}
              backgroundColor={"whiteColor"}
              zIndex={"modal"}
              borderTopLeftRadius={"lg"}
              borderTopRightRadius={"lg"}>
              <Box
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                paddingHorizontal={"lg"}
                padding={"md"}
                borderBottomWidth={0.5}
                borderBottomColor={"textColor2"}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setFilterPayload([]);
                  }}>
                  <Text
                    color={"primaryColor"}
                    fontWeight={"500"}
                    variant={"bold16"}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text fontWeight={"600"} variant={"bold18"}>
                  Filters
                </Text>
                <TouchableOpacity>
                  <Text
                    color={"primaryColor"}
                    fontWeight={"500"}
                    variant={"bold16"}>
                    Done
                  </Text>
                </TouchableOpacity>
              </Box>
              <FlatList
                contentContainerStyle={{ gap: SrfValue(20), margin: 15 }}
                numColumns={3}
                data={tags}
                renderItem={renderTags}
              />
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </Modal>
    </Box>
  );
};

export default Shipments;
