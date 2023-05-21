/** @format */

import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  textInputStyle: {
    borderColor: Colors.teal,
    borderWidth: 0.5,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 1,
    shadowColor: Colors.teal,
  },
  locationFieldButton: {
    borderColor: Colors.teal,
    borderWidth: 0.5,
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 1,
    shadowColor: Colors.teal,
    backgroundColor: Colors.white,
  },
  textInputsView: {
    marginTop: 20,
  },
  rbSheetStyles: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    padding: 18,
    backgroundColor: Colors.teal,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:12,
    marginHorizontal:10,
    marginVertical:10
  },
  addtxt:{
color:Colors.white,
fontWeight:"bold"
  },
  renderItemFlatlist: {
    backgroundColor: Colors.white,
    borderColor: Colors.teal,
    borderWidth: 0.5,
    padding: 12,
    marginHorizontal: 60,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 0.5,
    shadowColor: Colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListTxt: {
    color: Colors.teal,
  },
});
