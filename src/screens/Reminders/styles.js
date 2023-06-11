/** @format */

import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  swipeListView: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
  },
  frontRowView: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 6,
    shadowColor: Colors.teal,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  nameLocationView: {
    // backgroundColor: 'red',
  },
  icon: {
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    width: 30,
    height: 30,
  },
  radiusView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontRowtxt: {
    fontSize: 20,
    paddingTop: 10,
  },
  frontRowDestxt: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 12,
  },
  backRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 20,
    height:100
  },
  backRowEditView: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    height: 82,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    paddingLeft: 20,
    elevation: 6,
  },
  backRowDeleteView: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    height: 82,
    paddingRight: 20,
    elevation: 6,
    shadowColor: Colors.teal,
  },
  backRowEditTxt: {
    color: Colors.white,
    fontSize: 16,
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
    // right: 15,
    alignSelf: 'center',
  },
  addIconStyles: {
    resizeMode: 'contain',
    tintColor: Colors.teal,
    width: 65,
    height: 65,
  },
  emptytxtView: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  reminderIcon: {
    resizeMode: 'contain',
    width: 90,
    height: 90,
    opacity:0.3
  },
  emptyTxt: {
    fontSize: 18,
    color: Colors.black,
    marginVertical: 10,
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
