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
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  frontRowtxt: {
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
    elevation: 2,
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
    elevation: 2,
  },
  backRowDeleteTxt: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'right',
  },
  addIconViewStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.powderBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    borderRadius: 60,
    backgroundColor: Colors.powderBlue,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  addIconStyles: {
    resizeMode: 'contain',
    tintColor: Colors.teal,
    width: 65,
    height: 65,
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
  shadowStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});
