import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Platform,
  Animated,
  View,
  StyleSheet,
} from "react-native";
import ShimmerPlaceHolder, {
  createShimmerPlaceholder,
} from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { getRequestFlag } from "../../ducks/requestFlags";

export const ShimmerView = ({ shimmerStyle, childs }) => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const avatarRef = React.createRef();
  const [visible, setVisible] = useState(false);

  const requestFlag = useSelector(getRequestFlag('GET_LIST'))

  useEffect(() => {
    animateShimmer();
    // Util.checkAppStoreVersion()
  }, []);

  const animateShimmer = () => {
    const facebookAnimated = Animated.stagger(400, [
      avatarRef?.current?.getAnimated(),
      Animated.parallel([]),
    ]);
    Animated.loop(facebookAnimated).start();

    // setTimeout(() => {
    //   setVisible(!visible);
    // }, 40000);

    setVisible(!requestFlag.loading);
  };

  return (
    <View>
      <ShimmerPlaceholder
        shimmerStyle={shimmerStyle}
        visible={visible}
        ref={avatarRef}
        stopAutoRun
      >
        <View style={shimmerStyle}>{childs}</View>
      </ShimmerPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({});
