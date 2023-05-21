/** @format */

import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  swipeListView: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
  },
  frontRowView: {
    backgroundColor: Colors.powderBlue,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  frontRowtxt: {
    color: Colors.teal,
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
  backRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: Colors.primary,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  backRowEditView: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    height: 47,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    paddingLeft: 20,
  },
  backRowEditTxt: {
    color: Colors.white,
    fontSize: 16,
  },
  backRowDeleteView: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    height: 47,
    paddingRight: 20,
  },
  backRowDeleteTxt: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'right',
  },
  addIconViewStyles: {
    alignSelf: 'flex-end',
    padding: 20,
    position: 'absolute',
    bottom: 0,
  },
  addIconStyles: {
    resizeMode: 'contain',
    tintColor: Colors.teal,
    width: 60,
    height: 60,
  },
  emptytxtView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTxt: {
    color: 'grey',
    fontSize: 16,
  },
});
