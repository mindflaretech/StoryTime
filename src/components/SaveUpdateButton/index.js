import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../theme';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';

const SaveUpdateButton = getRemindersData => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={() => {
          navigation.navigate(ScreeNames.Reminders),
            dispatch(test({getRemindersData}));
        }}>
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
    elevation: 1,
    shadowColor: Colors.teal,
  },
  buttonTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});
