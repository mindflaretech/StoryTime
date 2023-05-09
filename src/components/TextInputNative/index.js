/** @format */

import { View, Text, Image, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { ButtonView } from "../../components";
import { Colors, Images } from "../../theme";
import { InputError } from "../../common";
import styles from "./styles";

const TextInputNative = (props) => {
  // destruct props
  const {
    control,
    name,
    forwardRef,
    title,
    defaultValue,
    nextFocusRef,
    error,
    customPlaceholder,
    renderLeft,
    renderRight,
    required,
    showCharCount,
    maxLength,
    onPress,
    hint,
    onSubmit,
    multiline,
    multlineStyle,
    containerStyle,
    dropdownKey,
    formatValue,
    arrowDown,
    textAlign,
    setMultlineStyle,
    showTitle,
    customTitle,
    bottomSpaceLarge,
    topSpaceLarge,
    formatValueChange,
    disablePress,
    secureTextEntry,
    isPrice,
    onChangeCustom,
    isRightArrow,
    editable,
    tintColor,
    customBorderColor = Colors.grey,
    rightIcon,
    isImage,
    focusedPlaceholder = "",
    leftIcon,
    ...rest
  } = props;

  // set state focus
  const [isFocused, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (secureTextEntry) {
      forwardRef?.current?.setNativeProps({
        // style: { fontFamily: Fonts.type.semiBold },
      });
    }
  }, [forwardRef, secureTextEntry]);

  // render input
  const renderInput = ({ onChange, onBlur: _onBlur, value }) => {
    // set border color
    let borderColor = customBorderColor;
    if (error) {
      borderColor = Colors.errorInput;
    } else if (isFocused) {
      borderColor = Colors.black;
    }

    // set view tag
    const opacity = disablePress || editable === false ? 1 : 1;

    // input events
    const onChangeText = (textInputValue) => {
      if (formatValueChange) {
        onChange && onChange(formatValueChange(textInputValue));
      } else {
        onChange && onChange(textInputValue);
      }
      if (onChangeCustom) {
        onChangeCustom(textInputValue);
      }
    };
    const onBlur = () => {
      _onBlur && _onBlur();
      setFocus(false);
    };
    const onFocus = () => {
      setFocus(true);
    };

    const onSubmitEditing = () => {
      if (nextFocusRef) {
        nextFocusRef.current.focus();
      }
    };

    // set placeholder text
    const placeholder = onPress
      ? `${title}` // `${strings('app.select')} ${title}`
      : `${title}`;

    // set input value for dropdown
    const inputValue = dropdownKey ? value?.[dropdownKey] ?? "" : value;

    // custom style
    const customStyleMulti = multiline && setMultlineStyle ? multlineStyle : {};
    // render input

    return (
      <TextInput
        style={[
          styles.input,
          customStyleMulti,
          { textAlign },
          multiline && { textAlignVertical: "top" },
        ]}
        placeholderTextColor={Colors.grey}
        placeholder={customPlaceholder}
        // placeholderStyle={{}}
        value={inputValue}
        ref={forwardRef}
        returnKeyType={onSubmit ? "done" : "next"}
        onSubmitEditing={onSubmit || onSubmitEditing}
        editable={_.isUndefined(editable) ? (onPress ? false : true) : editable}
        pointerEvents={onPress ? "none" : "auto"}
        selection={onPress ? { start: 0, end: 0 } : undefined}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry && !showPassword}
        selectionColor={Colors.black}
        {...{
          maxLength,
          onChangeText,
          onBlur,
          onFocus,
          multiline,
        }}
        {...rest}
      />
    );
  };

  //render title
  const renderTitle = () => {
    return (
      <Text style={styles.title}>{`${customTitle || title}${
        required ? "*" : ""
      }`}</Text>
    );
  };

  const renderLeftInput = () => {
    let backgroundColor = Colors.greyTrans;
    let iconTintColor = Colors.grey;
    if (error) {
      backgroundColor = Colors.errorInput;
      iconTintColor = Colors.white;
    } else if (isFocused) {
      backgroundColor = Colors.black;
      iconTintColor = Colors.white;
    }

    if (renderLeft) {
      return renderLeft();
    }

    if (isImage) {
      return (
        <View
          style={[
            styles.leftIconStyle,
            {
              backgroundColor: backgroundColor,
            },
          ]}
        >
          <Image source={leftIcon} style={{ tintColor: iconTintColor }} />
        </View>
      );
    }
    return null;
  };

  const renderRightInput = (onChange, value) => {
    if (renderRight) {
      return (
        <View
          style={{
            // height: '100%',
            justifyContent: "center",
            // marginLeft: 14,
          }}
        >
          {renderRight()}
        </View>
      );
    } else if (secureTextEntry) {
      return (
        <ButtonView
          // style={{ paddingVertical: 8 }}
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        >
          <Image
            // style={{ width: 19, height: 14 }}
            source={showPassword ? Images.icons.eyeIcon : Images.icons.eyeIcon}
          />
        </ButtonView>
      );
    } else if (onPress && arrowDown) {
      return (
        <ButtonView
          style={styles.rightIconStyle}
          onPress={() => onPress(onChange, value)}
        >
          <Image
            source={
              rightIcon
                ? rightIcon
                : isRightArrow
                ? Images.icons.arrowRight
                : Images.icons.arrowDown
            }
            style={styles.arrowStyle}
          />
        </ButtonView>
      );
    }
    return null;
  };

  // render input container
  const renderInputContainer = (controlllerProps) => {
    // set view tag
    // console.log(controlllerProps);
    const TagView = onPress && disablePress === false ? ButtonView : View;
    // const TagView = View;
    let borderColor = customBorderColor;
    if (error) {
      borderColor = Colors.errorInput;
    }
    return (
      <TagView
        onPress={() => {
          console.log(onPress);
          onPress(controlllerProps.onChange, controlllerProps.value);
        }}
        // pointerEvents={"none"}
        enableClick={true}
        debounceTime={10}
        style={{
          borderBottomWidth: 1,
          borderColor: borderColor,
        }}
      >
        {renderTitle()}
        <View pointerEvents={onPress ? "none" : "auto"}>
          {renderInput(controlllerProps)}
        </View>
      </TagView>
    );
  };

  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };

  // render input controller
  const renderController = (controlllerProps) => {
    let customStyle = bottomSpaceLarge ? styles.bottomSpace : {};
    if (topSpaceLarge) {
      customStyle = styles.topSpace;
    }
    return (
      <View style={[customStyle, containerStyle]}>
        {renderInputContainer(controlllerProps.field)}
        {renderError()}
      </View>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      //defaultValue={defaultValue}
      render={renderController}
    />
  );
};

