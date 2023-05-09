/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  text: { padding: 30 },
  buttonStyle: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: Metrics.ratio(56, 56, true),
  },
  buttonTextStyle: {
    color: Colors.white,
    fontSize: Metrics.generatedFontSize(16, 16, true),
    // fontFamily: Fonts.avenierNext.demiBold,
  },
});
