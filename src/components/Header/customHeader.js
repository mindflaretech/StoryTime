import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../theme';

const CustomHeader = props => {
  const [headerTxt, setHeaderTxt] = useState('');

  const {edit, isEdit, text, locationIsTrue} = props;
  useEffect(() => {
    if (text) {
      setHeaderTxt(text);
    } else if (isEdit || edit || locationIsTrue) {
      setHeaderTxt('Edit Reminder');
    } else if (isEdit) {
      setHeaderTxt('Edit Reminder');
    } else {
      setHeaderTxt('');
    }
  }, [text, isEdit, edit, locationIsTrue]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>{headerTxt}</Text>
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
