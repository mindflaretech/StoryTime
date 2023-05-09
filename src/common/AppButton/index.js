/** @format */

import { Text } from "react-native";
import PropTypes from "prop-types";
import React from "react";

import styles from "./styles";
import { ButtonView } from "../../components";
import { Colors } from "../../theme";
import { BUTTON_TYPE } from "../../config/Constants";

const AppButton = ({ title, containerStyle, textStyle, onPress, disabled }) => {
  return (
    <ButtonView
      style={[styles.buttonStyle, containerStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonTextStyle, textStyle]}>{title}</Text>
    </ButtonView>
  );
};

AppButton.propTypes = {
  title: PropTypes.string,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  onPress: PropTypes.func,
};

AppButton.defaultProps = {
  title: "",
  containerStyle: {},
  textStyle: {},
  onPress: () => {},
  disabled: false,
};

export default AppButton;
