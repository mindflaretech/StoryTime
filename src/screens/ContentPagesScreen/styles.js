/** @format */

import { StyleSheet } from "react-native";
import { Metrics, Colors, Fonts } from "../../theme";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  viewText: { backgroundColor: Colors.white },
  textStyle: {
    // fontFamily: Fonts.avenierNext.regular,
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(20),
    color: Colors.black,
  },
});

export default styles;
