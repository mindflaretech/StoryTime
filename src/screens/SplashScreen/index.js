/** @format */

import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Image, View, Text} from 'react-native';
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
      <Image
        style={styles.splashLogo}
        source={Images.splash.iLocReminderLogo}
      />
      <Text style={styles.appNameTxt}>Remind Me</Text>
      <View style={styles.versionContainer}>
        <Text style={styles.version}>Version: {VersionInfo.appVersion}</Text>
      </View>
    </View>
  );
}
