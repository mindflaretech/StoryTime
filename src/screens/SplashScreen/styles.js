/** @format */

import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  version: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },
  versionContainer: {
    position: 'absolute',
    bottom: 20,
    // flex: 1,
    // backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieStyle: {
    height: 200,
  },
  appNameTxt: {
    // backgroundColor: 'red',
    marginTop: -30,
    fontSize: 30,
    color: Colors.white,
    // fontStyle: 'italic',
    fontWeight: '400',
  },
  splashLogo: {
    height: Dimensions.get('window').width / 1,
    width: Dimensions.get('window').width / 1,
    resizeMode: 'contain',
    // marginVertical: 15,
  },
});
