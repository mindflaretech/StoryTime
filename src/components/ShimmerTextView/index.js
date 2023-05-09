import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Platform,
  Animated,
  View,
  StyleSheet,
  Text,
} from "react-native";
import ShimmerPlaceHolder, {
  createShimmerPlaceholder,
} from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

export const ShimmerTextView = ({ text, shimmerStyle, textStyle }) => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const avatarRef = React.createRef();
  const firstLineRef = React.createRef();
  const secondLineRef = React.createRef();
  const thirdLineRef = React.createRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    animateShimmer();
    // Util.checkAppStoreVersion()
  }, []);

  const animateShimmer = () => {
    const facebookAnimated = Animated.stagger(400, [
      avatarRef?.current?.getAnimated(),
      Animated.parallel([
        firstLineRef?.current?.getAnimated(),
        secondLineRef?.current?.getAnimated(),
        thirdLineRef?.current?.getAnimated(),
      ]),
    ]);
    Animated.loop(facebookAnimated).start();

    setTimeout(() => {
      setVisible(!visible);
    }, 4000);
  };

  return (
    <View>
      <ShimmerPlaceholder
        shimmerStyle={shimmerStyle}
        visible={visible}
        ref={avatarRef}
        stopAutoRun
      >
        <Text style={textStyle}>{text}</Text>
      </ShimmerPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({});
