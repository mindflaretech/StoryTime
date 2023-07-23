import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../theme';

const BottomButton = props => {
  const {isEdit, edit, isUpdateAddress} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={() => {
          isEdit || edit || isUpdateAddress ? updatedData() : savedData();
        }}>
        <Text style={styles.buttonTxt}>
          {isEdit || edit || isUpdateAddress ? 'Update' : 'Save'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButton;

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
    elevation: 1,
    shadowColor: Colors.teal,
  },
  buttonTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});
