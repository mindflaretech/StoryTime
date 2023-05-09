import { StyleSheet } from "react-native";
import { Fonts, Metrics } from "../../theme";

export const styles = StyleSheet.create({
  activeIndicator: {
    backgroundColor: "#BC2F27",
    height: 5,
    width: 5,
    borderRadius: 50,
    marginBottom: 8,
    position: "absolute",
    top: 12,
  },
  icon: {
    height: 28,
    width: 28,
    marginTop: Metrics.ratio(20),
  },
  labelFont: {
    fontSize: Fonts.size.size_13,
    marginBottom: Metrics.ratio(10),
  },
});
