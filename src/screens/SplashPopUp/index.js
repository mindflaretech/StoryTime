/** @format */

import React from 'react';
import {
  Image,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Images} from '../../theme';
import styles from './styles';
import VersionInfo from 'react-native-version-info';
import StatusBar from '../../components/StatusBar';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';
const SplashPopUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={Images.splash.background}
        resizeMode={'cover'}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        <Image style={styles.splashLogo} source={Images.splash.logo} />
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            navigation.navigate(ScreeNames.PopUpStart);
          }}>
          <Image style={styles.polygon} source={Images.general.polygon} />
        </TouchableOpacity>
        <Image style={styles.getStarted} source={Images.general.getStarted} />
        <View style={styles.versionContainer}>
          <Text style={styles.version}>v{VersionInfo.appVersion}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
export default SplashPopUp;
