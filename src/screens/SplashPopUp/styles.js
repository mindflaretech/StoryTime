/** @format */

import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  version: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
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
    fontSize: 32,
    color: '#E44173',
    fontWeight: '900',
    marginTop: 10,
  },
  splashLogo: {
    height: Dimensions.get('window').width / 1.2,
    width: Dimensions.get('window').width / 1.3,
    resizeMode: 'contain',
    marginTop: '10%',
  },
  polygon: {
    resizeMode: 'contain',
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4,
    marginTop: '40%',
  },
  getStarted: {
    resizeMode: 'contain',
    height: Dimensions.get('window').width / 4.5,
    width: Dimensions.get('window').width / 2.5,
  },
});
