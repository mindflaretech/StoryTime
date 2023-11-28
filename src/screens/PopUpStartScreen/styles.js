/** @format */

import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageBackgroundBack: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  imageBackgroundFront: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  popUpLogo: {
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width / 1.3,
    resizeMode: 'contain',
    marginTop: 10,
  },
  guestButton: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 1,
    resizeMode: 'contain',
    marginTop: 10,
    elevation: 2,
  },
  loginButton: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 1,
    marginTop: 10,
    resizeMode: 'contain',
    elevation: 2,
  },
  subscribeButton: {
    backgroundColor: Colors.subscribeButton,
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 50,
    marginVertical: "10%",
    elevation: 2,
  },
  subscribeTxt: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
});
