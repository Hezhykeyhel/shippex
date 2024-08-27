const imageIconPack = {
  shipments: require("@/shared/assets/images/boxes.png"),
  profile: require("@/shared/assets/images/avatar.png"),
  scan: require("@/shared/assets/images/barcode.png"),
  applogo: require("@/shared/assets/images/applogo.png"),
  wallet: require("@/shared/assets/images/wallet.png"),
  shippex: require("@/shared/assets/images/shippex.png"),
  chevron: require("@/shared/assets/images/chevron.png"),
  frame: require("@/shared/assets/images/frame.png"),
  notification: require("@/shared/assets/images/notification.png"),
  filter: require("@/shared/assets/images/filter.png"),
  search: require("@/shared/assets/images/search.png"),
  arrow: require("@/shared/assets/images/arrow.png"),
  checkedbox: require("@/shared/assets/images/checkedbox.png"),
  checkbox: require("@/shared/assets/images/checkbox.png"),
  arrowexpand: require("@/shared/assets/images/arrowexpand.png"),
  box: require("@/shared/assets/images/box.png"),
  doscan: require("@/shared/assets/images/scan.png"),
};

export { imageIconPack };

export type ImageIconPackType = keyof typeof imageIconPack;
