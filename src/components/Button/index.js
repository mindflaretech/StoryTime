import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../theme';

const Button = ({text}) => {
  return (
    <TouchableOpacity
      style={styles.loginButton}
      activeOpacity={0.85}
      onPress={() => {}}>
      <Text style={styles.loginButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: Colors.subscribeButton,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: Dimensions.get('window').width / 9,
    width: Dimensions.get('window').width / 1.3,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