TextInputNative.propTypes = {
  containerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  multlineStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  required: PropTypes.bool,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  forwardRef: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  customPlaceholder: PropTypes.string,
  onChangeCustom: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  nextFocusRef: PropTypes.object,
  error: PropTypes.object,
  onPress: PropTypes.func,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  showCharCount: PropTypes.bool,
  maxLength: PropTypes.number,
  hint: PropTypes.string,
  onSubmit: PropTypes.func,
  multiline: PropTypes.bool,
  dropdownKey: PropTypes.string,
  formatValue: PropTypes.func,
  formatValueChange: PropTypes.func,
  arrowDown: PropTypes.bool,
  setMultlineStyle: PropTypes.bool,
  textAlign: PropTypes.string,
  showTitle: PropTypes.bool,
  customTitle: PropTypes.string,
  bottomSpaceLarge: PropTypes.bool,
  topSpaceLarge: PropTypes.bool,
  disablePress: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  isPrice: PropTypes.bool,
  isRightArrow: PropTypes.bool,
  editable: PropTypes.bool,
  tintColor: PropTypes.string,
  isImage: PropTypes.bool,
};
TextInputNative.defaultProps = {
  containerStyle: {},
  multlineStyle: styles.multline,
  setMultlineStyle: true,
  required: false,
  error: undefined,
  defaultValue: "",
  nextFocusRef: undefined,
  onChangeCustom: undefined,
  formatValueChange: undefined,
  onPress: undefined,
  customPlaceholder: "",
  renderLeft: undefined,
  renderRight: undefined,
  showCharCount: false,
  maxLength: 10000,
  hint: "",
  tintColor: `${Colors.white}`,
  onSubmit: undefined,
  multiline: false,
  dropdownKey: "",
  formatValue: undefined,
  arrowDown: true,
  textAlign: "left",
  showTitle: true,
  customTitle: "",
  bottomSpaceLarge: false,
  topSpaceLarge: false,
  disablePress: false,
  secureTextEntry: false,
  isPrice: false,
  isRightArrow: false,
  isImage: true,
};

export default TextInputNative;
