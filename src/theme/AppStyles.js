import { StyleSheet, I18nManager } from "react-native";

import Metrics from "./Metrics";
import Colors from "./Colors";
import Fonts from "./Fonts";

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flashMessage: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_16,
    color: Colors.white,
    lineHeight: Metrics.ratio(22),
  },
  transformImage: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  alignCenterView: {
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistContentContainer: {},
});
