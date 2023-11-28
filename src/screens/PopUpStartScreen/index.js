import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Images} from '../../theme';
import StatusBar from '../../components/StatusBar';
import {useNavigation} from '@react-navigation/native';
import {ScreeNames} from '../../naviagtor';

const PopUpStart = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={Images.splash.background}
        resizeMode={'cover'}
        style={styles.imageBackgroundBack}>
        <ImageBackground
          source={Images.splash.frontBackground}
          resizeMode={'cover'}
          style={styles.imageBackgroundFront}>
          <Image style={styles.popUpLogo} source={Images.splash.logo} />
          <TouchableOpacity activeOpacity={0.85} onPress={() => {}}>
            <Image
              style={styles.guestButton}
              source={Images.general.guestButton}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              navigation.navigate(ScreeNames.Login);
            }}>
            <Image
              style={styles.loginButton}
              source={Images.general.loginButton}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.subscribeButton} activeOpacity={0.85}>
            <Text style={styles.subscribeTxt}>
              Subscribe for AD FREE experience
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default PopUpStart;
