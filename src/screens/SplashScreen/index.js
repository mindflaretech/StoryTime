/** @format */

import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {Colors, Images} from '../../theme';
import styles from './styles';
import SplashScreen from 'react-native-splash-screen';
import VersionInfo from 'react-native-version-info';
import StatusBar from '../../components/StatusBar';

export default function CustomSplashScreen() {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    SplashScreen.hide();
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      {/* <Lottie
        style={styles.lottieStyle}
        progress={animationProgress.current}
        /> */}
      <ImageBackground
        source={Images.splash.background}
        resizeMode={'cover'}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          // flex: 1,
          // backgroundColor: 'red',
        }}>
        <Image style={styles.splashLogo} source={Images.splash.logo} />
        <Image style={styles.polygon} source={Images.general.polygon} />
        <Text style={styles.appNameTxt}>Get Started</Text>
        <View style={styles.versionContainer}>
          <Text style={styles.version}>v{VersionInfo.appVersion}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

