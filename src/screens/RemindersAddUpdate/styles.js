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
    borderWidth: 1,
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: Colors.teal,
    backgroundColor: Colors.white,
  },
  locationFieldButton: {
    borderColor: Colors.teal,
    borderWidth: 1,
    paddingHorizontal:12,
    paddingVertical:16,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: Colors.teal,
    backgroundColor: Colors.white,
  },
  locationTxt: {
    color: Colors.black,
    fontSize: 14,
  },
  textInputsView: {
    marginTop: 20,
  },
  rbSheetStyles: {
    container: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderColor: Colors.teal,
      borderWidth: 1,
    },
    draggableIcon: {
      backgroundColor: Colors.teal,
      width: 50,
    },
  },
  rbSheetContainer: {
    flex: 1,
  },
  addButton: {
    padding: 18,
    backgroundColor: Colors.teal,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 6,
    borderWidth: 3,
    borderColor: Colors.powderBlue,
  },
  addtxt: {
    color: Colors.powderBlue,
    fontWeight: 'bold',
  },
  renderItemFlatlist: {
    backgroundColor: Colors.white,
    borderColor: Colors.teal,
    borderWidth: 0.5,
    padding: 12,
    marginHorizontal: 60,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
    shadowColor: Colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListTxt: {
    color: Colors.teal,
  },
  saveButtoncontainer: {
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
