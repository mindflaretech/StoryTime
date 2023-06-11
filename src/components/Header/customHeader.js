import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../theme';

const CustomHeader = props => {
  const {edit, isEdit} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>Reminder</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 22,
    color: Colors.black,
    marginVertical: 20,
  },
});
