import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../theme';

const SaveUpdateButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.85} style={styles.button}>
        <Text style={styles.buttonTxt}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SaveUpdateButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  button: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
    borderWidth: 0.5,
    padding: 12,
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 0.5,
    shadowColor: Colors.teal,
  },
  buttonTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});
