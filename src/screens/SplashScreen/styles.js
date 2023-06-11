/** @format */

import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  version: {
    fontWeight: '400',
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
    fontSize: 24,
    color: Colors.teal,
    fontStyle: 'italic',
    fontWeight: '700',
  },
  splashLogo: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    marginVertical: 15,
  },
});
